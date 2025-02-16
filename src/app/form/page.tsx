//@ts-nocheck
"use client";
import React, { useState, FormEvent } from "react";
import { X, Plus, Send, Globe } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import {
  ProgressDotProps,
  TeamMember,
  FormLinks,
  // FormData,
  FormChangeEvent,
  FileChangeEvent,
  FormSubmitEvent,
} from "../../types/formTypes";
import FileUpload from "@/components/ui/fileUpload";
import { MaxWidthWrapper } from "@/components";
import { platform } from "os";
// import X from "../../../public/icons/x.svg";

const ProgressDot: React.FC<ProgressDotProps> = ({
  active,
  completed,
}: ProgressDotProps) => (
  <div className="">
    <div
      className={`h-1 rounded-full transition-all duration-300 ${
        completed
          ? "bg-emerald-200 w-4"
          : active
          ? "bg-emerald-500 w-16"
          : "bg-gray-200 flex-1 w-4"
      }`}
    />
  </div>
);

const ModernProjectForm = () => {
  let counter = 0;
  const [links, setLinks] = useState([
    { platform: "x", value: "", prompt: "@" },
  ]);

  const PLATFORMS = [
    { id: "discord", icon: SiDiscord, label: "Discord" },
    { id: "twitter", icon: FaXTwitter, label: "Twitter" },
    { id: "website", icon: Globe, label: "Website" },
  ];

  const addLink = (link) => {
    return setLinks([...links, link]);
  };

  const handleAddField = () => {
    if (links.length >= PLATFORMS.length) {
      return;
    }

    const existingPlatforms = links.map((link) => link.platform);
    const nextPlatform = PLATFORMS.find(
      (platform) => !existingPlatforms.includes(platform.id)
    );

    if (nextPlatform) {
      setLinks([...links, { platform: nextPlatform.id, value: "" }]);
    }
  };

  const [step, setStep] = useState(1);
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
  });

  const totalSteps = 7;

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
    if (
      e === null ||
      !e.target ||
      !e.target.files ||
      e.target.files.length === 0
    ) {
      setForm((prev) => ({
        ...prev,
        [field]: null,
      }));
      return;
    }

    // const files = e.target.files;
    const files = Array.from(e.target.files);
    if (files && files[0]) {
      const res = await fetch("/api/upload", { method: "POST" });
      const { signature, timestamp, api_key } = await res.json();

      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", api_key);
        formData.append("timestamp", timestamp.toString());
        formData.append("signature", signature);

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
          { method: "POST", body: formData }
        );

        return uploadRes.json();
      });

      const uploadResults = await Promise.all(uploadPromises);
      const data: string[] =
        uploadResults.length > 1
          ? uploadResults.map((result) => result.secure_url)
          : uploadResults[0].secure_url;

      setForm((prev) => ({
        ...prev,
        [field]: data,
      }));
    }
  };

  const addTeamMember = () => {
    setForm((prev) => ({
      ...prev,
      team: [...prev.team, { name: "", position: "", avatar: null }],
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <p className="font-semibold text-black px-2 font-poppins mb-2 text-sm sm:text-base">
                Project name
              </p>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-black text-sm sm:text-base"
              />
            </div>

            <div>
              <p className="font-semibold text-black px-2 font-poppins mb-2 text-sm sm:text-base">
                Short tagline
              </p>
              <input
                type="text"
                name="tagline"
                value={form.tagline}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-black text-sm sm:text-base"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <p className="text-black font-semibold font-poppins text-sm sm:text-base">Categories</p>
            <div className="relative">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-black text-sm sm:text-base appearance-none bg-white"
              >
                <option value="" className="py-2">Select your category here</option>
                <option value="defi" className="py-2">DeFi</option>
                <option value="nft" className="py-2">NFT</option>
                <option value="gaming" className="py-2">Gaming</option>
                <option value="other" className="py-2">Other</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 h-[300px]">
            <FileUpload
              key="logoInput"
              titleText="Upload logo"
              multiple={false}
              formField="logo"
              handleFileChange={handleFileChange}
              formData={form}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 h-[300px]">
            <FileUpload
              key="pictureInput"
              titleText="Upload Pictures"
              multiple
              formField="projectPics"
              handleFileChange={handleFileChange}
              formData={form}
            />
          </div>
        );

      case 5:
        return (
          <div className="space-y-4 max-h-[350px] sm:max-h-[400px] overflow-y-auto px-1">
            <p className="text-black font-semibold text-sm sm:text-base sticky top-0 bg-white py-2 z-10">Add team</p>
            <div className="space-y-3">
              {form.team.map((member, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-3 sm:items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium text-lg shrink-0">
                      {member.avatar ? (
                        <img
                          src={URL.createObjectURL(member.avatar)}
                          alt="Avatar"
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span>
                          {member.name ? member.name.charAt(0).toUpperCase() : "U"}
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Name"
                      value={member.name}
                      onChange={(e) => {
                        const newTeam = [...form.team];
                        newTeam[index].name = e.target.value;
                        setForm((prev) => ({ ...prev, team: newTeam }));
                      }}
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-black text-sm"
                    />
                  </div>
                  <select
                    value={member.position}
                    onChange={(e) => {
                      const newTeam = [...form.team];
                      newTeam[index].position = e.target.value;
                      setForm((prev) => ({ ...prev, team: newTeam }));
                    }}
                    className="px-3 py-2 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-black text-sm w-full sm:w-auto"
                  >
                    <option value="">Select Position</option>
                    <option value="founder">Founder</option>
                    <option value="developer">Developer</option>
                    <option value="designer">Designer</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addTeamMember}
              className="text-emerald-500 flex items-center gap-2 hover:text-emerald-600 transition-colors text-sm"
            >
              <Plus size={16} />
              Add another member
            </button>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <p className="text-black font-semibold">Contact Email</p>
            <input
              type="email"
              name="contactEmail"
              placeholder="yourcontact@email.com"
              value={form.contactEmail}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-black"
            />
            <div className="space-y-3">
              <p className="font-semibold text-black">Other Links</p>
              {links.map((link, index) => (
                <div key={index} className="relative flex items-center gap-2">
                  {link.platform === "x" && (
                    <FaXTwitter
                      className="absolute left-3 text-gray-500"
                      size={20}
                    />
                  )}
                  {link.platform === "telegram" && (
                    <Send className="absolute left-3 text-gray-500" size={20} />
                  )}
                  {link.platform === "discord" && (
                    <SiDiscord
                      className="absolute left-3 text-gray-500"
                      size={20}
                    />
                  )}
                  {link.platform === "website" && (
                    <Globe
                      className="absolute left-3 text-gray-500"
                      size={20}
                    />
                  )}
                  <div className="w-full flex gap-2 items-center pl-10 pr-4 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-black">
                    {link?.prompt}
                  <input 
                    type="text" 
                    className="py-1 w-full outline-none"
                    name={`links.${link.platform}`}
                    value={form.links[link.platform]}
                    onInput={handleChange}
                  />
                  </div>
                </div>
              ))}

              {/* Icons and Plus Button */}
              <div className="flex gap-2 items-center">
                {/* Additional Social Icons */}
                {!links.find((link) => link.platform === "telegram") && (
                  <div
                    className=""
                    onClick={() =>
                      addLink({ platform: "telegram", value: "", prompt: "@" })
                    }
                  >
                    <Send
                      className="text-gray-400 hover:text-black cursor-pointer"
                      size={24}
                    />
                  </div>
                )}

                {!links.find((link) => link.platform === "discord") && (
                  <div
                    className=""
                    onClick={() =>
                      addLink({ platform: "discord", value: "", prompt: "@" })
                    }
                  >
                    <SiDiscord
                      className="text-gray-400 hover:text-black cursor-pointer"
                      size={24}
                    />
                  </div>
                )}

                {!links.find((link) => link.platform === "website") && (
                  <div
                    className=""
                    onClick={() =>
                      addLink({
                        platform: "website",
                        value: "",
                        prompt: "https://",
                      })
                    }
                  >
                    <Globe
                      className="text-gray-400 hover:text-black cursor-pointer"
                      size={24}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4 h-[300px]">
            <textarea
              name="description"
              placeholder="Add description here..."
              value={form.description}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none resize-none text-black"
            />
          </div>
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (step) {
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
    if (step === 1) {
      return "Let's begin crafting your project! Share some details with us - we'll need a name and a tagline that perfectly represents your vision.";
    }
    return "Select your categories wisely - they help filter and boost your project's discoverability.";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let projectPics = form.projectPics;
    if (typeof(form.projectPics) === "string") {
      projectPics = [form.projectPics];
    }

    const formData = {
      ...form,
      ownerId: localStorage.getItem("xion-authz-granter-account") || null,
    };

    const res = await fetch("/api/upload/project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData), // Assuming 'form' contains project data
    });

    const data = await res.json();

    // if (data.success) {
    //   alert("Project uploaded successfully!");
    // } else {
    //   alert("Error: " + data.error);
    // }
  };

  return (
    <MaxWidthWrapper>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-20">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-white rounded-xl shadow-lg relative mx-4 sm:mx-auto"
        >
          <button
            type="button"
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="p-4 sm:p-7">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-black mb-2">
                {getStepTitle()}
              </h2>
              <p className="text-sm text-gray-400">{getStepSubtitle()}</p>
              <div className="flex w-full gap-1 mt-4 sm:mt-6">
                {[1, 2, 3, 4, 5, 6, 7].map((dotStep) => (
                  <ProgressDot
                    key={dotStep}
                    active={step === dotStep}
                    completed={step > dotStep}
                  />
                ))}
              </div>
            </div>

            <div className="transition-all duration-300 ease-in-out min-h-[300px] sm:min-h-[350px] overflow-y-auto">
              {renderStep()}
            </div>

            <div className="flex w-full gap-3 mt-6 sm:mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors font-medium text-center text-sm sm:text-base"
                >
                  Back
                </button>
              )}
              <button
                type="button"
                className="flex-1 z-10 font-medium"
              >
                <div
                  className="px-4 sm:px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white text-sm sm:text-base"
                  onClick={(e) => step < totalSteps ? setStep(step + 1) : handleSubmit(e)}
                >
                  {step === totalSteps ? "Complete" : "Next"}
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </MaxWidthWrapper>
  );
};

export default ModernProjectForm;
