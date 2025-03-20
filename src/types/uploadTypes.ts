export interface FileUploadProps {
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement> & { imageUrl?: string, imageUrls?: string[] } | null, field: string) => void;
    titleText: string;
    multiple?: boolean;
    formField: string;
    formData: {
        [key: string]: string | string[] | null;
    };
    onUploadStatusChange?: (isUploading: boolean) => void;
    maxFiles?: number;
}
