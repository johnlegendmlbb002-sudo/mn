import type { Metadata } from "next";
import Script from "next/script";

export const dynamic = "force-dynamic";

import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import SocialFloat from "@/components/SocialFloat/SocialFloat";
import { GoogleAnalytics } from '@next/third-parties/google';
import ChristmasPopup from "@/components/Seasonal/ChristmasPopup";
import { Poppins } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import ChatBot from "@/components/SocialFloat/Chatbot"; // Removed as we use wrapper
import ChatbotWrapper from "@/components/Layout/ChatbotWrapper";
import ValentinePopup from "@/components/Seasonal/ValentinePopup";
import ValentineEffect from "@/components/Seasonal/ValentineEffect";
import Maintaince from "@/components/Seasonal/Maintaince";
import MaintenanceWrapper from "@/components/Layout/MaintenanceWrapper";
import { FEATURE_FLAGS } from "@/lib/featureFlags";
import { getAppSettings } from "@/lib/settings";
import BottomNav from "@/components/Layout/BottomNav";
import SeasonalEffectManager from "@/components/Seasonal/SeasonalEffectManager";
import PWAInstallBanner from "@/components/Layout/PWAInstallBanner";





export const metadata: Metadata = {
  title: {
    default: "MLBB Top Up India – Buy Cheapest Diamonds Instantly | mlbbtopup.in",
    template: "%s | MLBB Top Up India – Buy Cheapest Diamonds Instantly",
  },
  description:
    "Safe & instant MLBB diamond top up in India. Cheapest rates for Weekly Pass, Starlight & skins. Secure UPI/Paytm payments with 5-minute delivery. Trusted by thousands.",

keywords: [

  // ── CORE / PRIMARY (15) ──────────────────────────────────────────
  // Use these on: homepage title, H1, meta description
  "mlbb topup",
  "mlbb diamond topup",
  "mlbb diamond recharge",
  "mlbb diamond top up",
  "buy mlbb diamonds",
  "buy mlbb diamonds india",
  "mlbb diamonds india",
  "mlbb top up india",
  "mlbb top up online",
  "mlbb direct top up india",
  "mlbb recharge website",
  "mlbb diamond purchase india",
  "mobile legends topup",
  "mobile legends recharge india",
  "mobile legends diamonds india",

  // ── PRICE & VALUE (25) ───────────────────────────────────────────
  // Use these on: homepage sections, product pages, blog posts about pricing
  "mlbb recharge india cheap",
  "cheapest mlbb top up",
  "cheapest mlbb recharge website",
  "cheapest mlbb top up website in india",
  "buy ml diamonds india low price",
  "lowest price mlbb diamonds india",
  "mlbb diamonds lowest price india",
  "mlbb diamonds cheap",
  "mlbb top up cheap",
  "mlbb recharge best price india",
  "mlbb best price recharge",
  "mlbb diamond rate india today",
  "mlbb diamond price list india",
  "mlbb diamond bundle recharge india",
  "mlbb weekly pass cheapest india",
  "mlbb recharge bonus diamonds india",
  "mlbb promo diamonds india",
  "mlbb promo code india",
  "mlbb recharge deals india",
  "mlbb recharge offer india today",
  "mlbb recharge sale india",
  "mlbb recharge special event offer",
  "mlbb top up discount",
  "mlbb topup discount india",
  "mlbb discount diamonds india",

  // ── SPEED & DELIVERY (10) ────────────────────────────────────────
  // Use these on: homepage USP section, product pages
  "mlbb top up india instant",
  "instant mlbb recharge",
  "instant mlbb diamond top up india",
  "mlbb instant diamonds delivery",
  "mlbb diamonds instant delivery india",
  "mlbb top up instant delivery",
  "fastest mlbb recharge india",
  "mlbb recharge fast india",
  "mlbb recharge fast delivery india",
  "buy mobile legends diamonds instantly",

  // ── TRUST & SAFETY (8) ───────────────────────────────────────────
  // Use these on: about page, homepage trust section, FAQ page
  "mlbb recharge trusted site india",
  "trusted mlbb recharge website",
  "trusted mlbb diamond seller india",
  "safe mlbb topup site india",
  "safe mlbb recharge website india",
  "secure mlbb top up site",
  "secure mlbb recharge with upi",
  "legit mlbb recharge india",
  "mlbb recharge trusted or not",

  // ── PAYMENT METHODS (11) ─────────────────────────────────────────
  // Use these on: payment/checkout page, homepage payment section
  "mlbb recharge with upi",
  "mlbb top up with upi",
  "mlbb recharge with phonepe",
  "mlbb recharge with google pay",
  "mlbb recharge with paytm",
  "mlbb recharge without card india",
  "mlbb recharge without login",
  "mlbb top up india no login",
  "instant mlbb recharge without login",
  "mlbb topup without moonton login",
  "secure mlbb recharge with upi",

  // ── PRODUCT TYPES (9) ────────────────────────────────────────────
  // Use these on: individual product/category pages
  "mlbb weekly pass recharge india",
  "mlbb weekly pass cheapest india",
  "mlbb weekly pass worth it india",
  "mlbb weekly diamond pass india",
  "mlbb twilight pass recharge india",
  "mlbb starlight recharge india",
  "mlbb elite pass recharge",
  "mlbb subscription recharge india",
  "mlbb event recharge india",
  "mlbb skins purchase india",

  // ── COMPARISON / COMPETITOR (11) ─────────────────────────────────
  // Use these on: a dedicated comparison blog post or landing page
  "codashop vs mlbbtopup india",
  "codashop alternative india mlbb",
  "mlbb top up better than codashop",
  "mlbb top up comparison india",
  "mlbb recharge price comparison india",
  "cheapest mlbb recharge site comparison",
  "best mlbb topup website india 2026",
  "best mlbb recharge site india",
  "best mlbb recharge website 2026",
  "best site to buy mlbb diamonds india",
  "best site for mlbb top up cheap",

  // ── HOW-TO / INFORMATIONAL (7) ───────────────────────────────────
  // Use these on: blog posts, FAQ page — do NOT put on homepage
  "how to buy mlbb diamonds in india",
  "how to top up mlbb diamonds india",
  "how to top up mlbb instantly",
  "how to get cheap mlbb diamonds",
  "is mlbb top up safe",
  "where to buy mlbb diamonds india",
  "where to buy cheapest mlbb diamonds",



],


  metadataBase: new URL("https://mlbbtopup.in"),
  openGraph: {
    title: "MLBB Top Up India – Buy Cheapest Diamonds Instantly | mlbbtopup.in",
    description:
      "Safe & instant MLBB diamond top up in India. Cheapest rates for Weekly Pass, Starlight & skins. Secure UPI/Paytm payments with 5-minute delivery. Trusted by thousands.",
    url: "https://mlbbtopup.in",
    siteName: "mlbbtopup.in",
    images: [
      {
        url: "/logoBB.png",
        width: 800,
        height: 600,
        alt: "mlbbtopup.in - MLBB Topup India",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MLBB Top Up India – Buy Cheapest Diamonds Instantly | mlbbtopup.in",
    description: "Safe & instant MLBB diamond top up in India. Cheapest rates for Weekly Pass, Starlight & skins. Secure UPI/Paytm payments with 5-minute delivery. Trusted by thousands.",
    images: ["/logoBB.png"],
    creator: "@MLBB Topup_india",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getAppSettings();

  return (
    <html lang="en" className={poppins.variable}>
      {/* Capture beforeinstallprompt BEFORE React hydrates */}
      <script dangerouslySetInnerHTML={{ __html: `
        window.__pwaPrompt = null;
        window.addEventListener('beforeinstallprompt', function(e) {
          e.preventDefault();
          window.__pwaPrompt = e;
        });
      `}} />

      <body className="bg-black text-white">
        {/* Structured Data for SEO */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Blue Buff",
              "url": "https://mlbbtopup.in",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://mlbbtopup.in/games?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <Script
          id="organization-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Blue Buff",
              "url": "https://mlbbtopup.in",
              "logo": "https://mlbbtopup.in/logoBB.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": `+91-${process.env.NEXT_PUBLIC_SUPPORT_PHONE}`,
                "contactType": "customer service",
                "areaServed": "IN",
                "availableLanguage": "en"
              },
              "sameAs": [
                "https://instagram.com/mlbbtopup.in",
                "https://x.com/tk_dev_"
              ]
            })
          }}
        />
        <GoogleAnalytics gaId="G-CKCKWLGJ9N" />
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
          <Header />

          <SeasonalEffectManager />

          <MaintenanceWrapper maintenanceMode={settings.maintenanceMode} />
          <main className="pt-14 pb-24 md:pb-0">{children}</main>




          <Footer />
          <SocialFloat />
          <ChatbotWrapper />
          {settings.showBottomNav !== false && <BottomNav />}
          <PWAInstallBanner />
          <div />
        </GoogleOAuthProvider>


        {/* OneSignal SDK */}
        <Script
          src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
          strategy="afterInteractive"
        />

        <Script id="onesignal-init" strategy="afterInteractive">
          {`
            window.OneSignalDeferred = window.OneSignalDeferred || [];
            OneSignalDeferred.push(async function(OneSignal) {
              await OneSignal.init({
                appId: "b7844eac-b557-40e4-ad01-11546347a279",
                safari_web_id: "web.onesignal.auto.5ccade99-0f35-4775-9ae0-5e2c3bfd110b",
                allowLocalhostAsSecureOrigin: true,
                notifyButton: {
                  enable: false, // Turned off the persistent bell icon
                },
              });

              // Automatically show the slidedown prompt if not subscribed
              if (!OneSignal.Notifications.permission) {
                 OneSignal.Slidedown.promptPush();
              }
            });
          `}
        </Script>

      </body>
    </html>
  );
}
