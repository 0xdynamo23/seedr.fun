"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { BiBookmark } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import Image from 'next/image';

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

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  onSubmit: (amount: number) => void;
}

const PaymentModal = ({ isOpen, onClose, project, onSubmit }: PaymentModalProps) => {
  const [amount, setAmount] = useState<number>(100);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(amount);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-[480px] text-black">
        {!isSubmitted ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-black">You&apos;re believing in</h2>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg mb-6">
              <div className="relative w-12 h-12">
                <Image
                  src={project.logo}
                  alt={project.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-medium text-lg">{project.name}</span>
            </div>

            <div className="mb-6">
              <div className="flex items-center border rounded-lg p-4">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full outline-none text-3xl font-bold text-black"
                  min="1"
                />
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700 text-xl">XION</span>
                  <div className="relative w-8 h-8">
                    <Image
                      src="/xion-logo.png"
                      alt="Xion"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-3 text-center">
                All tips and sponsorships are directed entirely to the project, with no platform fees or deductions.
              </p>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-green-500 text-white py-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-3 text-lg"
            >
              <span>Believe with {amount} Xion</span>
              <FaArrowRight className="text-xl" />
            </button>
          </>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-3xl font-bold text-green-500 mb-3">
              Thank you for believing!
            </h3>
            <p className="text-gray-700 text-lg">
              Your support means a lot to {project.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const ProductPage = ({ params }: { params: { id: string } }) => {
  console.log(params);
  const [project, setProject] = useState<Project | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

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
    <div className="w-screen">
      <div className="p-6 bg-white rounded-lg shadow-md w-full h-full">
        {/* Project Header */}
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10">
            <Image
              src={project?.logo}
              alt="logo"
              fill
              className="object-contain"
            />
          </div>
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
          <button 
            onClick={() => setIsPaymentModalOpen(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <FaDollarSign className="mr-2" /> Believe <FaArrowRight className="ml-2 mr-2" />
          </button>
          <button className="p-2 rounded-lg text-black flex items-center">
            <BiBookmark className="text-xl" />
          </button>
        </div>

        {/* Project Images */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          {project?.projectPics?.map((pic, index) => (
            <div key={index} className="relative w-full h-full">
              <Image
                src={pic}
                alt={`Project pic ${index}`}
                fill
                className="rounded-lg shadow-md object-cover"
              />
            </div>
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

        Timestamp
        {/* <div className="mt-6 text-gray-500 text-sm">
          Created: {new Date(project?.timestamp).toLocaleString()}
        </div> */}
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

              setComments((prev) => [newCommentObj, ...prev]);
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
            <p className="text-gray-500 text-center">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-200 pb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="text-gray-800 font-medium">
                    {comment.author}
                  </div>
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

      {/* Add Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        project={project}
        onSubmit={(amount) => {
          console.log(`Processing payment of ${amount} XION for ${project.name}`);
          // Here you would typically handle the payment processing
        }}
      />
    </div>
  );
};

export default ProductPage;
