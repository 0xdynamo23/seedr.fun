"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Upload, Trash2 } from 'lucide-react';
import { FileUploadProps } from '@/types/uploadTypes';

const FileUpload: React.FC<FileUploadProps> = ({ 
  handleFileChange, 
  titleText, 
  multiple = false, 
  formField, 
  formData 
}) => {
    const [showPreview, setShowPreview] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (formData[formField]) {
            setShowPreview(true);
            setPreviewUrls(
                Array.isArray(formData[formField])
                    ? formData[formField] as string[]
                    : [formData[formField] as string]
            );
        } else {
            setShowPreview(false);
            setPreviewUrls([]);
        }
    }, [formData, formField]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        setUploading(true);
        try {
            const files = Array.from(e.target.files);
            const localPreviewUrls = files.map(file => URL.createObjectURL(file));
            setPreviewUrls(localPreviewUrls);
            setShowPreview(true);

            const uploadedUrls = [];
            for (const file of files) {
                const res = await fetch('/api/upload', { method: 'POST' });
                const { signature, timestamp, api_key } = await res.json();

                const formData = new FormData();
                formData.append('file', file);
                formData.append('signature', signature);
                formData.append('timestamp', timestamp.toString());
                formData.append('api_key', api_key);

                const uploadResponse = await fetch(
                    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
                    {
                        method: 'POST',
                        body: formData,
                    }
                );

                const data = await uploadResponse.json();
                uploadedUrls.push(data.secure_url);
            }

            // Clean up local preview URLs
            localPreviewUrls.forEach(url => URL.revokeObjectURL(url));
            
            handleFileChange({ ...e, imageUrls: uploadedUrls }, formField);
            setPreviewUrls(uploadedUrls);
        } catch (error) {
            console.error('Error uploading:', error);
            setShowPreview(false);
            setPreviewUrls([]);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <p className="text-sm font-medium text-black mb-2">{titleText}</p>
            <input
                type="file"
                onChange={handleUpload}
                className="hidden"
                ref={inputRef}
                id="logo-upload"
                multiple={multiple}
                accept="image/*"
            />
            {!showPreview && (
                <div
                    className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center cursor-pointer hover:bg-zinc-100 duration-300"
                    onClick={() => !uploading && inputRef.current?.click()}
                >
                    {uploading ? (
                        <p className="text-gray-500">Uploading...</p>
                    ) : (
                        <>
                            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                            <p className="text-black">
                                Drop your {multiple ? 'files' : 'file'} here or <span className="text-emerald-500">browse</span>
                            </p>
                            <p className="text-sm text-gray-400 mt-1">Maximum size 20MB {multiple && '(Up to 2 images)'}</p>
                        </>
                    )}
                </div>
            )}

            {showPreview && previewUrls.length > 0 && (
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center relative">
                    <div className={`grid ${multiple ? 'grid-cols-2' : 'grid-cols-1'} gap-4 mb-2`}>
                        {previewUrls.map((url, index) => (
                            <div key={index} className="relative h-48">
                                <Image
                                    src={url}
                                    alt={`${formField} preview ${index + 1}`}
                                    fill
                                    className="object-contain rounded-lg"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <button
                            className="text-gray-500 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleFileChange(null, formField);
                                setShowPreview(false);
                                setPreviewUrls([]);
                            }}
                            type="button"
                            disabled={uploading}
                            title="Delete images"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                        <button
                            className="text-sm text-blue-500 hover:text-blue-600"
                            onClick={() => !uploading && inputRef.current?.click()}
                            disabled={uploading}
                        >
                            {uploading ? 'Uploading...' : `Change image${multiple ? 's' : ''}`}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
