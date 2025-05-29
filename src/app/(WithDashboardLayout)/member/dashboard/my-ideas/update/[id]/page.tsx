"use client";

import {
  categoryOptions,
  priceOptions,
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useImageUploader from "@/components/utils/useImageUploader";
import { useUser } from "@/context/UserContext";
import { getSingleIdea, removeIdeaImage, updateIdea } from "@/services/idea";
import { TIdea } from "@/types/idea.types";
import { ArrowLeft, ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const tabOrder = ["general", "solution", "availability"];

const UpdateIdea = () => {
  const { user } = useUser();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("general");
  const [previewImages, setPreviewImages] = useState<(string | File)[]>([]);
  const [idea, setIdea] = useState<TIdea>({} as TIdea);
  const [mounted, setMounted] = useState(false);
  const [ImageUrls, setImageUrls] = useState<File | File[]>([]);
  const { uploadImagesToCloudinary } = useImageUploader();
  const form = useForm({
    defaultValues: {
      title: idea.title,
      category: idea.category,
      problem: idea.problem_statement,
      solution: idea.proposed_solution,
      description: idea.description,
      ideaType: idea.isPremium ? "paid" : "unpaid",
      price: idea.price,
      status: idea.status,
    },
  });
  const {
    watch,
    setValue,
    formState: { isSubmitting },
  } = form;

  const goToNext = () => {
    const currentIndex = tabOrder?.indexOf(activeTab);
    if (currentIndex < tabOrder?.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    }
  };
  useEffect(() => {
    setMounted(true);
  }, []);
  const isPaid = watch("ideaType");
  useEffect(() => {
    if (!isPaid) {
      setValue("price", "0");
    }
  }, [setValue, isPaid]);
  useEffect(() => {
    const fetchIdeaDetails = async () => {
      try {
        const res = await getSingleIdea(id);
        const idea = res.data;
        setIdea(idea);
        form.reset({
          title: idea.title ?? "",
          category: idea.category ?? "",
          problem: idea.problem_statement ?? "",
          solution: idea.proposed_solution ?? "",
          description: idea.description ?? "",
          ideaType: idea.isPremium ? "paid" : "unpaid",
          price: idea.price ?? "",
          status: idea.status ?? "",
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchIdeaDetails();
  }, [id, form]);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const {
      title,
      description,
      category,
      problem,
      solution,
      ideaType,
      price,
      status,
    } = data;
    const images = await uploadImagesToCloudinary(ImageUrls, true);
    const ideaData = {
      title,
      description,
      category,
      images: [...images, ...idea.images],
      problem_statement: problem,
      proposed_solution: solution,
      isPremium: ideaType === "paid" ? true : false,
      price,
      status,
      authorId: user?.userId,
    };
    const updatedData = {
      data: ideaData,
      id: idea.id,
    };
    try {
      const res = await updateIdea(updatedData);

      if (res.success) {
        form.reset();
        toast.success(res.message);
        window.location.href = "/member/dashboard/my-ideas";
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleImageDelete = async (image: string) => {
    try {
      const opData = {
        image,
        id: idea.id,
      };
      await removeIdeaImage(opData);
    } catch (error) {
      console.log(error);
    }
  };
  if (!mounted) return null;
  return (
    <div className="min-h-screen flex flex-col lg:max-w-5xl lg:mx-auto my-5">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Update Your Idea"
          description="Got something unique in mind? Write it down!"
        />
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Tabs Header */}
            <TabsList className="w-full">
              {tabOrder.map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="w-full data-[state=active]:bg-green-500 data-[state=active]:text-white">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tabs Content */}

            <TabsContent className="mt-5" value="general">
              <Card>
                <CardHeader>
                  <CardTitle>General Informantion</CardTitle>
                  <CardDescription>
                    Provide General Information about your website
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <GFormInput
                    name="title"
                    label="Idea Title"
                    placeholder="Idea Title"
                    control={form.control}
                    className="border-green-500 hover:border- mb-4 hover:border-amber-400"
                  />
                  <GFormSelect
                    name="category"
                    label="Category"
                    control={form.control}
                    options={categoryOptions}
                    className="w-full border-green-500 hover:border-amber-400 mb-4"
                  />
                  {idea.images?.length > 0 && (
                    <>
                      <Label
                        htmlFor="image"
                        className="font-semibold text-[14px]">
                        Current Images
                        <span className="text-green-500 text-xl relative top-0.5">
                          *
                        </span>
                      </Label>
                      <div className="border border-green-500 p-2 grid grid-cols-4 border-dashed">
                        {idea?.images?.map((image: string) => (
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
                    <Label
                      htmlFor="image"
                      className="font-semibold text-[14px]">
                      Images{" "}
                      <span className="text-green-500 text-xl relative top-0.5">
                        *
                      </span>
                    </Label>
                    <div className="border border-dashed rounded-lg p-12 text-center border-green-500 hover:border-amber-400 transition-colors cursor-pointer">
                      <GFormImageUpload
                        control={form.control}
                        name="images"
                        setPreviewImages={setPreviewImages}
                        previewImages={previewImages}
                        multiple={true}
                        onImageUpload={setImageUrls}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    style={{ backgroundColor: "#22c55e", cursor: "pointer" }}
                    onClick={goToNext}
                    type="button">
                    Next: Solution{" "}
                    <ArrowRight className="ml-2 h-4 w-4 cursor-pointer" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent className="mt-5" value="solution">
              <Card>
                <CardHeader>
                  <CardTitle>Response Solutions</CardTitle>
                  <CardDescription>
                    Explore effective strategies and solutions to prepare for,
                    respond to, and recover from natural disasters.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <GFormInput
                    name="problem"
                    label="Problem"
                    placeholder="Problem"
                    control={form.control}
                    className="w-full border-green-500 hover:border-amber-400 mb-4"
                  />
                  <GFormInput
                    name="solution"
                    label="Solution"
                    placeholder="Solution"
                    control={form.control}
                    className="w-full border-green-500 hover:border-amber-400 mb-4"
                  />
                  <GFormTextarea
                    name="description"
                    label="Description"
                    placeholder="Describe your Idea"
                    className="w-full border-green-500 hover:border-amber-400 mb-4"
                    control={form.control}
                  />
                </CardContent>
                <CardFooter className="flex justify-between pt-4">
                  <Button
                    style={{ backgroundColor: "#22c55e", cursor: "pointer" }}
                    onClick={() => setActiveTab("general")}
                    type="button">
                    <ArrowLeft className="ml-2 h-4 w-4" /> Prev: General
                  </Button>
                  <Button
                    style={{ backgroundColor: "#22c55e", cursor: "pointer" }}
                    onClick={goToNext}
                    type="button">
                    Next: Solution{" "}
                    <ArrowRight className="ml-2 h-4 w-4 cursor-pointer" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent className="mt-5" value="availability">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing Details & Availability</CardTitle>
                  <CardDescription>
                    Review the current status, pricing type, and cost associated
                    with the solution or service.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <GFormSelect
                    name="ideaType"
                    label="Idea Type"
                    control={form.control}
                    options={priceOptions}
                    className="w-full border-green-500 hover:border-amber-400 mb-4"
                  />
                  <GFormInput
                    name="price"
                    label="Price"
                    placeholder="Price"
                    disabled={isPaid === "unpaid"}
                    control={form.control}
                    className="w-full border-green-500 hover:border-amber-400 mb-4"
                  />
                  <GFormSelect
                    name="status"
                    label="Status"
                    control={form.control}
                    options={statusOptions}
                    className="w-full border-green-500 hover:border-amber-400 mb-4"
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    style={{ backgroundColor: "#22c55e", cursor: "pointer" }}
                    onClick={() => setActiveTab("solution")}
                    type="button">
                    <ArrowLeft className="ml-2 h-4 w-4 cursor-pointer" /> Prev:
                    Solution
                  </Button>
                  <Button
                    style={{ backgroundColor: "#22c55e", cursor: "pointer" }}
                    type="submit">
                    {isSubmitting ? "updating..." : "Update"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

export default UpdateIdea;
