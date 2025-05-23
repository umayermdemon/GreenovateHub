"use client";
import GFormInput from "@/components/shared/Form/GFormInput";
import GFormTextarea from "@/components/shared/Form/GFormTextarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { TAuthor } from "@/types";
import { useForm } from "react-hook-form";

interface SettingsFormProps {
    data: TAuthor;
}
const GerneralInfoForm = ({ data }: SettingsFormProps) => {
    const form = useForm({
        defaultValues: {
            name: data?.name,
            email: data?.email,
            address: data?.address
        }
    });
    const { control } = form;
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-green-500">General Information</CardTitle>
                    <CardDescription>Update your account information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Form {...form}>
                        <form className="space-y-2">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label className="text-green-500" htmlFor="email">Name *</Label>                                    <GFormInput
                                        name="name"
                                        control={control}
                                        className=""
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-green-500" htmlFor="email">Address *</Label>                                    <GFormInput
                                        name="address"
                                        control={control}
                                        className=""
                                        placeholder="Your Address"
                                    />                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-green-500" htmlFor="email">Email *</Label>
                                <GFormInput
                                    name="email"
                                    control={control}
                                    className=" "
                                    placeholder="Your Email"
                                />                            </div>
                            <div className="space-y-2">
                                <Label className="text-green-500" htmlFor="email">Bio *</Label>           <GFormTextarea
                                    name="bio"
                                    control={control}
                                    className=""
                                    placeholder="Your Bio"
                                />
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter>
                    <Button className="bg-green-500">Save Changes</Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default GerneralInfoForm;