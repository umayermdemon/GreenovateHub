import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

import aboutImage from "@/app/assets/about.png";
import apple from "@/app/assets/apple.png";

const features = [
  {
    icon: "🌱",
    title: "Eco-Friendly Design",
    description:
      "Every feature is crafted with sustainability in mind, promoting a greener digital experience.",
  },
  {
    icon: "♻️",
    title: "Smart Resource Matching",
    description:
      "Connect with eco-conscious suppliers, services, and individuals who share your vision.",
  },
  {
    icon: "⚡",
    title: "Fast & Efficient Tools",
    description:
      "Our system ensures quick access to what matters most — reducing waste of time and energy.",
  },
  {
    icon: "🌍",
    title: "Sustainable Community",
    description:
      "Join a community passionate about environmental responsibility and impactful change.",
  },
];

const AboutPage = () => {
  return (
    <div className="">
      <div className="h-60 bg-gradient-to-b from-[#eafcfb] to-[#ccf3f8] text-center flex items-center justify-center">
        <h1 className="text-3xl font-bold text-[#06002C]">About Page</h1>
      </div>
      {/* Welcome section */}
      <div className="bg-[#f3f9ff] flex items-center justify-center py-16 px-6">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <Image
              src={aboutImage}
              alt="Green Circle Graphic"
              width={600}
              height={400}
              className="rounded-xl shadow-md"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-4">
              Welcome to Green Circle
            </h1>
            <p className="text-lg text-slate-600 mb-6 font-medium">
              We Are Here To Grow Communities, Connect Green-Minded People And
              Empower Sustainable Living.
            </p>
            <p className="text-slate-600 mb-6">
              Green Circle is a vibrant social platform for eco-conscious
              individuals and organizations. Built on the power of community, we
              help you connect, collaborate, and contribute toward a healthier
              planet. Our tools make it easy to find events, share resources,
              and build your own eco-network. Whether you&apos;re just starting
              your journey or leading change, there&apos;s a place for you here.
            </p>
            <Button className="bg-green-600 text-white hover:bg-green-700 text-base px-6 py-2 rounded-xl cursor-pointer">
              Join Our Community
            </Button>
          </div>
        </div>
      </div>
      {/* why choose section */}
      <div className="py-16 px-4 bg-gradient-to-br from-green-50 via-white to-green-100 text-center">
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-4xl font-bold text-green-900 mb-4">
            Why Choose Green Circle
          </h2>
          <p className="text-gray-700 text-base md:text-lg">
            Green Circle connects people with sustainability-focused solutions.
            With our clean UI, smart features, and thriving eco-community, we
            make going green simple and accessible.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((item, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition duration-300">
              <CardHeader>
                <div className="text-4xl mb-2">{item.icon}</div>
                <CardTitle className="text-green-800 text-lg">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-[#f3f9ff] flex flex-col items-center justify-center text-center py-16 px-6">
        <p className="text-green-600 font-semibold text-lg mb-2">
          Download the Green Circle App
        </p>
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Connecting Sustainable Lives, Easily
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mb-8">
          Discover and connect with over 5 million eco-conscious individuals
          worldwide. Green Circle makes it easy to find like-minded people,
          sustainable events, and local initiatives. Join us in making a real
          difference—right from your phone.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#"
            className="bg-white px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 border">
            <Image src={apple} alt="App Store" width={24} height={24} />

            <span className="text-slate-800 font-medium">
              Available on the App Store
            </span>
          </a>
          <a
            href="#"
            className="bg-white px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 border">
            {/* <Image src={playStore} alt="Google Play" width={24} height={24} /> */}
            <span className="text-slate-800 font-medium">
              Available on Google Play
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
