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
  <div className="w-full">
    <div
      className={`h-1 rounded-full transition-all duration-300 ${
        completed
          ? "bg-emerald-500"
          : active
          ? "bg-emerald-500 w-20"
          : "bg-gray-200 flex-1"
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
          <div className=" h-[300px]">
            <div className="mb-3">
              <p className="font-semibold text-black px-2 font-poppins mb-2">
                Project name
              </p>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-black"
              />
            </div>

            <div className="mt-6">
              <p className="font-semibold text-black px-2 font-poppins mb-2">
                Short tagline
              </p>
              <input
                type="text"
                name="tagline"
                value={form.tagline}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-black"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4 h-[270px] ">
            <p className="text-black font-semibold font-poppins">Categories</p>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-black"
            >
              <option value="">Select your category here</option>
              <option value="defi">DeFi</option>
              <option value="nft">NFT</option>
              <option value="gaming">Gaming</option>
              <option value="other">Other</option>
            </select>
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
          <div className="space-y-4 h-[300px] overflow-y-auto">
            <p className="text-black font-semibold">Add team</p>
            {form.team.map((member, index) => (
              <div key={index} className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium text-lg">
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
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-black"
                />
                <select
                  value={member.position}
                  onChange={(e) => {
                    const newTeam = [...form.team];
                    newTeam[index].position = e.target.value;
                    setForm((prev) => ({ ...prev, team: newTeam }));
                  }}
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-black"
                >
                  <option value="">Position</option>
                  <option value="founder">Founder</option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                  <option value="designer">Other</option>
                </select>
              </div>
            ))}
            <button
              type="button"
              onClick={addTeamMember}
              className="text-emerald-500 flex items-center gap-2 hover:text-emerald-600 transition-colors"
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-white rounded-xl shadow-lg relative"
        >
          <button
            type="button"
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="p-7">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-black mb-2">
                {getStepTitle()}
              </h2>
              <p className="text-sm text-gray-400">{getStepSubtitle()}</p>
              <div className="flex w-30 gap-1 mt-6">
                {[1, 2, 3, 4, 5, 6, 7].map((dotStep) => (
                  <ProgressDot
                    key={dotStep}
                    active={step === dotStep}
                    completed={step > dotStep}
                  />
                ))}
              </div>
            </div>

            <div className="transition-all duration-300 ease-in-out">
              {renderStep()}
            </div>

            <div className="flex w-full gap-3 mt-8">
              {step > 1 && (
                <div
                  onClick={() => setStep(step - 1)}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors font-medium text-center"
                >
                  Back
                </div>
              )}
              <button
                type="button"
                // onClick={() =>
                //   step < totalSteps ? setStep(step + 1) : handleSubmit
                // }
                className="flex-1 z-10 font-medium"
              >
                <div
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg"
                  onClick={(e) =>
                    step < totalSteps ? setStep(step + 1) : handleSubmit(e)
                    // console.log("Clock")
                  }
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
