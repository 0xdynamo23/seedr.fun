import React from 'react';
import ProgressIndicator from './ProgressIndicator';

interface FormHeaderProps {
  step: number;
  totalSteps: number;
  title: string;
  subtitle: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ 
  step, 
  totalSteps, 
  title, 
  subtitle 
}) => {
  return (
    <div className="mb-6 sm:mb-8 relative">
      <div className="relative">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 inline-block">
          <span className="relative">
            {title}
            <span className="absolute -bottom-1 left-0 h-1 w-full bg-emerald-200 rounded-full" />
          </span>
        </h2>
        
        <p className="text-sm text-gray-500">
          {subtitle}
        </p>
      </div>
      
      <ProgressIndicator currentStep={step} totalSteps={totalSteps} />
    </div>
  );
};

export default FormHeader; 