import React, { useEffect, useRef, useState } from 'react';
// import Image from 'next/image';
import { Upload } from 'lucide-react';
import { FileUploadProps } from '../../types/uploadTypes';

const FileUpload: React.FC<FileUploadProps> = ({ handleFileChange, titleText, multiple, formField, formData }) => {
    const [showPreview, setShowPreview] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setShowPreview(!!formData[formField]);
    }, [formData, formField]);

    return (
        <div>
            <p className="text-sm font-medium text-black mb-2">{titleText}</p>
            <input
                type="file"
                onChange={(e) => handleFileChange(e || null, formField)}
                className="hidden"
                ref={inputRef}
                id="logo-upload"
                multiple={multiple}
            />
            {!showPreview && (
                <div
                    className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center cursor-pointer hover:bg-zinc-100 duration-300"
                    onClick={() => inputRef.current?.click()}
                >
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-black">
                        Drop your file here or <span className="text-emerald-500">browse</span>
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Maximum size 20MB</p>
                </div>
            )}

            {showPreview && (
                <div
                    className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center cursor-pointer hover:bg-zinc-100 duration-300 relative grid grid-cols-2 place-items-center"
                    onClick={() => inputRef.current?.click()}
                >
                    <button
                        className="absolute top-4 right-4 bg-rose-500 p-2 rounded-md"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleFileChange(null, formField);
                        }}
                        type="button"
                    >
                        Delete
                    </button>
                    {formData[formField] &&
                        (typeof formData[formField] === 'string' ? (
                            <img src={formData[formField] as string} alt={formField} className="object-cover h-full"/>
                        ) : (
                            (formData[formField] as string[]).map((file, index) => (
                                <img key={index} src={file} alt={formField} className="object-cover h-full"/>
                            ))
                        ))}
                </div>
            )}
        </div>
    );
};

export default FileUpload;
