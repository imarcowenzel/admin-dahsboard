import { Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/utils/uploadthing";

interface ImageUploadProps {
  value: string;
  onChange: (...event: any[]) => void;
  onRemove: () => void;
  disabled: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
  disabled,
}) => {
  return (
    <>
      {value ? (
        <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
          <div className="z-10 absolute top-2 right-2">
            <Button
              type="button"
              onClick={onRemove}
              variant="destructive"
              size="sm"
              disabled={disabled}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
          <Image fill className="object-cover" alt="Image" src={value} />
        </div>
      ) : (
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => onChange(res[0].url)}
          onUploadProgress={(res) => console.log(res)}
          className="p-5"
        />
      )}
    </>
  );
};

export default ImageUpload;
