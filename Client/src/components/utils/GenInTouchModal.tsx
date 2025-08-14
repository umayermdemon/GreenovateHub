import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";

const GetInTouchModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="top">
      <DrawerContent className="min-h-screen w-full p-2 bg-background flex flex-col">
        <DrawerHeader className="px-4 pt-4 md:px-6 md:pt-6">
          <DrawerTitle className="text-2xl font-bold">Get in touch</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 md:px-6">
          <div className="w-full h-40 md:h-56 bg-muted rounded-md mb-6 md:mb-8" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 px-4 md:px-6 pb-6 md:pb-8 flex-1">
          {/* Contact Info */}
          <Card className="h-full flex flex-col justify-center">
            <CardContent className="p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold mb-2">
                Get in touch
              </h2>
              <p className="mb-4 text-muted-foreground text-sm md:text-base">
                We are here to answer any question you may have. Feel free to
                reach via contact form.
              </p>
              <div className="flex items-center gap-2 mb-2 text-muted-foreground text-sm md:text-base">
                <MapPin size={18} />
                <span>
                  <span className="font-semibold">290 Maryam Springs 260,</span>{" "}
                  Courbevoie, Paris
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2 text-muted-foreground text-sm md:text-base">
                <Mail size={18} />
                <span>
                  <span className="font-semibold">Email:</span>{" "}
                  hello@liquid-themes.com
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm md:text-base">
                <Phone size={18} />
                <span>
                  <span className="font-semibold">Phone:</span> +47 213 5941 295
                </span>
              </div>
            </CardContent>
          </Card>
          {/* Contact Form */}
          <Card className="flex flex-col items-center justify-center">
            <CardContent className="p-4 md:p-6 w-full">
              <form className="space-y-4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Your Name"
                    className="text-sm md:text-base"
                  />
                  <Input
                    placeholder="Your Email"
                    type="email"
                    className="text-sm md:text-base"
                  />
                  <Input placeholder="Phone" className="text-sm md:text-base" />
                  <Input
                    placeholder="Subject"
                    className="text-sm md:text-base"
                  />
                </div>
                <Textarea
                  placeholder="Your Message"
                  className="min-h-[150px] text-sm md:text-base"
                />
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground text-sm md:text-base">
                  Send email
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <DrawerClose className="absolute top-4 right-4 text-2xl">
          &times;
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
};
export default GetInTouchModal;
