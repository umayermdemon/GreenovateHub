"use client"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import GFormInput from "./shared/Form/GFormInput";
import { useState } from "react";
import useImageUploader from "./utils/useImageUploader";
import GCImageUploader from "./ui/core/GCImageUploader";
import { Label } from "./ui/label";
import { TUserProfile } from "@/types/user.type";
import { toast } from "sonner";
import { updateMyProfile } from "@/services/user";

const UpdateProfile = (myProfile: TUserProfile) => {
    const form = useForm({
        defaultValues: {
            name: myProfile?.name,
            address: myProfile?.address || "",
        }
    });
    const { handleSubmit } = form;
    const [imageFiles, setImageFiles] = useState<File[] | []>([]);
    const { uploadImagesToCloudinary } = useImageUploader();
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const image = await uploadImagesToCloudinary(imageFiles);
        const { name, address } = data;
        const userUpdateData = {
            name,
            address,
            image: image || myProfile?.image,
        };
        console.log(userUpdateData, 'userUpdateData');
        try {
            const res = await updateMyProfile(userUpdateData);
            console.log(res);
            if (res?.success) {
                toast.success(res?.message);
                window.location.reload();
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Error happened while updating your profile")
        }

    }
    return (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button className="bg-green-500 cursor-pointer hover:bg-green-900">Edit Profile</Button>
                </PopoverTrigger>
                <PopoverContent className="relative right-[300px] bottom-[50px]">
                    <h1 className="text-center text-xl font-semibold">Update your Profile</h1>
                    <Form {...form}>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <GFormInput
                                name="name"
                                label="Your Name"
                                placeholder="Enter your name"
                                control={form.control}
                                className="rounded-none border-green-500"
                            />
                            <GFormInput
                                name="address"
                                label="Your Address"
                                placeholder="Enter your address"
                                control={form.control}
                                className="rounded-none border-green-500"
                            />
                            <Label>Your Image <span className="text-xl text-green-500 relative right-0.5">*</span></Label>
                            <GCImageUploader
                                setImageFiles={setImageFiles}
                                imageFiles={imageFiles}
                            />
                            <Button className="mt-2 w-full rounded-none bg-green-500 cursor-pointer hover:bg-green-900">Update</Button>
                        </form>
                    </Form>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default UpdateProfile;