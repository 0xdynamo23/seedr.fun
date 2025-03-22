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
import { useAbstraxionAccount } from "@burnt-labs/abstraxion";

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
  likeCount?: number;
  likes?: { userId: string }[];
  replies?: Comment[];
  userId?: string;
}

const ProductPage = ({ params }: { params: { id: string } }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isComingSoon, setIsComingSoon] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get wallet address from Abstraxion
  const { data: { bech32Address }, isConnected } = useAbstraxionAccount();

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
        
        // Process the comments to add author information based on userId
        const processedComments = response.data.map((comment: any) => {
          // Format the author display name
          const authorName = comment.userId ? 
            (comment.userId === bech32Address ? 
              "You" : 
              `User-${comment.userId.substring(0, 6)}`) :
            "Anonymous";
          
          // Process any replies
          const processedReplies = comment.replies ? comment.replies.map((reply: any) => {
            const replyAuthorName = reply.userId ? 
              (reply.userId === bech32Address ? 
                "You" : 
                `User-${reply.userId.substring(0, 6)}`) :
              "Anonymous";
            
            return {
              ...reply,
              author: replyAuthorName
            };
          }) : [];
          
          return {
            ...comment,
            author: authorName,
            replies: processedReplies
          };
        });
        
        // Load like counts for all comments
        const commentsWithLikes = await loadLikeCounts(processedComments);
        setComments(commentsWithLikes);
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

  const handleAddComment = async (text: string, parentId?: number) => {
    if (!text.trim() || !bech32Address) return;

    if (!isConnected) {
      toast.error("Please connect your wallet to comment");
      return Promise.reject("Wallet not connected");
    }

    const commentData = {
      text: text,
      projectId: project?.id,
      userId: bech32Address,
      parentId: parentId || null
    };

    try {
      const response = await axios.post('/api/comments', commentData);
      
      if (parentId) {
        // If it's a reply, refresh the comments to get the updated structure
        const commentsResponse = await axios.get(`/api/comments?projectId=${params.id}`);
        setComments(commentsResponse.data);
      } else {
        // If it's a new root comment, add it to the state
        setComments((prev) => [response.data, ...prev]);
      }
      
      toast.success(parentId ? "Reply added successfully!" : "Comment added successfully!");
      return Promise.resolve();
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment. Please try again.");
      return Promise.reject(error);
    }
  };

  const handleToggleLike = async (commentId: number) => {
    if (!bech32Address) {
      toast.error("Please connect your wallet to like comments");
      return;
    }

    try {
      // Toggle the like
      const response = await axios.post('/api/likes', {
        commentId,
        userId: bech32Address
      });
      
      console.log(`Toggle like response for comment ${commentId}:`, response.data);
      
      // Update the comments state locally to avoid an additional API call
      setComments(prevComments => {
        const updatedComments = prevComments.map(comment => {
          if (comment.id === commentId) {
            // Get existing likes array excluding current user if exists
            const existingLikes = comment.likes || [];
            
            // Update the likes array based on the response
            let updatedLikes;
            if (response.data.liked) {
              // Add current user to likes if they're not already there
              if (!existingLikes.some(like => like.userId === bech32Address)) {
                updatedLikes = [...existingLikes, { userId: bech32Address }];
              } else {
                updatedLikes = existingLikes;
              }
            } else {
              // Remove current user from likes if they're there
              updatedLikes = existingLikes.filter(like => like.userId !== bech32Address);
            }
            
            return {
              ...comment,
              likeCount: response.data.count,
              likes: updatedLikes
            };
          } else if (comment.replies) {
            // Check if the like is for a reply
            const updatedReplies = comment.replies.map(reply => {
              if (reply.id === commentId) {
                // Get existing likes array excluding current user if exists
                const existingLikes = reply.likes || [];
                
                // Update the likes array based on the response
                let updatedLikes;
                if (response.data.liked) {
                  // Add current user to likes if they're not already there
                  if (!existingLikes.some(like => like.userId === bech32Address)) {
                    updatedLikes = [...existingLikes, { userId: bech32Address }];
                  } else {
                    updatedLikes = existingLikes;
                  }
                } else {
                  // Remove current user from likes if they're there
                  updatedLikes = existingLikes.filter(like => like.userId !== bech32Address);
                }
                
                return {
                  ...reply,
                  likeCount: response.data.count,
                  likes: updatedLikes
                };
              }
              return reply;
            });
            
            return {
              ...comment,
              replies: updatedReplies
            };
          }
          return comment;
        });
        
        console.log('Updated comments after toggle like:', updatedComments);
        return updatedComments;
      });
      
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error("Failed to process like. Please try again.");
    }
  };

  // Add a function to load like counts for comments
  const loadLikeCounts = async (commentsToUpdate: Comment[]): Promise<Comment[]> => {
    if (!commentsToUpdate || commentsToUpdate.length === 0) return [];
    
    try {
      // For each comment, get the like status and count
      const updatedComments = await Promise.all(commentsToUpdate.map(async (comment) => {
        // Get like status for the current comment
        const likeResponse = await axios.get(`/api/likes?commentId=${comment.id}&userId=${bech32Address || 'anonymous'}`);
        
        console.log(`Comment ${comment.id} like status:`, likeResponse.data);
        
        // Process any replies recursively
        let updatedReplies: Comment[] = [];
        if (comment.replies && comment.replies.length > 0) {
          updatedReplies = await loadLikeCounts(comment.replies);
        }
        
        // Use the users array from API response to build the likes array
        const likesArray = likeResponse.data.users || [];
        
        return {
          ...comment,
          likeCount: likeResponse.data.count,
          likes: likesArray,
          replies: updatedReplies
        };
      }));
      
      console.log('Updated comments with likes:', updatedComments);
      return updatedComments;
    } catch (error) {
      console.error("Error loading like counts:", error);
      return commentsToUpdate;
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
          onToggleLike={handleToggleLike}
          currentUserId={bech32Address || ""}
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
