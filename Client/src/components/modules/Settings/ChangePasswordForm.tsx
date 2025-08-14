"use client"
import GFormInput from "@/components/shared/Form/GFormInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { changePassword } from "@/services/auth";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const ChangePasswordForm = () => {
    const form = useForm({
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        }
    });
    const { control, handleSubmit, reset } = form;
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const { oldPassword, newPassword, confirmPassword } = data;

        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password do not match");
        }
        const passData = {
            oldPassword,
            newPassword
        }
        try {
            const res = await changePassword(passData);
            if (res.success) {
                toast.success(res.message)
                reset()
            }
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unexpected error occurred");
            }
        }
    }
    return (
        <div className="my-5">
            <Card className="mt-3">
                <CardHeader>
                    <CardTitle className="text-green-500">Password</CardTitle>
                    <CardDescription>Update your password.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Form {...form}>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
                                <div className="space-y-2">
                                    <Label htmlFor="current-password" className="text-green-500">Current password *</Label>
                                    <GFormInput
                                        name="oldPassword"
                                        placeholder="Current Password"
                                        control={control}
                                        type="password"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="new-password" className="text-green-500">New password *</Label>
                                    <GFormInput
                                        name="newPassword"
                                        placeholder="New Password"
                                        control={control}
                                        type="password"
                                    />

                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password" className="text-green-500">Confirm password *</Label>
                                    <GFormInput
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        control={control}
                                        type="password"
                                    />
                                </div>
                                <Button type="submit" className="bg-amber-500">Change Password</Button>
                            </form>
                        </Form>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ChangePasswordForm;