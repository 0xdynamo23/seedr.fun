"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MaxWidthWrapper } from "@/components";

const SUPER_ADMINS = process.env.NEXT_PUBLIC_SUPER_ADMINS?.split(",") || [];

const AdminPage = () => {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    const storedWallet = localStorage.getItem("xion-authz-granter-account"); // Assuming the wallet is stored in localStorage
    if (storedWallet) {
      setWalletAddress(storedWallet);
      setIsSuperAdmin(SUPER_ADMINS.includes(storedWallet));
    } else {
      router.push("/unauthorized"); // Redirect if no wallet found
    }
  }, []);

  useEffect(() => {
    if (isSuperAdmin) fetchProjects();
  }, [isSuperAdmin]);

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
  };

  const updateProjectStatus = async (projectId: number, status: "ACCEPTED" | "REJECTED") => {
    await fetch("/api/projects/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId, status }),
    });
    fetchProjects(); // Refresh project list
  };

  if (!isSuperAdmin) {
    return <p className="text-center text-red-500 text-lg">Access Denied</p>;
  }

  return (
    <MaxWidthWrapper>
    <div className="min-h-screen p-6 bg-gray-100 ">
      <h1 className="text-4xl font-bold text-center mb-6 text-black">Admin Dashboard</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg text-black">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-3 px-6">Project Name</th>
              <th className="py-3 px-6">Description</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b text-center">
                <td className="py-3 px-6">{project.name}</td>
                <td className="py-3 px-6">{project.description}</td>
                <td className="py-3 px-6">{project.status || "PENDING"}</td>
                <td className="py-3 px-6 flex justify-center gap-2">
                  <Button
                    className="bg-green-500 text-white px-4 py-2"
                    onClick={() => updateProjectStatus(project.id, "ACCEPTED")}
                  >
                    Accept
                  </Button>
                  <Button
                    className="bg-red-500 text-white px-4 py-2"
                    onClick={() => updateProjectStatus(project.id, "REJECTED")}
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </MaxWidthWrapper>
  );
};

export default AdminPage;
