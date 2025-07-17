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
    try {
      const res = await createBlog(blogData);
      if (res?.success) {
        setImageUrls([]);
        setPreviewImages([]);
        form.reset();
        window.location.reload();
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-5xl lg:container mx-auto  my-5 ">
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
              <CardTitle className="text-primary">
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
                className="border-primary hover:border-primary/80 mb-4 rounded-md"
              />
              <GFormSelect
                name="category"
                placeholder="Category"
                label="Category"
                options={categoryOptions}
                control={form.control}
                className="w-full border-primary hover:border-primary/80 mb-4 rounded-md"
              />
              <GFormTextarea
                name="description"
                placeholder="Describe your thought"
                label="Description"
                control={form.control}
                className="w-full border-primary hover:border-primary/80 mb-4 rounded-md"
              />
              <GFormSelect
                name="status"
                placeholder="Status"
                label="Status"
                options={statusOptions}
                control={form.control}
                className="w-full border-primary hover:border-primary/80 mb-4 rounded-md"
              />
              <div className="space-y-2">
                <Label htmlFor="image" className="font-semibold text-sm">
                  Images{" "}
                  <span className="text-primary text-xl relative top-0.5">
                    *
                  </span>
                </Label>
                <div className="border border-dashed p-6 sm:p-12 text-center border-primary hover:border-primary/80 transition-colors cursor-pointer">
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
                  className="mt-4 rounded-md bg-primary text-white hover:bg-primary/90 cursor-pointer">
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
