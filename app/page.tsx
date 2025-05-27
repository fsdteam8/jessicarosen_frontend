

import HomeHero from "@/components/HomeHero"
import ExploreSelling from "@/components/ExploreSelling"
import BestSellesrs from "@/components/BestSellesrs"

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col">

     <HomeHero/>
     <ExploreSelling/>
<BestSellesrs/>
    </div>
  );
}
