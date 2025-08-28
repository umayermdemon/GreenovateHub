import { Dispatch, SetStateAction } from "react";
import { Input } from "../../input";
import { cn } from "@/lib/utils";
import { File } from "lucide-react";

type TImageUpload = {
  setImageFiles: Dispatch<SetStateAction<[] | File[]>>;
  setImagePreview?: Dispatch<SetStateAction<[] | string[]>>;
  imageFiles: File[] | [];
  label?: string;
  className?: string;
};

const GCImageUploader = ({
  setImageFiles,
  setImagePreview,
  className,
  imageFiles,
}: TImageUpload) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImageFiles((prev) => [...prev, file]);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (setImagePreview) {
          setImagePreview((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };
  return (
    <div
      className={cn(
        "flex justify-center items-center w-full gap-4",
        className
      )}>
      <Input
        onChange={handleImageChange}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        id="image-uploader"
      />

      <label
        htmlFor="image-uploader"
        className={cn(
          "flex justify-center items-center  border-dashed  cursor-pointer text-center border border-primary transition mt-3 py-1 text-primary w-full",
          className
        )}>
        <File size={15} color="green" />{" "}
        {imageFiles?.length === 0 ? "Upload your image" : imageFiles[0].name}
      </label>
    </div>
  );
};

export default GCImageUploader;
