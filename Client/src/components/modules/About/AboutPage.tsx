"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

import aboutImage from "@/app/assets/about.png";
import apple from "@/app/assets/apple.png";
import PageTopStyle from "@/components/shared/PageTopStyle";

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
    <div>
      {/* Header section */}
      <PageTopStyle
        header="About Page"
        description="We are here to answer any question you may have."
        footer="About"
      />
      {/* Welcome section */}
      <div className="bg-background flex items-center justify-center py-12 md:py-16 px-4">
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
          <div className="flex justify-center mb-8 md:mb-0">
            <Image
              src={aboutImage}
              alt="GreenovateHub Graphic"
              width={600}
              height={400}
              className="rounded-xl shadow-md w-full max-w-[400px] md:max-w-[600px] h-auto"
            />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Welcome to GreenovateHub
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6 font-medium">
              We Are Here To Grow Communities, Connect Green-Minded People And
              Empower Sustainable Living.
            </p>
            <p className="text-muted-foreground mb-6 text-base md:text-lg">
              GreenovateHub is a vibrant social platform for eco-conscious
              individuals and organizations. Built on the power of community, we
              help you connect, collaborate, and contribute toward a healthier
              planet. Our tools make it easy to find events, share resources,
              and build your own eco-network. Whether you&apos;re just starting
              your journey or leading change, there&apos;s a place for you here.
            </p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-6 py-2 rounded-xl cursor-pointer w-full md:w-auto">
              Join Our Community
            </Button>
          </div>
        </div>
      </div>
      {/* why choose section */}
      <div className="py-12 md:py-16 px-4 bg-secondary-foreground/5 text-center">
        <div className="max-w-4xl mx-auto mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Why Choose GreenovateHub
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            GreenovateHub connects people with sustainability-focused solutions.
            With our clean UI, smart features, and thriving eco-community, we
            make going green simple and accessible.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((item, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition duration-300 bg-card text-card-foreground">
              <CardHeader>
                <div className="text-4xl mb-2">{item.icon}</div>
                <CardTitle className="text-primary text-lg">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-background flex flex-col items-center justify-center text-center py-12 md:py-16 px-4">
        <p className="text-primary font-semibold text-lg mb-2">
          Download the GreenovateHub App
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Connecting Sustainable Lives, Easily
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mb-8">
          Discover and connect with over 5 million eco-conscious individuals
          worldwide. GreenovateHub makes it easy to find like-minded people,
          sustainable events, and local initiatives. Join us in making a real
          difference—right from your phone.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          <a
            href="#"
            className="bg-background px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 border border-border w-full sm:w-auto">
            <Image src={apple} alt="App Store" width={24} height={24} />
            <span className="text-foreground font-medium">
              Available on the App Store
            </span>
          </a>
          <a
            href="#"
            className="bg-background px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 border border-border w-full sm:w-auto">
            {/* <Image src={playStore} alt="Google Play" width={24} height={24} /> */}
            <span className="text-foreground font-medium">
              Available on Google Play
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
