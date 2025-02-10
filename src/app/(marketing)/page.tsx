"use client";
import { MaxWidthWrapper } from "@/components";
import HeroSection from "@/components/home/home";

const HomePage = () => {

  return (
    <div className="scrollbar-hide size-full">

      <MaxWidthWrapper className="bg-white">
        <HeroSection />
      </MaxWidthWrapper>

    </div>
  );
};

export default HomePage;