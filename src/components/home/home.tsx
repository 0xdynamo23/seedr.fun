"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { footer } from "../navigation/footer";
import { useState } from "react";
const projects = [{
  id: 1,
  title: "Cyronomics",
  description: "Platform to sell comics on chain",
  raised: 2456,
  contributors: 5,
  category: "DAO"
},
{
  id: 2,
  title: "Cyronomics",
  description: "Platform to sell comics on chain",
  raised: 2456,
  contributors: 5,
  category: "DeFi"
},
]
type Project = {
  id: number;
  title: string;
  description: string;
  raised: number;
  contributors: number;
  category: string;
}
type ProjectProps = { project: Project };

const ProjectCard: React.FC<ProjectProps> = ({ project }) => (
  <div className="p-6 rounded-xl border border-gray-200 bg-white">
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">C</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{project.title}</span>
          <span className="text-sm text-gray-500">
            {project.description}
          </span>
        </div>
      </div>
      <button className="text-gray-400 hover:text-gray-600">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      </button>
    </div>
    <div className="mt-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">{project.contributors} Contributors</span>
        <span className="text-sm font-medium">${project.raised} Raised</span>
      </div>
      <Link href={`/project/${project.id}`} className="text-sm text-blue-500 hover:underline">
        view project →
      </Link>
    </div>
  </div>
);


const HeroSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("Trending");
  return (
    <div className="min-h-screen bg-white w-full xl:max-w-screen-xl">
      {/* Background image */}
      <div
        className="absolute right-0 top-0 "
        style={{ width: "877px", height: "657px", marginTop: "-54px" }}
      >
        <Image
          src="/bg-right.png"
          alt="Background"
          width={877}
          height={657}
          style={{ objectFit: "cover", objectPosition: "center" }}
          className="rounded-l-3xl"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative px-2 max-w-full">
        <div className="pt-24 max-w-full mx-auto">
          {/* Hero Content */}
          <div className="max-w-2xl mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Support builders you trust
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gray-600 text-lg mb-8"
            >
              Make a difference by supporting initiatives you believe in,
              contribute through Seeder rounds to bring impactful ideas to life.
            </motion.p>

            <Link href="/start">
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2"
              >
                Start believing
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.button>
            </Link>
          </div>

          {/* Projects Section */}
          <div className="w-full">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Projects</h2>

            {/* Category Filters */}
            <div className="flex gap-3 mb-6 overflow-x-auto scrollbar-hide pb-2">
              {[
                "Trending",
                "All Projects",
                "Infrastructure",
                "DAO",
                "DeFi",
                "NFT",
              ].map((category, index) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${category == selectedCategory
                    ? "bg-gray-900 text-white"
                    : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects
                .filter((project) =>
                  ["all projects", "trending"].includes(selectedCategory.toLowerCase()) ||
                  project.category.toLowerCase() === selectedCategory.toLowerCase()
                )
                .map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-8 w-full">
              <button className="flex items-center gap-2 px-3 py-1 rounded-full text-gray-600 hover:bg-gray-50">
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              {[1, 2, 3, "...", 10].map((page, i) => (
                <button
                  key={i}
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${page === 1 ? "bg-gray-100" : "hover:bg-gray-50"
                    } text-black`}
                >
                  {page}
                </button>
              ))}
              <button className="flex items-center gap-1 px-3 py-1 rounded-full text-gray-600 hover:bg-gray-50">
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <footer />
    </div>
  );
};

export default HeroSection;
