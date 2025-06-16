import HomeHero from "@/components/HomeHero";
import BestSellesrs from "@/components/BestSellesrs";
import ExploreSelling from "@/components/ExploreSelling";
import ExplorePopular from "@/components/ExplorePopular";
import LegalDoc from "@/components/HomePage/LegalDoc";

export default function Home() {
  return (
    <div className="">
      <HomeHero />
      <ExploreSelling />
      <BestSellesrs />
      <ExplorePopular />
      <LegalDoc />
    </div>
  );
}
