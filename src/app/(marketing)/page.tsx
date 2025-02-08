"use client";
import { AnimationContainer, MaxWidthWrapper } from "@/components";
import HeroSection from "@/components/home/home";
import { motion } from "framer-motion";
import Link from "next/link";

const ProjectCard = ({ project }) => (
  <motion.div 
    className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all cursor-pointer"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false }}
    transition={{
      duration: 0.3,
      ease: "circInOut",
    }}
  >
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 bg-orange rounded-md flex items-center justify-center">
        <img
          src="/assets/home/logo.png"
          alt="Cyronomics"
          className="w-6 h-6"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Cyronomics</h3>
          <button className="opacity-50 hover:opacity-100">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M12 4l-8 8M4 4l8 8" />
            </svg>
          </button>
        </div>
        
        <div className="flex items-center gap-2 mt-3 text-sm text-gray-400">
          <span>$2,456</span>
          <span className="opacity-50">Raised</span>
        </div>
        <div className="mt-3">
          <Link href="/project">
            <span className="text-sm text-blue-400 hover:underline">view project →</span>
          </Link>
        </div>
      </div>
    </div>
  </motion.div>
);

const HomePage = async () => {
  const projects = Array(9).fill({
    title: "Cyronomics",
    description: "Platform to sell comics on chain",
    raised: 2456
  });

  return (
    <div className="scrollbar-hide size-full">

      {/* Our work */}
      <MaxWidthWrapper className="bg-white">
      <HeroSection />
        
      </MaxWidthWrapper>

    </div>
  );
};

export default HomePage;