"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const utilities = [
  {
    title: "Personalized Coaching",
    description:
      "AI-powered guidance tailored to your unique health journey",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    title: "Premium Supplements",
    description:
      "Clinically-tested formulations crafted for women's wellness",
    image:
      "https://images.unsplash.com/photo-1559057114-f26b4ac3f061?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    title: "Evidence-Based Solutions",
    description:
      "Science-backed approaches to lasting health transformation",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
];

const ThreeColumnImageCards = () => {
  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto">
        <div className="m-auto mb-24 max-w-xl text-center">
          <h2 className="mb-6 text-3xl font-semibold lg:text-5xl text-[#4A235A] font-[var(--font-display)]">
            Your Wellness, Elevated
          </h2>
          <p className="m-auto max-w-3xl text-lg lg:text-xl text-muted-foreground">
            Discover the three pillars of transformative health that thousands of women trust.
          </p>
        </div>
        <div className="mt-11 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {utilities.map((utility, index) => (
            <Card key={index} className="border-0 pt-0 bg-[#D7BCE8] shadow-sm hover:shadow-md transition-shadow">
              <img
                src={utility.image}
                alt={utility.title}
                className="aspect-video w-full rounded-t-xl object-cover"
              />
              <div className="p-6">
                <p className="mb-3 font-semibold text-[#4A235A] font-[var(--font-display)] text-lg">{utility.title}</p>
                <p className="text-[#4A235A]/80 leading-relaxed">{utility.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { ThreeColumnImageCards };