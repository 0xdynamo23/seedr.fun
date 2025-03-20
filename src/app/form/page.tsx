//@ts-nocheck
"use client";
import React, { useState, FormEvent, useEffect } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAbstraxionAccount } from "@burnt-labs/abstraxion";

// Types
import {
  TeamMember,
  FormLinks,
  FormChangeEvent,
  FileChangeEvent,
} from "../../types/formTypes";

// Components
import { MaxWidthWrapper } from "@/components";
import FormHeader from "./components/FormHeader";
import FormNavigation from "./components/FormNavigation";
import SuccessMessage from "./components/SuccessMessage";

// Step Components
import Step1BasicInfo from "./components/steps/Step1BasicInfo";
import Step2Category from "./components/steps/Step2Category";
import Step3Logo from "./components/steps/Step3Logo";
import Step4Pictures from "./components/steps/Step4Pictures";
import Step5Team from "./components/steps/Step5Team";
import Step6Links from "./components/steps/Step6Links";
import Step7Description from "./components/steps/Step7Description";
import ProfileCreationStep from "./components/steps/ProfileCreationStep";

const ModernProjectForm = () => {
  const { data: { bech32Address } } = useAbstraxionAccount();
  const [isWalletConnected, setIsWalletConnected] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [isCheckingUser, setIsCheckingUser] = useState(true);
  const router = useRouter();
  
  const [links, setLinks] = useState([
    { platform: "website", value: "", prompt: "https://" },
  ]);

  const addLink = (link) => {
    return setLinks([...links, link]);
  };

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    tagline: "",
    category: "",
    logo: null,
    projectPics: null,
    team: [{ name: "", position: "", avatar: null }],
    contactEmail: "",
    links: {
      x: "",
      telegram: "",
      discord: "",
      website: "",
    },
    description: "",
    username: "",
    email: "",
  });

  const totalSteps = 8;

  useEffect(() => {
    const checkUserExists = async () => {
      if (!bech32Address) return;

      try {
        const response = await fetch(`/api/user?id=${bech32Address}`);
        const data = await response.json();
        
        setUserExists(data.exists);
        setIsCheckingUser(false);

        if (data.exists) {
          setStep(1);
        }
      } catch (error) {
        console.error("Error checking user:", error);
        setIsCheckingUser(false);
      }
    };

    checkUserExists();
  }, [bech32Address]);

  const handleChange = (e: FormChangeEvent) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".") as [string, string];

      if (parent === "links") {
        setForm((prev) => ({
          ...prev,
          links: {
            ...prev.links,
            [child]: value,
          },
        }));
      }
    } else {
      setForm((prev) => ({
        ...prev,
        [name as keyof FormData]: value,
      }));
    }
  };

  const handleFileChange = async (
    e: FileChangeEvent | null,
    field: keyof FormData
  ) => {
    if (e === null) {
      setForm((prev) => ({
        ...prev,
        [field]: null,
      }));
      return;
    }

    if (e.imageUrls) {
      setForm((prev) => ({
        ...prev,
        [field]: e.imageUrls.length > 1 ? e.imageUrls : e.imageUrls[0],
      }));
      return;
    }

    if (!e.target || !e.target.files || e.target.files.length === 0) {
      return;
    }
  };

  const handleNext = (e: FormEvent | null = null) => {
    if (e) e.preventDefault();
    if (!validateStep()) {
      toast.error("Please fill all required fields.");
    } else if (step < totalSteps - 1) {
      if (step === 0) {
        createUser();
      } else {
        setStep(step + 1);
      }
    } else {
      handleSubmit();
    }
  }

  const createUser = async () => {
    if (!bech32Address) {
      toast.error("Wallet not connected");
      return;
    }

    try {
      const userData = {
        id: bech32Address,
        name: form.username,
        email: form.email
      };

      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.success) {
        setUserExists(true);
        setStep(1);
      } else {
        toast.error("Error creating profile: " + data.error);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const validateStep = () => {
    switch (step) {
      case 0:
        return form.username && form.email;
      case 1:
        return form.name && form.tagline;
      case 2:
        return form.category;
      case 3:
        return form.logo;
      case 4:
        return form.projectPics;
      case 5:
        return form.team.every(member => member.name && member.position);
      case 6:
        return form.contactEmail && Object.values(form.links).some(link => link);
      case 7:
        return form.description;
      default:
        return false;
    }
  }

  const addTeamMember = () => {
    setForm((prev) => ({
      ...prev,
      team: [...prev.team, { name: "", position: "", avatar: null }],
    }));
  };

  const updateTeam = (team: TeamMember[]) => {
    setForm((prev) => ({
      ...prev,
      team,
    }));
  };

  const getStepTitle = () => {
    switch (step) {
      case 0:
        return "Create your profile";
      case 1:
        return "Hey 👋";
      case 2:
        return "Choose a category";
      case 3:
        return "Add logo";
      case 4:
        return "Add how your project looks";
      case 5:
        return "Add your team members";
      case 6:
        return "Add links";
      case 7:
        return "Last thing, tell us about the project";
      default:
        return "";
    }
  };

  const getStepSubtitle = () => {
    switch (step) {
      case 0:
        return "Before you create a project, let's set up your profile with a username and email.";
      case 1:
        return "Let's begin crafting your project! Share some details with us - we'll need a name and a tagline that perfectly represents your vision.";
      case 2:
        return "Select your categories wisely - they help filter and boost your project's discoverability.";
      case 3:
        return "Upload a logo that represents your project's identity.";
      case 4:
        return "Show off your project with high-quality images.";
      case 5:
        return "Introduce the amazing people behind your project.";
      case 6:
        return "Add contact information and social links to help people connect with you.";
      case 7:
        return "Tell us more about your project in detail.";
      default:
        return "";
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <ProfileCreationStep 
            username={form.username}
            email={form.email}
            onChange={handleChange}
          />
        );
      case 1:
        return (
          <Step1BasicInfo 
            name={form.name} 
            tagline={form.tagline} 
            onChange={handleChange} 
          />
        );
      case 2:
        return (
          <Step2Category 
            category={form.category} 
            onChange={handleChange} 
          />
        );
      case 3:
        return (
          <Step3Logo 
            logo={form.logo} 
            handleFileChange={handleFileChange} 
            formData={form} 
            onUploadStatusChange={(status) => setIsUploading(status)} 
          />
        );
      case 4:
        return (
          <Step4Pictures 
            projectPics={form.projectPics} 
            handleFileChange={handleFileChange} 
            formData={form} 
            onUploadStatusChange={(status) => setIsUploading(status)} 
          />
        );
      case 5:
        return (
          <Step5Team 
            team={form.team} 
            updateTeam={updateTeam} 
            addTeamMember={addTeamMember} 
            isWalletConnected={isWalletConnected} 
          />
        );
      case 6:
        return (
          <Step6Links 
            contactEmail={form.contactEmail} 
            links={form.links} 
            onChange={handleChange} 
            currentLinks={links} 
            addLink={addLink} 
          />
        );
      case 7:
        return (
          <Step7Description 
            description={form.description} 
            onChange={handleChange} 
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (e: FormEvent | null = null) => {
    if (e) e.preventDefault();

    toast.loading("Submitting project...");

    let projectPicsArray = [];
    if (form.projectPics) {
      projectPicsArray = Array.isArray(form.projectPics) 
        ? form.projectPics 
        : [form.projectPics];
    }

    const formData = {
      ...form,
      projectPics: projectPicsArray,
      ownerId: bech32Address || localStorage.getItem("xion-authz-granter-account") || null,
    };

    try {
      const res = await fetch("/api/upload/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();

      if (data.success) {
        toast.dismiss();
        toast.success("Project submitted successfully!");
        setShowSuccess(true);
      } else {
        toast.dismiss();
        toast.error("Error: " + data.error);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Error in submitting, please try again.");
      console.error("Submission error:", error);
    }
  };

  useEffect(() => {
    setIsWalletConnected(true);
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      {showSuccess ? (
        <div className="w-full max-w-md">
          <SuccessMessage 
            message="Your project has been submitted successfully and is awaiting approval." 
          />
        </div>
      ) : (
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg relative"
          >
            <button
              type="button"
              className="absolute right-4 top-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-20"
              onClick={() => router.push("/")}
            >
              <X size={20} className="w-5 h-5 text-black" />
            </button>

            <div className="p-4 sm:p-7 relative">
              <FormHeader 
                step={step} 
                totalSteps={totalSteps} 
                title={getStepTitle()} 
                subtitle={getStepSubtitle()} 
              />

              <div className="transition-all duration-300 ease-in-out min-h-[300px] sm:min-h-[350px] overflow-y-auto">
                {renderStep()}
              </div>

              <FormNavigation 
                step={step} 
                totalSteps={totalSteps} 
                onBack={() => setStep(step - 1)} 
                onNext={handleNext} 
                isUploading={isUploading} 
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ModernProjectForm;