"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

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
  timestamp: string;
};

interface Comment {
  id: number;
  text: string;
  author: string;
  timestamp: string;
}

const ProductPage = ({ params }: { params: { id: string } }) => {
  console.log(params);
  const [project, setProject] = useState<Project | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.post(`/api/product`, { id: params.id });
        console.log(response.data);
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching pro:", error);
      }
    };

    fetchProject();
  }, [params.id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="p-6 bg-white rounded-lg shadow-md">
        {/* Project Header */}
        <div className="flex items-center space-x-3">
          <img
            src={project?.logo}
            alt="logo"
            className="w-10 h-10 object-contain"
          />
          <div>
            <h1 className="text-2xl font-semibold text-black">
              {project?.name}
            </h1>
            <p className="text-gray-600">{project?.tagline}</p>
          </div>
        </div>

        {/* Contributors & Raised */}
        <div className="mt-3 text-gray-700">
          <p>
            <span className="font-semibold">1</span> Contributor ·{" "}
            <span className="font-semibold">$0</span> Raised
          </p>
        </div>

        {/* Buttons Section */}
        <div className="mt-3 flex items-center space-x-2">
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center">
            💲 Believe
          </button>
          <button className="p-2 border border-gray-300 rounded-lg">🔖</button>
        </div>

        {/* Project Images */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          {project?.projectPics?.map((pic, index) => (
            <img
              key={index}
              src={pic}
              alt={`Project pic ${index}`}
              className="rounded-lg shadow-md"
            />
          ))}
        </div>

        {/* About Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">About {project?.name}</h2>
          <p className="text-gray-700 mt-2">{project?.description}</p>
        </div>

        {/* Categories */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Categories</h3>
          <div className="flex space-x-2 mt-2">
            <span className="px-3 py-1 bg-gray-200 rounded-lg text-sm">
              {project?.category}
            </span>
          </div>
        </div>

        {/* Timestamp */}
        <div className="mt-6 text-gray-500 text-sm">
          Created: {new Date(project?.timestamp).toLocaleString()}
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        
        {/* Add Comment Form */}
        <div className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={3}
          />
          <button
            onClick={() => {
              if (!newComment.trim()) return;
              
              const newCommentObj = {
                id: Date.now(),
                text: newComment,
                author: "Anonymous User",
                timestamp: new Date().toISOString(),
              };
              
              setComments(prev => [newCommentObj, ...prev]);
              setNewComment("");
            }}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Post Comment
          </button>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-gray-500 text-center">No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-200 pb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="text-gray-800 font-medium">{comment.author}</div>
                  <div className="text-gray-500 text-sm">
                    {new Date(comment.timestamp).toLocaleString()}
                  </div>
                </div>
                <p className="text-gray-700">{comment.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
