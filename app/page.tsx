// app/page.tsx
import HomeSection from "@/components/Home/Home";
import TelegramQRPopup from "@/components/TelegramQRPopup";

export const metadata = {
  title: "Cheapest MLBB Diamond Top Up India | mlbbtopup.in",
  description:
    "Safe & instant MLBB diamond top up in India. Cheapest rates for Weekly Pass, Starlight & skins. Secure UPI/Paytm payments with 5-minute delivery. Trusted by thousands.",

  alternates: {
    canonical: "https://mlbbtopup.in",
  },

};

import { getAppSettings } from "@/lib/settings";
import WhatsAppCommunityPopup from "@/components/WhatsAppQRPopup";
import Script from "next/script";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I buy MLBB diamonds in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Visit mlbbtopup.in, select your diamond pack, enter your MLBB Player ID and Zone ID, choose UPI/PhonePe/Google Pay/Paytm, and confirm. Diamonds are delivered within 5 minutes â€” no Moonton login required.",
      },
    },
    {
      "@type": "Question",
      name: "Is mlbbtopup.in safe and legit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. mlbbtopup.in is a trusted MLBB diamond top-up site used by thousands of Indian players. We use secure UPI payment gateways and top up via Moonton's official API. Your account credentials are never required.",
      },
    },
    {
      "@type": "Question",
      name: "What is the cheapest way to buy MLBB diamonds in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "mlbbtopup.in offers the lowest diamond prices in India â€” often 10â€“20% cheaper than Codashop or the in-game store. The Weekly Diamond Pass starting at â‚¹89 is the best value for regular players.",
      },
    },
    {
      "@type": "Question",
      name: "How fast is MLBB diamond delivery?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Diamond delivery is instant â€” typically within 1 to 5 minutes of successful payment. Our automated delivery system runs 24Ã—7.",
      },
    },
    {
      "@type": "Question",
      name: "Which payment methods are supported for MLBB top up?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We support all major Indian payment methods: UPI (any VPA/QR), PhonePe, Google Pay, Paytm, and bank transfers. No credit card needed.",
      },
    },
    {
      "@type": "Question",
      name: "Is the MLBB Weekly Diamond Pass worth it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The Weekly Diamond Pass gives 100 diamonds immediately plus 20 diamonds/day for 7 days â€” 240 diamonds total. At â‚¹89 on mlbbtopup.in, that's under â‚¹0.37 per diamond â€” the highest-value MLBB purchase for regular players.",
      },
    },
  ],
};

export default async function Page() {
  const settings = await getAppSettings();
  return (
    <main>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {settings.showTelegramPopup && <TelegramQRPopup />}
      {settings.showWhatsappPopup && <WhatsAppCommunityPopup />}

      <HomeSection bannerSettings={{
        showTopNoticeBanner: settings.showTopNoticeBanner,
        showHomeEarnPromotion: settings.showHomeEarnPromotion,
        showTradeMarketplaceBanner: settings.showTradeMarketplaceBanner,
        showCustomWebBanner: settings.showCustomWebBanner,
        showGiveawayBanner: settings.showGiveawayBanner,
        showGameBannerCarousel: settings.showGameBannerCarousel,
        showStorySlider: settings.showStorySlider,
        showFlashSale: settings.showFlashSale,
        showHomeQuickActions: settings.showHomeQuickActions
      }} />
    </main>
  );
}

