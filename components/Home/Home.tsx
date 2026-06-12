import HeroSection from "./HeroSection";

export default function HomeSection({ bannerSettings }: { bannerSettings?: any }) {
  return (
    <main>
      <HeroSection bannerSettings={bannerSettings} />
    </main>
  );

}
