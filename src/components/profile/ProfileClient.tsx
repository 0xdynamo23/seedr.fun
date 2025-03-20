"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAbstraxionAccount } from "@burnt-labs/abstraxion";
import Navbar from '../navigation/navbar';
import Footer from '../navigation/footer';
import { Pencil } from 'lucide-react';
import { toast } from 'react-hot-toast';

// Add a utility function for consistent date formatting
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

interface Project {
  id: string;
  name: string;
  tagline: string;
  logo: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
}

interface User {
  id: string;
  name: string | null;
  email: string | null;
}

interface Contribution {
  id: string;
  projectId: string;
  projectName: string;
  projectLogo: string;
  amount: number;
  date: string;
  time: string;
}

const ProfileClient = () => {
  const { data: { bech32Address }, isConnected } = useAbstraxionAccount();
  const [projects, setProjects] = useState<Project[]>([]);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<User | null>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState('');

  // Format wallet address for display
  const formatWalletAddress = (address: string | undefined) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const handleUsernameEdit = () => {
    setTempUsername(username);
    setIsEditingUsername(true);
  };

  const handleUsernameSave = async () => {
    if (!tempUsername.trim() || !bech32Address) {
      setIsEditingUsername(false);
      return;
    }
    
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: bech32Address,
          name: tempUsername 
        })
      });
      
      if (response.ok) {
        setUsername(tempUsername);
        toast.success('Username updated successfully');
      } else {
        toast.error('Failed to update username');
      }
    } catch (error) {
      console.error('Error updating username:', error);
      toast.error('Error updating username');
    }
    
    setIsEditingUsername(false);
  };

  const handleUsernameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUsernameSave();
    } else if (e.key === 'Escape') {
      setIsEditingUsername(false);
    }
  };

  // Fetch user data and projects
  useEffect(() => {
    if (!bech32Address) return;
    
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // Fetch user data
        const userResponse = await fetch(`/api/user?id=${bech32Address}`);
        const userData = await userResponse.json();
        
        if (userData.user) {
          setUserData(userData.user);
          setUsername(userData.user.name || 'Anonymous');
          setEmail(userData.user.email || '');
        }
        
        // Fetch user's projects
        const projectsResponse = await fetch(`/api/projects?ownerId=${bech32Address}`);
        const projectsData = await projectsResponse.json();
        
        if (projectsData.projects) {
          setProjects(projectsData.projects);
        }
        
        // Keep contributions empty for now as requested
        setContributions([]);
        
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [bech32Address]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* User Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12">
          <div className="w-24 h-24 bg-emerald-100 rounded-full overflow-hidden flex items-center justify-center">
            <span className="text-3xl font-bold text-emerald-600">
              {bech32Address ? bech32Address.charAt(0).toUpperCase() : 'U'}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              {isEditingUsername ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tempUsername}
                    onChange={(e) => setTempUsername(e.target.value)}
                    onKeyDown={handleUsernameKeyDown}
                    onBlur={handleUsernameSave}
                    autoFocus
                    className="text-3xl font-bold text-gray-900 bg-transparent border-b-2 border-emerald-500 focus:outline-none"
                  />
                  <span className="text-sm text-gray-500">
                    Press Enter to save, Esc to cancel
                  </span>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-gray-900">{username}</h1>
                  <button 
                    onClick={handleUsernameEdit}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Pencil className="w-4 h-4 text-gray-500" />
                  </button>
                </>
              )}
            </div>
            <p className="text-gray-600">{email || formatWalletAddress(bech32Address)}</p>
          </div>
        </div>

        {/* Projects Listed Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Projects listed</h2>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                  <div className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-100 rounded-lg overflow-hidden flex items-center justify-center">
                        <Image 
                          src={project.logo || '/project-logos/default.png'} 
                          alt={project.name} 
                          width={48} 
                          height={48} 
                          className="object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/project-logos/default.png';
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{project.name}</h3>
                        <p className="text-sm text-gray-500">{project.tagline}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm px-2 py-1 rounded ${
                          project.status === 'ACCEPTED' 
                            ? 'bg-emerald-100 text-emerald-800'
                            : project.status === 'REJECTED'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {project.status === 'PENDING' ? 'Verification Pending' : project.status}
                        </span>
                      </div>
                      
                      <Link href={`/project/${project.id}`} className="text-sm text-gray-500 hover:text-emerald-500 flex items-center gap-1">
                        view project <span className="text-lg">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-100">
              <p className="text-gray-500">You haven't created any projects yet.</p>
              <Link href="/form" className="mt-4 inline-block px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                Create a project
              </Link>
            </div>
          )}
        </div>

        {/* Believed In Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Believed in</h2>
          
          {contributions.length > 0 ? (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Table Header - Hide on mobile */}
              <div className="hidden sm:grid grid-cols-4 gap-4 p-4 border-b border-gray-100 bg-gray-50 text-sm text-gray-500 font-medium">
                <div>PROJECT</div>
                <div>AMOUNT CONTRIBUTED</div>
                <div>CONTRIBUTED ON</div>
                <div>TIME</div>
              </div>
              
              {/* Table Content */}
              {contributions.map((contribution) => (
                <div key={contribution.id} className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 border-b border-gray-100 items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg overflow-hidden flex items-center justify-center">
                      <Image 
                        src={contribution.projectLogo || '/project-logos/default.png'} 
                        alt={contribution.projectName} 
                        width={40} 
                        height={40} 
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/project-logos/default.png';
                        }}
                      />
                    </div>
                    <span className="font-medium">{contribution.projectName}</span>
                  </div>
                  
                  {/* Mobile labels */}
                  <div className="sm:hidden mt-3 grid grid-cols-2 gap-2">
                    <div className="text-xs text-gray-500">AMOUNT:</div>
                    <div className="text-xs text-gray-500">DATE:</div>
                    <div className="flex items-center">
                      <span className='text-md text-black'>{contribution.amount} XION</span>
                    </div>
                    <div className='text-sm text-black'>{contribution.date}</div>
                    <div className="text-xs text-gray-500">TIME:</div>
                    <div></div>
                    <div className='text-sm text-black'>{contribution.time}</div>
                  </div>
                  
                  {/* Desktop view */}
                  <div className="hidden sm:flex items-center">
                    <div className="flex items-center gap-2">
                      <span className='text-md text-black'>{contribution.amount} XION</span>
                    </div>
                  </div>
                  <div className='hidden sm:block text-sm text-black'>{contribution.date}</div>
                  <div className="hidden sm:flex items-center justify-between">
                    <span className='text-sm text-black'>{contribution.time}</span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                      </svg>
                    </button>
                  </div>
                  
                  {/* Mobile action button */}
                  <div className="sm:hidden flex justify-end mt-2">
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-100">
              <p className="text-gray-500">You haven't believed in any projects yet.</p>
              <Link href="/" className="mt-4 inline-block px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                Discover projects
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfileClient; 