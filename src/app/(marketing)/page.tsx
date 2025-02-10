"use client";
import { AnimationContainer, MaxWidthWrapper } from "@/components";
import HeroSection from "@/components/home/home";

const HomePage = async () => {

  return (
    <div className="scrollbar-hide size-full">

      <MaxWidthWrapper className="bg-white">
        <HeroSection />
      </MaxWidthWrapper>

    </div>
  );
};

export default HomePage;