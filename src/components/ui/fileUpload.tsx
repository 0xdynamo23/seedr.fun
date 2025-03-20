"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Upload, Trash2, X, Plus } from 'lucide-react';
import { FileUploadProps } from '@/types/uploadTypes';
import { toast } from 'react-hot-toast';

const FileUpload: React.FC<FileUploadProps> = ({ 
  handleFileChange, 
  titleText, 
  multiple = false, 
  formField, 
  formData,
  onUploadStatusChange,
  maxFiles = 5
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

    // Notify parent component when uploading state changes
    useEffect(() => {
        if (onUploadStatusChange) {
            onUploadStatusChange(uploading);
        }
    }, [uploading, onUploadStatusChange]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        // Validate max files if multiple is enabled
        if (multiple && e.target.files.length > maxFiles) {
            toast.error(`You can upload up to ${maxFiles} files at once.`);
            return;
        }

        // Check if adding these new files would exceed the max
        if (multiple && previewUrls.length + e.target.files.length > maxFiles) {
            toast.error(`You can have a maximum of ${maxFiles} files. You currently have ${previewUrls.length}.`);
            return;
        }

        setUploading(true);
        
        // Store local preview URLs for cleanup
        const localPreviewUrls: string[] = [];
        
        try {
            const files = Array.from(e.target.files);
            
            // Create local previews for immediate visual feedback
            const newLocalPreviews = files.map(file => URL.createObjectURL(file));
            localPreviewUrls.push(...newLocalPreviews);
            
            // For multiple, append to existing previews rather than replacing
            if (multiple && previewUrls.length > 0) {
                setPreviewUrls([...previewUrls, ...newLocalPreviews]);
            } else {
                setPreviewUrls(newLocalPreviews);
            }
            
            setShowPreview(true);

            const uploadedUrls: string[] = [];
            
            // Upload each file
            for (const file of files) {
                try {
                    const res = await fetch('/api/upload', { method: 'POST' });
                    
                    if (!res.ok) {
                        throw new Error('Failed to get upload credentials');
                    }
                    
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

                    if (!uploadResponse.ok) {
                        throw new Error('Failed to upload to Cloudinary');
                    }

                    const data = await uploadResponse.json();
                    uploadedUrls.push(data.secure_url);
                } catch (error) {
                    console.error('Error uploading file:', error);
                    toast.error('Failed to upload one of the images.');
                }
            }
            
            if (uploadedUrls.length === 0) {
                throw new Error('No files were uploaded successfully');
            }

            // Create a custom event with the uploaded URLs
            const customEvent = {
                ...e,
                imageUrls: multiple ? 
                    // For multiple, merge with existing urls if any
                    [...(Array.isArray(formData[formField]) ? formData[formField] as string[] : []), ...uploadedUrls] :
                    uploadedUrls,
                target: {
                    ...e.target,
                    files: null
                }
            } as React.ChangeEvent<HTMLInputElement> & { imageUrls: string[] };
            
            // Notify parent component of successful uploads
            handleFileChange(customEvent, formField);
            
            // Update local preview with actual uploaded URLs
            if (multiple && Array.isArray(formData[formField])) {
                setPreviewUrls([...(formData[formField] as string[]), ...uploadedUrls]);
            } else {
                setPreviewUrls(uploadedUrls);
            }
            
            // Display success message
            toast.success(`${uploadedUrls.length} ${uploadedUrls.length === 1 ? 'image' : 'images'} uploaded successfully!`);
            
        } catch (error) {
            console.error('Error uploading:', error);
            toast.error('Failed to upload images. Please try again.');
            
            // Reset preview state on complete failure
            if (previewUrls.length === localPreviewUrls.length) {
                setShowPreview(false);
                setPreviewUrls([]);
            }
        } finally {
            // Always clean up local preview URLs to avoid memory leaks
            localPreviewUrls.forEach(url => URL.revokeObjectURL(url));
            
            // Always ensure uploading state is reset
            setUploading(false);
        }
    };

    const removeImage = (indexToRemove: number) => {
        // Create a new array without the image at the specified index
        const updatedPreviewUrls = previewUrls.filter((_, index) => index !== indexToRemove);
        
        // Update the preview state
        setPreviewUrls(updatedPreviewUrls);
        
        // If we've removed all images, hide the preview
        if (updatedPreviewUrls.length === 0) {
            setShowPreview(false);
            
            // Notify parent that all images are removed
            handleFileChange(null, formField);
        } else {
            // Create a custom event to update the parent component
            const customEvent = {
                imageUrls: updatedPreviewUrls,
                target: { files: null }
            } as React.ChangeEvent<HTMLInputElement> & { imageUrls: string[] };
            
            // Pass the custom event to the parent component
            handleFileChange(customEvent, formField);
        }
    };

    // Generate CSS grid class based on number of images
    const getGridClass = () => {
        const count = previewUrls.length;
        if (count === 1) return 'grid-cols-1';
        if (count === 2) return 'grid-cols-2';
        if (count === 3) return 'grid-cols-3';
        if (count === 4) return 'grid-cols-2 md:grid-cols-4';
        return 'grid-cols-2 md:grid-cols-3'; // 5+ images
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
                        <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mb-2"></div>
                            <p className="text-gray-500">Uploading...</p>
                        </div>
                    ) : (
                        <>
                            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                            <p className="text-black">
                                Drop your {multiple ? 'images' : 'file'} here or <span className="text-emerald-500">browse</span>
                            </p>
                            <p className="text-sm text-gray-400 mt-1">
                                Maximum size 20MB {multiple && `(Up to ${maxFiles} images)`}
                            </p>
                        </>
                    )}
                </div>
            )}

            {showPreview && previewUrls.length > 0 && (
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center relative">
                    {uploading && (
                        <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
                            <div className="flex flex-col items-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mb-2"></div>
                                <p className="text-gray-700">Uploading additional images...</p>
                            </div>
                        </div>
                    )}
                    <div className={`grid ${getGridClass()} gap-4 mb-2`}>
                        {previewUrls.map((url, index) => (
                            <div key={index} className="relative h-48 group">
                                <Image
                                    src={url}
                                    alt={`${formField} preview ${index + 1}`}
                                    fill
                                    className="object-cover rounded-lg"
                                />
                                {multiple && (
                                    <button
                                        className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeImage(index);
                                        }}
                                        type="button"
                                        title="Remove image"
                                        disabled={uploading}
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                        
                        {/* Add more button for multiple uploads */}
                        {multiple && previewUrls.length < maxFiles && !uploading && (
                            <div 
                                className="relative h-48 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => !uploading && inputRef.current?.click()}
                            >
                                <div className="flex flex-col items-center">
                                    <Plus className="h-8 w-8 text-gray-400" />
                                    <p className="text-sm text-gray-500 mt-2">Add more</p>
                                    <p className="text-xs text-gray-400">
                                        {previewUrls.length}/{maxFiles}
                                    </p>
                                </div>
                            </div>
                        )}
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
                            title="Delete all images"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                        {!multiple && (
                            <button
                                className="text-sm text-blue-500 hover:text-blue-600"
                                onClick={() => !uploading && inputRef.current?.click()}
                                disabled={uploading}
                            >
                                {uploading ? 'Uploading...' : 'Change image'}
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
