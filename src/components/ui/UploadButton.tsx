import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import { GrAdd } from "react-icons/gr";

const uploader = Uploader({ 
  apiKey: process.env.NEXT_PUBLIC_UPLOAD_API_KEY || "" 
});

const MyApp = ({ triggerUpload }: { triggerUpload: () => void }) => {
  const handleComplete = (files: any[]) => {
    if (files.length > 0) {
      console.log("Uploaded files:", files.map(x => x.fileUrl));
      triggerUpload();
    }
  };

  return (
    <UploadButton 
      uploader={uploader} 
      options={{ multi: true }} 
      onComplete={handleComplete}
    >
      {({ onClick }) => (
        <div 
          onClick={onClick} 
          className="cursor-pointer text-5xl font-bold text-white"
        >
          <GrAdd />
        </div>
      )}
    </UploadButton>
  );
};

export default MyApp;