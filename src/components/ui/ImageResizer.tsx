import React, { useState, useRef, useEffect } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { X, Check, RefreshCw } from 'lucide-react';

interface ImageResizerProps {
  src: string;
  onSave: (croppedImage: string) => void;
  onCancel: () => void;
  aspectRatio?: number;
}

const ImageResizer: React.FC<ImageResizerProps> = ({ 
  src, 
  onSave, 
  onCancel,
  aspectRatio = 1
}) => {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5
  });
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  // Set initial crop when image loads
  useEffect(() => {
    setCrop({
      unit: '%',
      width: 90,
      height: aspectRatio ? 90 / aspectRatio : 90,
      x: 5,
      y: 5
    });
  }, [aspectRatio]);

  // Update preview canvas whenever crop changes
  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      return;
    }

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);

  const handleSave = () => {
    if (!previewCanvasRef.current) {
      return;
    }

    const dataUrl = previewCanvasRef.current.toDataURL('image/jpeg');
    onSave(dataUrl);
  };

  const resetCrop = () => {
    setCrop({
      unit: '%',
      width: 90,
      height: aspectRatio ? 90 / aspectRatio : 90,
      x: 5,
      y: 5
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Resize Image</h3>
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={onCancel}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <ReactCrop
            crop={crop}
            onChange={(c: Crop) => setCrop(c)}
            onComplete={(c: Crop) => setCompletedCrop(c)}
            aspect={aspectRatio}
            className="max-h-[60vh] mb-4"
          >
            <img
              ref={imgRef}
              src={src}
              alt="Crop preview"
              className="max-w-full max-h-[60vh] object-contain"
            />
          </ReactCrop>

          {/* Hidden canvas used for processing */}
          <canvas
            ref={previewCanvasRef}
            style={{
              width: completedCrop?.width ?? 0,
              height: completedCrop?.height ?? 0,
              display: 'none'
            }}
          />

          <div className="flex space-x-4 w-full mt-4">
            <button
              type="button"
              onClick={resetCrop}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none"
            >
              <Check className="w-4 h-4 mr-2" />
              Apply Crop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageResizer; 