"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Upload, Trash2, X, Plus, Crop } from 'lucide-react';
import { FileUploadProps } from '@/types/uploadTypes';
import { toast } from 'react-hot-toast';
import ImageResizer from './ImageResizer';

const FileUpload: React.FC<FileUploadProps> = ({ 
  handleFileChange, 
  titleText, 
  multiple = false, 
  formField, 
  formData,
  onUploadStatusChange,
  maxFiles = 5,
  allowResizing = false
}) => {
    const [showPreview, setShowPreview] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [showResizer, setShowResizer] = useState(false);
    const [imageToResize, setImageToResize] = useState<string | null>(null);
    const [tempImageFiles, setTempImageFiles] = useState<File[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (formData[formField]) {
            // Convert to array if needed
            const urlsArray = Array.isArray(formData[formField])
                ? formData[formField] as string[]
                : [formData[formField] as string];
            
            // Only set showPreview to true if we actually have valid URLs
            const validUrls = urlsArray.filter(url => url && typeof url === 'string' && url.trim() !== '');
            
            if (validUrls.length > 0) {
                setShowPreview(true);
                
                // Only update previewUrls if it's different from current state
                // to prevent unnecessarily resetting the state
                const currentUrls = previewUrls.join(',');
                const newUrls = validUrls.join(',');
                
                if (currentUrls !== newUrls) {
                    console.log('Updating previewUrls from formData:', validUrls);
                    setPreviewUrls(validUrls);
                }
            } else {
                setShowPreview(false);
                setPreviewUrls([]);
            }
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
        
        // Store the files for later processing
        const files = Array.from(e.target.files);
        
        // If it's a logo and resizing is allowed, show the resizer for the first image only
        if (!multiple && allowResizing && files.length > 0) {
            const fileUrl = URL.createObjectURL(files[0]);
            setImageToResize(fileUrl);
            setTempImageFiles(files);
            setShowResizer(true);
            return;
        }
        
        // Otherwise proceed with normal upload
        await uploadFiles(files);
    };
    
    const uploadFiles = async (files: File[]) => {
        setUploading(true);
        
        // Store local preview URLs for cleanup
        const localPreviewUrls: string[] = [];
        
        try {
            // Create local previews for immediate visual feedback
            const newLocalPreviews = files.map(file => URL.createObjectURL(file));
            localPreviewUrls.push(...newLocalPreviews);
            
            // For multiple uploads (banners), always append to existing previews
            if (multiple && previewUrls.length > 0) {
                setPreviewUrls(prev => [...prev, ...newLocalPreviews]);
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
                ...{} as React.ChangeEvent<HTMLInputElement>,
                imageUrls: multiple ? 
                    // For multiple uploads (banners), always APPEND the new URLs
                    [...(Array.isArray(formData[formField]) 
                        ? formData[formField] as string[] 
                        : (formData[formField] ? [formData[formField] as string] : [])), 
                        ...uploadedUrls] :
                    uploadedUrls,
                target: {
                    files: null
                } as unknown as EventTarget & HTMLInputElement
            } as React.ChangeEvent<HTMLInputElement> & { imageUrls: string[] };
            
            // Debug logging for multiple uploads
            if (multiple) {
                console.log('Multiple upload - existing data:', formData[formField]);
                console.log('Multiple upload - new URLs:', uploadedUrls);
                console.log('Multiple upload - combined URLs:', customEvent.imageUrls);
            }
            
            // Notify parent component of successful uploads
            handleFileChange(customEvent, formField);
            
            // Update local preview with actual uploaded URLs
            if (multiple) {
                // For banners, always append new URLs to existing ones that aren't temporary
                setPreviewUrls(prev => {
                    // Remove any temporary local URLs that were replaced by uploaded ones
                    const filteredPrev = prev.filter(url => !localPreviewUrls.includes(url));
                    return [...filteredPrev, ...uploadedUrls];
                });
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

    const handleResizedImage = async (dataUrl: string) => {
        setShowResizer(false);
        
        // Convert the data URL to a file
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        const file = new File([blob], 'resized-image.jpg', { type: 'image/jpeg' });
        
        // Upload the resized image
        await uploadFiles([file]);
        
        // Clean up the temporary image
        if (imageToResize) {
            URL.revokeObjectURL(imageToResize);
            setImageToResize(null);
        }
    };

    const cancelResizing = () => {
        setShowResizer(false);
        
        // If user canceled resizing, upload the original image instead
        if (tempImageFiles.length > 0) {
            uploadFiles(tempImageFiles);
        }
        
        // Clean up
        if (imageToResize) {
            URL.revokeObjectURL(imageToResize);
            setImageToResize(null);
        }
        setTempImageFiles([]);
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
                ...{} as React.ChangeEvent<HTMLInputElement>,
                imageUrls: updatedPreviewUrls,
                target: { 
                    files: null 
                } as unknown as EventTarget & HTMLInputElement
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
            {/* Show the upload area when:
                1. There are no previews to show (!showPreview), OR
                2. It's a multiple upload and we haven't reached max files yet
            */}
            {(!showPreview || (multiple && previewUrls.length < maxFiles)) && (
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
                                {showPreview ? 'Add more images' : `Drop your ${multiple ? 'images' : 'file'} here or `}
                                <span className="text-emerald-500">browse</span>
                            </p>
                            <p className="text-sm text-gray-400 mt-1">
                                Maximum size 20MB {multiple && `(Up to ${maxFiles} images)`}
                            </p>
                            {allowResizing && !multiple && (
                                <p className="text-xs text-amber-600 mt-2">
                                    You'll be able to crop and resize after uploading
                                </p>
                            )}
                            {multiple && showPreview && (
                                <p className="text-xs text-amber-600 mt-2">
                                    {previewUrls.length}/{maxFiles} images uploaded
                                </p>
                            )}
                        </>
                    )}
                </div>
            )}

            {showPreview && previewUrls.length > 0 && (
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center relative mt-4">
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
                                
                                {/* Resize button for single image (logo) */}
                                {!multiple && allowResizing && (
                                    <button
                                        className="absolute top-2 left-2 bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setImageToResize(url);
                                            setShowResizer(true);
                                        }}
                                        type="button"
                                        title="Resize image"
                                        disabled={uploading}
                                    >
                                        <Crop className="w-4 h-4" />
                                    </button>
                                )}
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
            
            {/* Image Resizer Modal */}
            {showResizer && imageToResize && (
                <ImageResizer 
                    src={imageToResize}
                    onSave={handleResizedImage}
                    onCancel={cancelResizing}
                    aspectRatio={1} // 1:1 aspect ratio for logos
                />
            )}
        </div>
    );
};

export default FileUpload;
