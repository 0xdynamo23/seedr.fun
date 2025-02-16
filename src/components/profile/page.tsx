"use client";
import Image from 'next/image';
import Link from 'next/link';

const mockData = {
  user: {
    name: "username4000",
    email: "username@gmail.com",
  },
  projects: [
    {
      id: "1",
      name: "Cyronomics",
      tagline: "Platform to sell comics on chain",
      logo: "/project-logo.png", // Replace with actual logo path
      contributors: 5,
      raised: 2455,
    },
    {
      id: "2",
      name: "Cyronomics",
      tagline: "Platform to sell comics on chain",
      logo: "/project-logo.png", // Replace with actual logo path
      contributors: 5,
      raised: 2455,
    },
  ],
  beliefs: [
    {
      id: "1",
      project: {
        name: "Cyronomics",
        logo: "/project-logo.png", // Replace with actual logo path
      },
      amount: 127,
      timestamp: "2025-02-21T14:45:00",
    },
    {
      id: "2",
      project: {
        name: "Cyronomics",
        logo: "/project-logo.png", // Replace with actual logo path
      },
      amount: 127,
      timestamp: "2025-02-21T14:45:00",
    },
  ],
};

const ProfilePage = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* User Header */}
            <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-gray-300" /> {/* Placeholder for avatar */}
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-black">{mockData.user.name}</h1>
                    <p className="text-gray-600">{mockData.user.email}</p>
                </div>
            </div>

            {/* Projects Listed Section */}
            <div className="mb-12">
                <h2 className="text-xl font-semibold mb-4">Projects listed</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockData.projects.map((project) => (
                        <div key={project.id} className="bg-white rounded-lg shadow-md p-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 rounded-lg bg-gray-200" /> {/* Placeholder for project logo */}
                                <div>
                                    <h3 className="font-semibold text-black">{project.name}</h3>
                                    <p className="text-sm text-gray-600">{project.tagline}</p>
                                </div>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>{project.contributors} Contributors</span>
                                <span>${project.raised} Raised</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Believed In Section */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Believed in</h2>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Contributed</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contributed On</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {mockData.beliefs.map((belief) => (
                                <tr key={belief.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-gray-200" /> {/* Placeholder for project logo */}
                                            <span className="font-medium text-black">{belief.project.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            <span>{belief.amount} XION</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {new Date(belief.timestamp).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {new Date(belief.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;