"use client";

import GamesPage from "@/app/games/page";
import GameBannerCarousel from "./GameBannerCarousel";
import HomeServices from "./HomeServices";
import TrustHighlights from "./TrustHighlights";
import TopNoticeBanner from "./TopNoticeBanner";
import FlashSale from "./FlashSale";
import ScrollingNoticeBand from "./ScrollingNoticeBand";
import StorySlider from "./StorySlider";
import HomeQuickActions from "./HomeQuickActions";
import TradeMarketplaceBanner from "./TradeMarketplaceBanner";
import HomeReferralStats from "./HomeReferralStats";
import PromoBanner from "./PromoBanner";
import HomeEarnPromotion from "./HomeEarnPromotion";
import SEOContent from "./SEOContent";
import SupportBanner from "./SupportBanner";
import CustomWebBanner from "./CustomWebBanner";
import GiveawayBanner from "./GiveawayBanner";

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

      <div className="mt-1 space-y-12 pb-10">
        <HomeServices />
        <TrustHighlights />
      </div>

      <SEOContent />


      {/* <ScrollingNoticeBand /> */}



    </>

  );
}
