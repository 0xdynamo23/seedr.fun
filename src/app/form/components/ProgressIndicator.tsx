import React from 'react';

export interface ProgressDotProps {
  active: boolean;
  completed: boolean;
  index: number;
  totalSteps: number;
}

const ProgressIndicator: React.FC<{ 
  currentStep: number;
  totalSteps: number;
}> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex w-full gap-1 mt-4 sm:mt-6 relative">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <ProgressDot
          key={index}
          index={index + 1}
          active={currentStep === index + 1}
          completed={currentStep > index + 1}
          totalSteps={totalSteps}
        />
      ))}
    </div>
  );
};

const ProgressDot: React.FC<ProgressDotProps> = ({
  active,
  completed,
  index,
  totalSteps,
}) => (
  <div className="relative flex-1">
    <div
      className={`h-1.5 rounded-full transition-all duration-300 ${
        completed
          ? "bg-emerald-500"
          : active
          ? "bg-emerald-400"
          : "bg-gray-200"
      }`}
      style={{ width: completed || active ? "100%" : "0%" }}
    />
    
    {/* Completed step indicator */}
    {completed && (
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-3 h-3 bg-emerald-500 rounded-full" />
    )}
    
    {active && (
      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs font-medium text-emerald-500 bg-white px-2 py-0.5 rounded-full shadow-sm">
        {index}/{totalSteps}
      </div>
    )}
  </div>
);

export default ProgressIndicator; 