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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import useImageUploader from "@/components/utils/useImageUploader";
import { createBlog } from "@/services/blog";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateBlog = () => {
  const [ImageUrls, setImageUrls] = useState<File | File[]>([]);
  const [previewImages, setPreviewImages] = useState<(string | File)[]>([]);
  const { uploadImagesToCloudinary } = useImageUploader();
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      status: "",
      images: [],
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const images = await uploadImagesToCloudinary(ImageUrls, true);

    const { title, description, category, status } = data;
    const blogData = {
      title,
      description,
      category,
      images,
      status,
    };
    console.log(blogData);
    try {
      const res = await createBlog(blogData);
      if (res.success) {
        setImageUrls([]);
        setPreviewImages([]);
        form.reset();
        window.location.reload();
        toast.success(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  }; // Closing the onSubmit function
  return (
    <div className=" lg:max-w-5xl lg:mx-auto  my-5 ">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" flex items-center justify-between">
            <PageHeader
              title="Share Your Thoughts"
              description="Have a unique idea or experience to share? Put it into words and inspire others with your blog!"
            />
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-green-500">
                Start Writing Your Blog
              </CardTitle>
              <CardDescription>
                Add a catchy title and give readers a glimpse of what your blog
                is about.
              </CardDescription>
            </CardHeader>
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
              <div className="space-y-2">
                <Label htmlFor="image" className="font-semibold text-[14px]">
                  Images{" "}
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
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="mt-4 rounded-none bg-green-500 cursor-pointer">
                  {isSubmitting ? "Creating..." : "Submit"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default CreateBlog;
