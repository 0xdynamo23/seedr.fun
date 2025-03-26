"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MaxWidthWrapper } from "@/components";
import Navbar from "@/components/navigation/navbar";
import Image from "next/image";

const SUPER_ADMINS = process.env.NEXT_PUBLIC_SUPER_ADMINS?.split(",") || [];

interface Project {
  id: number;
  name: string;
  description: string;
  status?: string;
  tagline?: string;
  logo?: string;
  team?: Array<{ name: string; position: string; avatar?: string }>;
  projectPics?: string[];
  links?: {
    website?: string;
    discord?: string;
    twitter?: string;
  };
}

const AdminPage = () => {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("ALL");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const storedWallet = localStorage.getItem("xion-authz-granter-account");
    if (storedWallet) {
      setWalletAddress(storedWallet);
      setIsSuperAdmin(SUPER_ADMINS.includes(storedWallet));
    } else {
      router.push("/unauthorized");
    }
  }, [router]);

  useEffect(() => {
    if (isSuperAdmin) fetchProjects();
  }, [isSuperAdmin]);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    }
  };

  const updateProjectStatus = async (projectId: number, status: "ACCEPTED" | "REJECTED") => {
    try {
      setError(null);
      setSuccessMessage(null);
      
      const res = await fetch("/api/projects/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, status }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.details || data.error || `Failed to update project status`);
      }

      setSuccessMessage(`Project status updated to ${status}`);
      await fetchProjects(); // Refresh the projects list
      setSelectedProject(null);
    } catch (error) {
      console.error("Error updating project status:", error);
      setError(error instanceof Error ? error.message : "Failed to update project status");
    }
  };

  if (!isSuperAdmin) {
    return <p className="text-center text-red-500 text-lg">Access Denied</p>;
  }

  const filteredProjects = Array.isArray(projects) 
    ? (filter === "ALL" ? projects : projects.filter(project => project.status === filter))
    : [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24">
        <MaxWidthWrapper>
          <div className="p-6">
            <h1 className="text-3xl font-bold text-black mb-8">Admin Dashboard</h1>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">Error: {error}</p>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <p className="text-emerald-600">{successMessage}</p>
              </div>
            )}

            <div className="mb-4">
              <Button onClick={() => setFilter("ALL")} className={filter === "ALL" ? "bg-emerald-500 text-white" : ""}>All</Button>
              <Button onClick={() => setFilter("ACCEPTED")} className={filter === "ACCEPTED" ? "bg-emerald-500 text-white" : ""}>Accepted</Button>
              <Button onClick={() => setFilter("REJECTED")} className={filter === "REJECTED" ? "bg-emerald-500 text-white" : ""}>Rejected</Button>
              <Button onClick={() => setFilter("PENDING")} className={filter === "PENDING" ? "bg-emerald-500 text-white" : ""}>Pending</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Projects List */}
              <div className="lg:col-span-1 bg-gray-50 rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold mb-4 text-black">Projects</h2>
                <div className="space-y-2">
                  {filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => setSelectedProject(project)}
                      className={`p-4 rounded-lg cursor-pointer transition-colors ${
                        selectedProject?.id === project.id
                          ? "bg-emerald-50 border-2 border-emerald-500"
                          : "bg-white hover:bg-emerald-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {project.logo && (
                          <Image
                            src={project.logo}
                            alt={project.name}
                            width={40}
                            height={40}
                            className="rounded-lg"
                          />
                        )}
                        <div>
                          <h3 className="font-medium text-black">{project.name}</h3>
                          <p className="text-sm text-gray-600">{project.tagline}</p>
                        </div>
                      </div>
                      <span className={`text-sm mt-2 inline-block px-2 py-1 rounded ${
                        project.status === "ACCEPTED" 
                          ? "bg-emerald-100 text-emerald-800"
                          : project.status === "REJECTED"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {project.status || "PENDING"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Details */}
              <div className="lg:col-span-2">
                {selectedProject ? (
                  <div className="bg-gray-50 rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        {selectedProject.logo && (
                          <Image
                            src={selectedProject.logo}
                            alt={selectedProject.name}
                            width={64}
                            height={64}
                            className="rounded-lg"
                          />
                        )}
                        <div>
                          <h2 className="text-2xl font-bold text-black">{selectedProject.name}</h2>
                          <p className="text-gray-600">{selectedProject.tagline}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          className="bg-emerald-500 hover:bg-emerald-600 text-white"
                          onClick={() => updateProjectStatus(selectedProject.id, "ACCEPTED")}
                        >
                          Accept
                        </Button>
                        <Button
                          className="bg-red-500 hover:bg-red-600 text-white"
                          onClick={() => updateProjectStatus(selectedProject.id, "REJECTED")}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Description */}
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-black">Description</h3>
                        <p className="text-gray-600">{selectedProject.description}</p>
                      </div>

                      {/* Project Images */}
                      {selectedProject.projectPics && selectedProject.projectPics.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-black">Project Images</h3>
                          <div className="grid grid-cols-2 gap-4">
                            {selectedProject.projectPics.map((pic, index) => (
                              <div key={index} className="relative h-48">
                                <Image
                                  src={pic}
                                  alt={`Project image ${index + 1}`}
                                  fill
                                  className="object-cover rounded-lg"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Team Members */}
                      {selectedProject.team && selectedProject.team.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-black">Team</h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {selectedProject.team.map((member, index) => (
                              <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                                {member.avatar ? (
                                  <Image
                                    src={member.avatar}
                                    alt={member.name}
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                  />
                                ) : (
                                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                    {member.name.charAt(0)}
                                  </div>
                                )}
                                <div>
                                  <p className="font-medium">{member.name}</p>
                                  <p className="text-sm text-gray-500">{member.position}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Links */}
                      {selectedProject.links && (
                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-black">Links</h3>
                          <div className="space-y-2">
                            {Object.entries(selectedProject.links).map(([platform, url]) => (
                              url && (
                                <a
                                  key={platform}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block text-emerald-500 hover:text-emerald-600"
                                >
                                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                </a>
                              )
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg shadow-md p-6 flex items-center justify-center h-full">
                    <p className="text-black">Select a project to view details</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </main>
    </>
  );
};

export default AdminPage;
