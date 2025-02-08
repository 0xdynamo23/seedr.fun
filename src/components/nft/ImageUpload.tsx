"use client";
import React, { useState, useRef } from "react";
import axios from "axios";

import dotenv from "dotenv";
dotenv.config();

interface ImageUploadProps {
  onUploadSuccess: (url: string) => void; // Made required
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onUploadSuccess,
  className = "",
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Create a local preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = async () => {
    if (!fileInputRef.current?.files?.length) return;

    const file = fileInputRef.current.files[0];
    const pinataApiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY || "";
    const pinataSecretApiKey = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY || "";

    if (!pinataApiKey || !pinataSecretApiKey) {
      setError(
        "Pinata API credentials are missing. Check your environment variables."
      );
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
          },
        }
      );

      const ipfsHash = response.data.IpfsHash;
      const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;

      // Call the onUploadSuccess callback with the IPFS URL
      onUploadSuccess(ipfsUrl);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Upload failed";
      console.error("Upload failed:", error);
      setError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const clearImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`relative w-3/4 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={isUploading}
      />

      {!previewUrl ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="relative w-full cursor-pointer"
        >
          <img src="/add.png" alt="Upload" className="w-full h-3/4" />
          <img
            src="/plus.png"
            alt="Plus Icon"
            className="absolute inset-0 w-1/4 h-1/8 m-auto"
          />
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full rounded-lg object-cover"
          />
          <div className="flex gap-4 justify-between">
            <button
              onClick={handleImageUpload}
              className="w-[85%] bg-[#212121] border border-[#EDF1F31A] border-opacity-10 text-white font-bold py-0 px-4 rounded h-12 mt-2 text-sm"
             
              disabled={isUploading}
            >
              Upload
            </button>
            <button
              onClick={clearImage}
              className="w-[10%] text-center flex items-center justify-center bg-[#212121] border border-[#EDF1F31A] border-opacity-10 text-white font-bold py-0 px-4 rounded h-12 mt-2 text-sm"
              >
              X
            </button>
          </div>
        </div>
      )}

      {isUploading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      )}

      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </div>
  );
};

export default ImageUpload;
