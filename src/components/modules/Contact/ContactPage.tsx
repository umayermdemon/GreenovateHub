import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="">
      <div className="h-60 bg-gradient-to-b from-[#eafcfb] to-[#ccf3f8] text-center flex items-center justify-center">
        <h1 className="text-3xl font-bold text-[#06002C]">Contact Page</h1>
      </div>

      {/* Contact Info Section */}
      <div className="bg-[#f3f9ff] py-24">
        <div className="max-w-7xl mx-auto ">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-3xl font-bold text-[#06002C]">Contact Info</h2>
            <p className="text-gray-600">
              Let us know your opinions. Also you can write us if you have any
              questions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8">
            <Card className="text-center py-8 shadow-md">
              <CardContent className="flex flex-col items-center space-y-4">
                <div className="bg-green-500 p-4 rounded-full text-white">
                  <MapPin />
                </div>
                <h3 className="font-semibold text-[#06002C]">Office Address</h3>
                <p className="text-sm text-gray-700">
                  1201 Park Street, Fifth Avenue
                </p>
              </CardContent>
            </Card>
            <Card className="text-center py-8 shadow-md">
              <CardContent className="flex flex-col items-center space-y-4">
                <div className="bg-green-500 p-4 rounded-full text-white">
                  <Phone />
                </div>
                <h3 className="font-semibold text-[#06002C]">Phone Number</h3>
                <p className="text-sm text-gray-700">
                  +22698 745 632, 02 982 745
                </p>
              </CardContent>
            </Card>
            <Card className="text-center py-8 shadow-md">
              <CardContent className="flex flex-col items-center space-y-4">
                <div className="bg-green-500 p-4 rounded-full text-white">
                  <Mail />
                </div>
                <h3 className="font-semibold text-[#06002C]">Send Email</h3>
                <p className="text-sm text-gray-700">youremail@gmail.com</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {/* Feedback Form */}
      <div className="">
        <div className="max-w-7xl mx-auto py-12">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-3xl font-bold text-[#06002C]">Feedback</h2>
            <p className="text-gray-600">
              Let us know your opinions. Also you can write us if you have any
              questions.
            </p>
          </div>
          <form className="space-y-6 max-w-4xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Your Name" />
              <Input placeholder="Your Email" />
              <Input placeholder="Phone" />
              <Input placeholder="Subject" />
            </div>
            <Textarea placeholder="Your Message" className="min-h-[150px]" />
            <div className="text-center">
              <Button className="bg-green-100 text-green-600 hover:bg-green-200 cursor-pointer">
                Send Your Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
