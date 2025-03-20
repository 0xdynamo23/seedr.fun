import React from 'react';
import { motion } from 'framer-motion';
import FileUpload from '@/components/ui/fileUpload';
import { FileChangeEvent } from '@/types/formTypes';

interface Step4Props {
  projectPics: string[] | string | null;
  handleFileChange: (e: FileChangeEvent | null, field: string) => void;
  formData: any;
  onUploadStatusChange: (status: boolean) => void;
}

const Step4Pictures: React.FC<Step4Props> = ({ 
  projectPics,
  handleFileChange, 
  formData, 
  onUploadStatusChange 
}) => {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="space-y-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <motion.p 
          className="font-semibold text-black"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Upload Project Banners <span className="text-red-500">*</span>
        </motion.p>
        
        <motion.p 
          className="text-sm text-gray-500"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          Upload up to 5 high-quality images to showcase your project. First image will be used as the main banner.
        </motion.p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="relative"
      >
        <FileUpload
          key="pictureInput"
          titleText="Project Banners"
          multiple={true}
          maxFiles={5}
          formField="projectPics"
          handleFileChange={handleFileChange}
          formData={formData}
          onUploadStatusChange={onUploadStatusChange}
        />
        
        <motion.div 
          className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-sm text-blue-700">
            <span className="font-medium">Tips for great banners:</span>
          </p>
          <ul className="text-sm text-blue-600 mt-2 space-y-1 list-disc list-inside">
            <li>Use high-resolution, landscape-oriented images (16:9 ratio works best)</li>
            <li>First image will be displayed as the main banner</li>
            <li>Keep important content centered in the image</li>
            <li>Avoid text in images - add text in the description instead</li>
          </ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Step4Pictures; 