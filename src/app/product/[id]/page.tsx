"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import projects from "../../data/projects";
import Image from "next/image";
import Link from "next/link";

type Project = {
  id: number;
  title: string;
  description: string;
  raised: number;
  contributors: number;
  category: string;
};

const ProjectPage = () => {
  const router = useRouter();
  // const { id } = router.query;
  const [project, setProject] = useState<Project | null>(null);

  // useEffect(() => {
  //   if (id) {
  //     const foundProject = projects.find((p) => p.id === Number(id));
  //     setProject(foundProject || null);
  //   }
  // }, [id]);

  if (!project) {
    return <div className="text-center mt-10">Project not found</div>;
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-4">
          <Image src="/icons/icon4.png" alt="Logo" width={50} height={50} />
          <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
        </div>

        <p className="text-gray-600 mt-4">{project.description}</p>

        <div className="mt-6 flex justify-between">
          <span className="text-gray-500">{project.contributors} Contributors</span>
          <span className="text-green-600 font-medium">${project.raised} Raised</span>
        </div>

        <div className="mt-6">
          <Link href="/">
            <button className="bg-gray-900 text-white px-4 py-2 rounded-lg">
              ← Back to Projects
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
