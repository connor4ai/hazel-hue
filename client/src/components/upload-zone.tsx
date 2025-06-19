import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Upload, CheckCircle } from "lucide-react";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  onUploadClick: () => void;
  file: File | null;
  instruction: {
    title: string;
    description: string;
    icon: React.ReactNode;
  };
  className?: string;
}

export default function UploadZone({ 
  onFileSelect, 
  onUploadClick, 
  file, 
  instruction, 
  className 
}: UploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const getImagePreview = (file: File) => {
    return URL.createObjectURL(file);
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />
      <Card 
        className={cn(
          "upload-zone cursor-pointer transition-all duration-300",
          isDragOver ? "dragover" : "",
          className
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
      <CardContent className="p-6 h-full flex flex-col items-center justify-center">
        {file ? (
          <div className="w-full h-full flex flex-col items-center">
            <img 
              src={getImagePreview(file)} 
              alt="Preview"
              className="w-full h-32 object-cover rounded-xl mb-4"
            />
            <div className="flex items-center text-sage font-medium">
              <CheckCircle className="h-4 w-4 mr-2" />
              Photo uploaded ✓
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-4">
              {instruction.icon}
            </div>
            <h3 className="font-semibold text-warm-gray-dark mb-2">{instruction.title}</h3>
            <p className="text-sm text-warm-gray mb-4">{instruction.description}</p>
            <div className="flex items-center text-xs text-warm-gray">
              <Upload className="h-3 w-3 mr-1" />
              Click or drag to upload
            </div>
          </div>
        )}
      </CardContent>
    </Card>
    </>
  );
}
