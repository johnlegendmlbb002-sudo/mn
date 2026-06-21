import crypto from 'crypto';

const APP_SECRET = process.env.NEXT_PUBLIC_APP_SECRET || 'bluebuff-secure-key-2024';

/**
 * Validates the HMAC signature of an incoming API request.
 * @param req The Next.js incoming Request
 * @param rawBody The stringified JSON body (must be read beforehand using req.text() or cloned req)
 * @param authHeader The authorization header containing the JWT (optional, used to salt secret)
 * @returns boolean indicating if signature is valid
 */
export function verifyHmac(req: Request, rawBody: string, authHeader: string | null): boolean {
  const timestamp = req.headers.get('x-app-timestamp');
  const signature = req.headers.get('x-app-signature');

  if (!timestamp || !signature) {
    return false;
  }

  // Check if timestamp is within 30 seconds (30000 ms)
  const now = Date.now();
  const reqTime = parseInt(timestamp, 10);
  
  if (isNaN(reqTime) || Math.abs(now - reqTime) > 30000) {
    console.warn(`[HMAC] Timestamp expired or invalid. ReqTime: ${reqTime}, Now: ${now}`);
    return false;
  }

  // Reconstruct the secret
  let token = '';
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }
  const secret = token ? `${APP_SECRET}_${token.substring(0, 20)}` : APP_SECRET;

  // Reconstruct the data to sign
  const dataToSign = `${rawBody}:${timestamp}`;

  // Generate signature
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(dataToSign)
    .digest('hex');

  if (signature !== expectedSignature) {
    console.warn(`[HMAC] Signature mismatch. Expected: ${expectedSignature}, Got: ${signature}`);
    return false;
  }

  return true;
}
