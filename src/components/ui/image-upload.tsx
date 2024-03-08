import { Trash } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { UploadDropzone } from "@/utils/uploadthing";

interface ImageUploadProps {
  value: {
    url: string;
    key: string;
  } | null;
  onChange: (photoUploaded: { url: string; key: string }) => void;
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
      {value?.url ? (
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
          <Image fill className="object-cover" alt="Image" src={value.url} />
        </div>
      ) : (
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res: any) => onChange(res[0])}
          className="p-5"
        />
      )}
    </>
  );
};

export default ImageUpload;
