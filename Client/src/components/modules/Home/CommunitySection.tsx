import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Users, ShieldCheck, Star } from "lucide-react";

const features = [
  {
    icon: <Lightbulb className="h-10 w-10 text-primary" />,
    title: "Share Ideas",
    description:
      "Submit your eco-friendly projects and suggestions, from reducing plastic to solar innovations.",
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Community Feedback",
    description:
      "Get comments, support, and improvements from like-minded members in the community.",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: "Admin Review",
    description:
      "Admins ensure ideas meet guidelines, offer feedback, and maintain a safe environment.",
  },
  {
    icon: <Star className="h-10 w-10 text-primary" />,
    title: "Featured Projects",
    description:
      "Top ideas are highlighted and shared with the entire community for real-world impact.",
  },
];

const CommunitySection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-secondary mb-10">
          Join the GreenovateHub Community
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              className="shadow-md hover:shadow-xl transition bg-card border border-primary/10">
              <CardContent className="flex flex-col items-center text-center p-6">
                {feature.icon}
                <h3 className="mt-4 text-xl font-semibold text-secondary">
                  {feature.title}
                </h3>
                <p className="mt-2 text-muted-foreground text-sm">
                  {feature.description}
                </p>
                <Button className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
