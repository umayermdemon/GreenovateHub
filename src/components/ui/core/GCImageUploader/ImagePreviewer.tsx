import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../../button";
import { X } from "lucide-react";

type TImagePreviewer = {
  imagePreview: string[] | [];
  setImageFiles: Dispatch<SetStateAction<[] | File[]>>;
  setImagePreview: Dispatch<SetStateAction<[] | string[]>>;
  className?: string;
};

const ImagePreviewer = ({
  imagePreview,
  setImageFiles,
  setImagePreview,
  className,
}: TImagePreviewer) => {
  const handleRemove = (index: number) => {
    setImageFiles((prev) => prev.filter((_, idx) => idx !== index));
    setImagePreview((prev) => prev.filter((_, idx) => idx !== index));
  };
  return (
    <div className={className}>
      {imagePreview.map((preview, idx) => (
        <div
          key={idx}
          className="relative w-36 h-36 rounded-md overflow-hidden border border-dashed border-gray-300">
          <Image
            src={preview}
            width={150}
            height={100}
            alt={`Preview ${idx + 1}`}
            className="object-cover w-full h-full"
          />
          <Button
            type="button"
            size="sm"
            onClick={() => handleRemove(idx)}
            className="bg-red-300 hover:bg-red-400 absolute -top-0 -right-0 h-6 w-6 p-0 rounded-full">
            <X className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ImagePreviewer;
