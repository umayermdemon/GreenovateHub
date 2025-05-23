"use client";
import {
  categoryOptions,
  statusOptions,
} from "@/components/modules/Idea/Category/Category";
import GFormImageUpload from "@/components/shared/Form/GFormImageUploader";
import GFormInput from "@/components/shared/Form/GFormInput";
import GFormSelect from "@/components/shared/Form/GFormSelect";
import GFormTextarea from "@/components/shared/Form/GFormTextarea";
import { PageHeader } from "@/components/singles/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import useImageUploader from "@/components/utils/useImageUploader";
import { getSingleBlog, removeBlogImage, updateBlog } from "@/services/blog";
import { TBlog } from "@/types/blog.types";
import { Label } from "@radix-ui/react-label";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const UpdateBlog = () => {
  const [ImageUrls, setImageUrls] = useState<File | File[]>([]);
  const { id } = useParams();
  const [blogData, setBlogData] = useState<TBlog>({} as TBlog);
  const [previewImages, setPreviewImages] = useState<(string | File)[]>([]);
  const { uploadImagesToCloudinary } = useImageUploader();
  const form = useForm({
    defaultValues: {
      title: blogData?.title,
      description: blogData?.description,
      category: blogData?.category,
      status: blogData?.status,
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;
  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const res = await getSingleBlog(id);
        const blog = res.data;
        setBlogData(blog);
        form.reset({
          title: blog.title ?? "",
          description: blog.description ?? "",
          category: blog.category ?? "",
          status: blog.status ?? "",
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogDetails();
  }, [id, form]);
  const handleImageDelete = async (image: string) => {
    try {
      const opData = {
        image,
        id: blogData.id,
      };
      const res = await removeBlogImage(opData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const images = await uploadImagesToCloudinary(ImageUrls, true);

    const { title, description, category, status } = data;
    const blogInfo = {
      data: {
        title,
        description,
        category,
        images: [...images, ...blogData.images],
        status,
      },
      id: blogData.id,
    };
    try {
      const res = await updateBlog(blogInfo);
      if (res.success) {
        toast.success(res.message);
        window.location.href = "/admin/dashboard/all-blogs";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" lg:max-w-6xl lg:mx-auto my-5">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" flex items-center justify-between">
            <PageHeader
              title="Update Your Thoughts"
              description="Have a unique idea or experience to share? Put it into words and inspire others with your blog!"
            />
          </div>
          <Card>
            <CardContent>
              <GFormInput
                name="title"
                placeholder="Title"
                label="Title"
                control={form.control}
                className="border-green-500 hover:border- mb-4 hover:border-amber-400 rounded-none"
              />
              <GFormSelect
                name="category"
                placeholder="Category"
                label="Category"
                options={categoryOptions}
                control={form.control}
                className="w-full border-green-500 hover:border- mb-4 hover:border-amber-400 rounded-none"
              />
              <GFormTextarea
                name="description"
                placeholder="Describe your throught"
                label="Description"
                control={form.control}
                className="w-full border-green-500 hover:border- mb-4 hover:border-amber-400 rounded-none"
              />
              <GFormSelect
                name="status"
                placeholder="Status"
                label="Status"
                options={statusOptions}
                control={form.control}
                className="w-full border-green-500 hover:border- mb-4 hover:border-amber-400 rounded-none"
              />
              {blogData?.images?.length > 0 && (
                <>
                  <Label htmlFor="image" className="font-semibold text-[14px]">
                    Current Images
                    <span className="text-green-500 text-xl relative top-0.5">
                      *
                    </span>
                  </Label>
                  <div className="border border-green-500 p-2 grid grid-cols-4 border-dashed">
                    {blogData?.images?.map((image: string) => (
                      <div key={image} className="relative">
                        <Image
                          src={image}
                          alt="image"
                          width={200}
                          height={200}
                          className="rounded-sm"
                        />
                        <Button
                          onClick={() => handleImageDelete(image)}
                          variant="destructive"
                          size="icon"
                          className="absolute top-0 right-1 rounded-full shadow-md  hover:scale-110 transition-transform cursor-pointer">
                          <Trash2 size={14} className=" text-white" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <div className="space-y-2">
                <Label htmlFor="image" className="font-semibold text-[14px]">
                  New Images
                  <span className="text-green-500 text-xl relative top-0.5">
                    *
                  </span>
                </Label>
                <div className="border border-dashed p-12 text-center border-green-500 hover:border-amber-400 transition-colors cursor-pointer">
                  <GFormImageUpload
                    setPreviewImages={setPreviewImages}
                    previewImages={previewImages}
                    control={form.control}
                    name="images"
                    multiple={true}
                    onImageUpload={setImageUrls}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="mt-4 rounded-none bg-green-500 cursor-pointer">
                  {isSubmitting ? "Updating..." : "Update"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default UpdateBlog;
