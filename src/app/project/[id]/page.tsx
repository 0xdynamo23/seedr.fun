"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Footer, Navbar } from "@/components";
import {
  PaymentModal,
  ProjectHeader,
  ProjectGallery,
  ProjectActions,
  ProjectTabs,
  ComingSoonDialog
} from "@/components/project";

type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  raised: number;
  contributors: number;
  category: string;
  logo: string;
  projectPics?: string[];
  links?: {
    telegram: string | null;
    x: string | null;
    discord: string | null;
    website: string | null;
  }[];
  timestamp: string;
  createdAt: string;
};

interface Comment {
  id: number;
  text: string;
  author: string;
  timestamp: string;
}

const ProductPage = ({ params }: { params: { id: string } }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isComingSoon, setIsComingSoon] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post(`/api/product`, { id: params.id });
        setProject(response.data);
        fetchComments(); // Fetch comments when the project is fetched
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/comments?projectId=${params.id}`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchProject();
  }, [params.id]);

  const handleBelieveClick = () => {
    setIsPaymentModalOpen(true);
  };

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? "Removed from bookmarks" : "Added to bookmarks", {
      icon: isBookmarked ? "🗑️" : "🔖",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const handleAddComment = async (text: string) => {
    if (!text.trim()) return;

    const commentData = {
      text: text,
      projectId: project?.id,
    };

    try {
      const response = await axios.post('/api/comments', commentData);
      setComments((prev) => [response.data, ...prev]); // Add new comment to the state
      toast.success("Comment added successfully!");
      return Promise.resolve();
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment. Please try again.");
      return Promise.reject(error);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 text-lg">Loading amazing project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 text-red-500 mb-4">❌</div>
          <p className="text-gray-600 text-lg">Project not found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      
      {/* Hero Section with Banner */}
      <ProjectHeader project={project} />
      
      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Buttons */}
        <ProjectActions 
          isBookmarked={isBookmarked}
          onBelieveClick={handleBelieveClick}
          onBookmarkClick={handleBookmarkClick}
          onShareClick={() => setIsComingSoon(true)}
        />
        
        {/* Project Gallery */}
        {project.projectPics && project.projectPics.length > 0 && (
          <ProjectGallery 
            projectPics={project.projectPics} 
            projectName={project.name} 
          />
        )}
        
        {/* Content Tabs */}
        <ProjectTabs 
          project={project}
          comments={comments}
          onAddComment={handleAddComment}
        />
      </div>
      
      <hr className="w-full mx-auto mt-10"></hr>

      {/* Coming Soon Dialog */}
      <ComingSoonDialog 
        isOpen={isComingSoon}
        onClose={() => setIsComingSoon(false)}
      />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        project={project}
        onSubmit={(amount) => {
          console.log(
            `Processing payment of ${amount} XION for ${project.name}`
          );
          // Here you would typically handle the payment processing
        }}
      />
      
      <Footer />
    </>
  );
};

export default ProductPage;
