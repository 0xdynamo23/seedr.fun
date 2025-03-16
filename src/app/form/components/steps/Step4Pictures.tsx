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
      className="space-y-6 h-[300px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.p 
        className="font-semibold text-black"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        Upload Pictures <span className="text-red-500">*</span>
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="relative"
      >
        <FileUpload
          key="pictureInput"
          titleText="Upload Pictures"
          multiple={true}
          formField="projectPics"
          handleFileChange={handleFileChange}
          formData={formData}
          onUploadStatusChange={onUploadStatusChange}
        />
        
        <motion.div 
          className="absolute -bottom-8 left-0 w-full text-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Show off your project with high-quality images
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Step4Pictures; 