"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";
import PageTopStyle from "@/components/shared/PageTopStyle";

const ContactPage = () => {
  return (
    <div className="bg-background lg:pb-12">
      {/* Header section */}
      <PageTopStyle
        header="Contact"
        description="We are here to answer any question you may have. Feel free to reach via contact form."
        footer="Contact"
      />

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto py-12 px-2">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Contact Info Card */}
          <div className="bg-card border border-border rounded-xl p-8 flex-1 flex flex-col justify-center shadow-sm">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Get in touch
            </h2>
            <p className="text-muted-foreground mb-6">
              We are here to answer any question you may have. Feel free to
              reach via contact form.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-muted-foreground mt-1" />
                <span>
                  <span className="font-semibold text-foreground">
                    290 Maryam Springs 260,
                  </span>
                  <br />
                  <span className="font-semibold text-foreground">
                    Courbevoie, Paris
                  </span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-muted-foreground" />
                <span>
                  <span className="font-semibold text-foreground">Email:</span>{" "}
                  <span className="font-semibold text-muted-foreground">
                    hello@liquid-themes.com
                  </span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-muted-foreground" />
                <span>
                  <span className="font-semibold text-foreground">Phone:</span>{" "}
                  <span className="font-semibold text-muted-foreground">
                    +47 213 5941 295
                  </span>
                </span>
              </li>
            </ul>
          </div>
          {/* Contact Form */}
          <div className="flex-1 flex lg:justify-end">
            <form className="flex flex-col gap-4 w-full md:w-[500px]">
              <Input
                placeholder="Your name"
                className="bg-muted/40 border border-border focus:ring-primary"
              />
              <Input
                placeholder="Your Email Address"
                className="bg-muted/40 border border-border focus:ring-primary"
              />
              <Textarea
                placeholder="Your message"
                className="bg-muted/40 border border-border min-h-[120px] focus:ring-primary"
              />
              <Button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white text-base rounded-md mt-2">
                Send email
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
