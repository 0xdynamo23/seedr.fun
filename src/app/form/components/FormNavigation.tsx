import React from 'react';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

interface FormNavigationProps {
  step: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  isUploading: boolean;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  step,
  totalSteps,
  onBack,
  onNext,
  isUploading,
}) => {
  return (
    <div className="flex w-full gap-3 mt-6 sm:mt-8 relative">
      {step > 1 && (
        <button
          type="button"
          onClick={onBack}
          className="flex-1 px-4 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors font-medium text-center text-sm sm:text-base flex items-center justify-center gap-2"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
      )}
      
      <button
        type="button"
        className="flex-1 z-10 font-medium"
        disabled={isUploading}
      >
        <div
          className={`px-4 sm:px-6 py-3 ${
            isUploading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-emerald-500 hover:bg-emerald-600'
          } rounded-lg text-white text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-colors`}
          onClick={isUploading ? undefined : onNext}
        >
          {isUploading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <span>{step === totalSteps ? 'Complete' : 'Next'}</span>
              {step !== totalSteps && (
                <ArrowRight size={16} />
              )}
            </>
          )}
        </div>
      </button>
    </div>
  );
};

export default FormNavigation; 