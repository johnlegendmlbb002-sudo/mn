import { getTransporters } from "./mailTransporters";

/**
 * Sends promotional emails using multiple Gmail accounts to distribute load and improve speed.
 * Uses GMAIL_USER/GMAIL_APP_PASSWORD and GMAIL_USER2/GMAIL_APP_PASSWORD2 from environment variables.
 */
export async function sendPromoMail({ emails, subject, content, imageUrl, promoTitle }) {
  // Create transporters for all available accounts
  const transportersInfo = getTransporters();

  if (transportersInfo.length === 0) {
    throw new Error("No Gmail accounts configured for sending promotional emails.");
  }

  const results = {
    total: emails.length,
    success: 0,
    failed: 0,
    errors: []
  };

  // Send emails in parallel across all accounts
  const CONCURRENCY = transportersInfo.length; // One worker per account to maintain single connection
  const queue = [...emails];
  
  async function worker(workerId) {
    while (queue.length > 0) {
      const email = queue.shift();
      if (!email) break;

      const tInfo = transportersInfo[workerId % transportersInfo.length];
      const { transporter, account } = tInfo;

      try {
        // More conservative delay to avoid Gmail detection (1s - 2s)
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 1000));

        await transporter.sendMail({
          from: `"Blue Buff Crew" <${account.user}>`,
          to: email,
          subject: subject,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #f9fafb; }
                .container { max-width: 500px; margin: 20px auto; padding: 30px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
                .logo { display: block; width: 60px; margin: 0 auto 24px; }
                .banner { width: 100%; border-radius: 10px; margin-bottom: 24px; display: block; object-fit: cover; }
                .promo-title { font-size: 24px; font-weight: 800; color: #111827; margin-bottom: 16px; line-height: 1.2; text-align: center; }
                .content { font-size: 16px; color: #4b5563; white-space: pre-wrap; margin-bottom: 32px; line-height: 1.6; }
                .cta { display: block; width: fit-content; margin: 0 auto; background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); color: #ffffff !important; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 15px; text-transform: uppercase; letter-spacing: 0.05em; transition: transform 0.2s; }
                .footer { border-top: 1px solid #e5e7eb; margin-top: 40px; padding-top: 24px; text-align: center; }
                .footer-text { font-size: 12px; color: #9ca3af; margin: 4px 0; }
                .footer-link { color: #6366f1; text-decoration: none; font-weight: 600; }
              </style>
            </head>
            <body>
              <div class="container">
                <img src="https://mlbbtopup.in/logoBB.png" alt="Blue Buff" class="logo">
                
                ${imageUrl ? `<img src="${imageUrl}" alt="Promotion" class="banner">` : ''}
                
                ${promoTitle ? `<h1 class="promo-title">${promoTitle}</h1>` : ''}
                <div class="content">${content}</div>

                <a href="https://mlbbtopup.in" class="cta">Claim Offer Now</a>

                <div class="footer">
                  <p class="footer-text"><strong>Blue Buff - Premium Gaming Topup</strong></p>
                  <p class="footer-text">
                    <a href="https://mlbbtopup.in" class="footer-link">Visit Website</a> • 
                    <a href="https://mlbbtopup.in/support" class="footer-link">24/7 Support</a>
                  </p>
                  <p class="footer-text" style="font-size: 10px; margin-top: 16px; opacity: 0.7;">
                    You are receiving this because you're a valued member of the Blue Buff community.
                    <br>© 2026 Blue Buff. All rights reserved.
                  </p>
                </div>
              </div>
            </body>
            </html>
          `,
        });
        results.success++;
      } catch (error) {
        results.failed++;
        results.errors.push({ email, error: error.message });
        console.error(`Failed to send to ${email} via ${account.user}:`, error);
      }
    }
  }

  // Start workers
  const workers = Array.from({ length: CONCURRENCY }, (_, i) => worker(i));
  await Promise.all(workers);

  return results;
}

