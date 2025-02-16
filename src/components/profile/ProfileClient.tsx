"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Add a utility function for consistent date formatting
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  logo: string;
  ownerId: string;
}

const ProfileClient = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const response = await axios.get('/api/getprojects');
                console.log('All projects:', response.data);
                
                // Filter projects by ownerId
                const userProjects = response.data.data.filter(
                    (project: Project) => project.ownerId === userId
                );
                
                console.log('User projects:', userProjects);
                setProjects(userProjects);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching projects:', error);
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-gray-300" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-black">Your Projects</h1>
                    <p className="text-gray-600">Manage your listed projects</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.length === 0 ? (
                    <div className="col-span-full text-center py-10">
                        <p className="text-gray-500">No projects found.</p>
                    </div>
                ) : (
                    projects.map((project) => (
                        <Link href={`/project/${project.id}`} key={project.id}>
                            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <div className="p-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-lg overflow-hidden relative">
                                            <Image
                                                src={project.logo}
                                                alt={project.name}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 48px) 100vw, 48px"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {project.name}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {project.tagline}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-4 pb-4">
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        {project.description}
                                    </p>
                                    <div className="mt-4">
                                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                                            {project.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProfileClient; 