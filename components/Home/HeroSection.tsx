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

export default function HeroSection() {


  return (
    <>
      {/* <TopNoticeBanner /> */}
      {/* <HomeEarnPromotion /> */}
      {/* <TradeMarketplaceBanner /> */}
      <div className="max-w-7xl mx-auto px-4 mt-4 space-y-2">
        {/* <CustomWebBanner /> */}
        <GiveawayBanner />
      </div>

      {/* <GameBannerCarousel /> */}

      <div className="space-y-1 mt-2">
        <StorySlider />

        <FlashSale />
      </div>


      {/* <PromoBanner /> */}

      <div className="space-y-1">

        <HomeQuickActions />
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
