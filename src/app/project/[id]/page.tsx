"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaUserCircle, FaDollarSign, FaArrowRight, FaTwitter } from "react-icons/fa";
import { BiBookmark } from "react-icons/bi";
import { X, Plus, Send, Globe, Trash2 } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import { FaDiscord, FaGlobe, FaTelegram, FaXTwitter } from "react-icons/fa6";
import { Footer } from "@/components"
import { toast } from "react-hot-toast";
import { FaUserAstronaut } from "react-icons/fa";

import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components";

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

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  onSubmit: (amount: number) => void;
}

const PaymentModal = ({
  isOpen,
  onClose,
  project,
  onSubmit,
}: PaymentModalProps) => {
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
              <h2 className="text-2xl font-semibold text-black">
                You&apos;re believing in
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg mb-6">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20">
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
                  <div className="relative w-8 h-8">
                    <Image
                      src="/Xion.png"
                      alt="Xion"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-gray-700 text-xl">XION</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-3 text-center">
                All tips and sponsorships are directed entirely to the project,
                with no platform fees or deductions.
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
  const [isComingSoon, setIsComingSoon] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.post(`/api/product`, { id: params.id });
        console.log(response.data);
        setProject(response.data);
        fetchComments(); // Fetch comments when the project is fetched
      } catch (error) {
        console.error("Error fetching project:", error);
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

  if (!project) {
    return <div>Loading...</div>;
  }

  const handleBelieveClick = () => {
    setIsComingSoon(true);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const commentData = {
      text: newComment,
      projectId: project?.id,
    };

    try {
      const response = await axios.post('/api/comments', commentData);
      setComments((prev) => [response.data, ...prev]); // Add new comment to the state
      setNewComment(""); // Clear the input
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-screen relative  pl-5 md:pl-12 lg:pl-24 pt-6 mt-20">
        <div className="py-6 bg-white rounded-lg w-full h-full">
          {/* Project Header */}
          <div className="flex items-center space-x-3 mt-10 pr-5 md:pr-12 lg:pr-24">
            <div className="relative w-12 h-12">
              <Image
                src={project?.logo}
                alt="logo"
                fill
                className="object-contain"
              />
            </div>
            {/* <div> */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#303339] m-2 mb-3">
              {project?.name}
            </h1>
            {/* </div> */}
          </div>
          <p className="text-gray-600 text-[19px]">{project?.tagline}</p>

          {/* Contributors & Raised */}
          <div className="mt-3 text-[17px] text-[#6B7280]">
            <p>
              <span className="font-semibold text-[#6B7280]">1</span> Contributor ·{" "}
              <span className="font-semibold text-[#6B7280]">$0</span> Raised
            </p>
          </div>

          {/* Buttons Section */}
          <div className="mt-8 flex items-center space-x-2">
            <button
              onClick={handleBelieveClick}
              className="bg-green-500 text-white px-3 py-2 rounded-[10px] flex items-center gap-16"
            >
              <div className="flex items-center">
                <FaDollarSign className="mr-2" /> Believe{" "}
              </div>
              <FaArrowRight className="ml-2 mr-2" />
            </button>
            <button className="p-2 rounded-lg text-black flex items-center">
              <BiBookmark className="text-xl" />
            </button>
          </div>

          <p className="text-[#6B7280] mt-5 mb-7 text-[14px]">view project</p>

          {/* Project Images Container */}
          <div className="mt-6">
            <div className="flex flex-col lg:flex-row gap-4 w-full h-[200px] md:h-[450px] overflow-x-auto hide-scrollbar">
              {project?.projectPics?.map((pic, index) => (
                <div
                  key={index}
                  className="relative rounded-[18px] overflow-hidden aspect-video h-full shrink-0"
                // relative min-w-[883px] lg:min-w-[720px] xl:min-w-[883px] 2xl:min-w-[1000px] h-[450px] lg:h-[500px] xl:h-[550px] 2xl:h-[600px] bg-gray-100
                >
                  <Image
                    src={pic}
                    alt={`${project.name} pic ${index + 1}`}
                    className="object-cover hover:scale-105 transition-transform duration-300 aspect-video w-full h-full"
                    width={500}
                    height={300}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* About Section */}
          <div className="mt-6 max-w-screen-lg">
            <h2 className="text-xl font-semibold text-[#303339] mb-4 mt-11">About {project?.name}</h2>
            <p className="text-gray-700 mt-2">{project?.description}</p>
          </div>

          {/* Links Section */}
          {project.links && project.links.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg  text-black mt-10 mb-2 font-semibold">Socials</h3>
              <div className="flex gap-2 mt-2">
                {project.links.map((link, index) => (
                  link.telegram && (
                    <a key={index} href={`https://t.me/${link.telegram}`} target="_blank" rel="noopener noreferrer" className="bg-gray-100 border border-gray-200 rounded-lg p-2 aspect-square flex items-center justify-center">
                      <Send className="size-6 text-gray-500" />
                    </a>
                  )
                ))}
                {project.links.map((link, index) => (
                  link.discord && (
                    <a key={index} href={link.discord} target="_blank" rel="noopener noreferrer" className="bg-gray-100 border border-gray-200 rounded-lg p-2 aspect-square flex items-center justify-center">
                      <FaDiscord className="size-6 text-gray-500" />
                    </a>
                  )
                ))}
                {project.links.map((link, index) => (
                  link.website && (
                    <a key={index} href={link.website} target="_blank" rel="noopener noreferrer" className="bg-gray-100 border border-gray-200 rounded-lg p-2 aspect-square flex items-center justify-center">
                      <FaGlobe className="size-6 text-gray-500" />
                    </a>
                  )
                ))}
                {project.links.map((link, index) => (
                  link.x && (
                    link.x && (
                      <a key={index} href={`https://x.com/${link.x}`} target="_blank" rel="noopener noreferrer" className="bg-gray-100 border border-gray-200 rounded-lg p-2 aspect-square flex items-center justify-center">
                        <FaXTwitter className="size-6 text-gray-500" />
                      </a>
                    )
                  )))}
              </div>
            </div>
          )}

          <h3 className="text-lg  text-black mt-10 font-semibold mb-2">Tags</h3>
            <div className="flex gap-2">
              <span className=" border border-gray-400 px-3 py-1 rounded-full text-black text-sm">
                {project?.category}
              </span>
          </div>

           {/* Timestamp */}
          <div className="mt-6 text-gray-500 text-sm">
            {project?.createdAt ? (
              <>
                Created: {new Date(project.createdAt).toLocaleString("en-US", {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                }).replace(',', ' |')}
              </>
            ) : (
              <span className="text-red-500">Invalid date</span>
            )}
          </div> 
        </div>
        <hr className="mt-10 w-full max-w-screen-lg"></hr>
        {/* Comments Section */}
        <div className="mt-8 p-6 bg-white rounded-lg max-w-screen-lg">
          <h2 className="text-xl text-black font-semibold mb-4">Comments</h2>

          {/* Add Comment Form */}
          <div className="mb-6 flex flex-col sm:flex-row gap-3 w-full">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your views..."
              className="w-full p-3 bg-[#F8F8F8] text-black rounded-lg focus:outline-none resize-none"
              rows={1}
            />
            <button
              onClick={handleAddComment}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap"
            >
              Add comment
            </button>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.length === 0 ? (
              <p className="text-gray-500 text-center">
                No comments yet. Be the first to comment!
              </p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-3">
                  {/* User Avatar */}
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <FaUserAstronaut className="text-gray-500" size={32} />
                  </div>

                  {/* Comment Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 max-w-lg">
                      <span className="font-medium text-gray-900">{comment.author}</span>
                      <span className="text-sm text-gray-500">
                        {Math.floor((Date.now() - new Date(comment.timestamp).getTime()) / (1000 * 60))}m
                      </span>
                    </div>
                    <p className="text-gray-600">{comment.text.replace(/'/g, "&apos;")}</p>
                  </div>

                  {/* Reply Button */}
                  {/* <button className="px-3 py-1 text-sm bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
                    Reply
                  </button> */}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Coming Soon Dialog */}
        {isComingSoon && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 text-center max-w-sm shadow-xl">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                  Heads up
                </span>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-700 bg-clip-text text-transparent">
                COMING SOON
              </h2>
              <p className="mt-4 text-gray-600">
                We're working on something exciting. Stay tuned!
              </p>
              <button
                onClick={() => setIsComingSoon(false)}
                className="mt-6 bg-gradient-to-r from-green-500 to-emerald-400 text-white px-6 py-2 rounded-full font-medium transition-transform hover:scale-105"
              >
                Got it
              </button>
            </div>
          </div>
        )}

        {/* Add Payment Modal */}
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
      </div>
    </>
  );
};

export default ProductPage;
