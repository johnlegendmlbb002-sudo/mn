"use client";

import dynamic from "next/dynamic";
import GameBannerCarousel from "./GameBannerCarousel";
import HomeServices from "./HomeServices";
import TrustHighlights from "./TrustHighlights";
import TopNoticeBanner from "./TopNoticeBanner";
import StorySlider from "./StorySlider";
import TradeMarketplaceBanner from "./TradeMarketplaceBanner";
import HomeEarnPromotion from "./HomeEarnPromotion";
import SEOContent from "./SEOContent";
import SupportBanner from "./SupportBanner";
import CustomWebBanner from "./CustomWebBanner";
import GiveawayBanner from "./GiveawayBanner";

// Lazy-load below-fold & heavy components to reduce initial bundle
const FlashSale = dynamic(() => import("./FlashSale"), { ssr: false });
const HomeQuickActions = dynamic(() => import("./HomeQuickActions"), { ssr: false });
const HomeReferralStats = dynamic(() => import("./HomeReferralStats"), { ssr: false });
const GamesPage = dynamic(() => import("@/app/games/page"), { ssr: false });

export default function HeroSection({ bannerSettings }: { bannerSettings?: any }) {

  // If bannerSettings isn't passed (e.g. client navigation before cache warms up), default to showing GiveawayBanner only
  const bs = bannerSettings || { 
    showGiveawayBanner: true, 
    showGameBannerCarousel: true,
    showStorySlider: true,
    showFlashSale: true
  };

  return (
    <>
      {bs.showTopNoticeBanner && <TopNoticeBanner />}
      {bs.showHomeEarnPromotion && <HomeEarnPromotion />}
      {bs.showTradeMarketplaceBanner && <TradeMarketplaceBanner />}
      {bs.showCustomWebBanner && <CustomWebBanner />}
      {bs.showGiveawayBanner && <GiveawayBanner />}
     

      {bs.showGameBannerCarousel !== false && <GameBannerCarousel />}

      <div className="space-y-1 mt-2">
        {bs.showStorySlider !== false && <StorySlider />}

        {bs.showFlashSale !== false && <FlashSale />}
      </div>


      {/* <PromoBanner /> */}

      <div className="space-y-1">

        {bs.showHomeQuickActions !== false && <HomeQuickActions />}
        {/* <HomeReferralStats /> */}
      </div>

      <GamesPage />
      <SupportBanner />

      {/* <div className="mt-1 space-y-12 pb-10">
        <HomeServices />
        <TrustHighlights />
      </div> */}

      <SEOContent />


      {/* <ScrollingNoticeBand /> */}



    </>

  );
}
