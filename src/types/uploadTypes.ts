interface CustomFormData {
    [key: string]: string | string[] | null;
}

interface FileUploadProps {
    handleFileChange: (e: File | null, field: keyof CustomFormData) => Promise<void>;
    titleText: string;
    multiple: boolean;
    formField: keyof CustomFormData;
    formData: CustomFormData;
}
