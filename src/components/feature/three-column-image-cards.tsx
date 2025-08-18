"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const utilities = [
  {
    title: "Personalized Coaching",
    description:
      "AI-powered guidance tailored to your unique health journey",
    image:
      "https://storage.googleapis.com/empress-health-images/personalized-coaching.jpg",
  },
  {
    title: "Premium Supplements",
    description:
      "Clinically-tested formulations crafted for women's wellness",
    image:
      "https://storage.googleapis.com/empress-health-images/premium-supplements.jpg",
  },
  {
    title: "Evidence-Based Solutions",
    description:
      "Science-backed approaches to lasting health transformation",
    image:
      "https://storage.googleapis.com/empress-health-images/evidence-based-solutions.jpg",
  },
];

const ThreeColumnImageCards = () => {
  return (
    <section className="py-32 bg-[#F5F2EF]">
      <div className="container mx-auto">
        <div className="m-auto mb-24 max-w-xl text-center">
          <h2 className="mb-6 text-3xl font-semibold lg:text-5xl text-[#4A235A] font-serif">
            Your Wellness, Elevated
          </h2>
          <p className="m-auto max-w-3xl text-lg lg:text-xl text-[#6B5B73]">
            Discover the three pillars of transformative health that thousands of women trust.
          </p>
        </div>
        <div className="mt-11 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {utilities.map((utility, index) => (
            <Card key={index} className="border-0 pt-0 bg-white shadow-sm hover:shadow-md transition-shadow">
              <img
                src={utility.image}
                alt={utility.title}
                className="aspect-video w-full rounded-t-xl object-cover"
              />
              <div className="p-6">
                <p className="mb-3 font-semibold text-[#4A235A] font-serif text-lg">{utility.title}</p>
                <p className="text-[#6B5B73] leading-relaxed">{utility.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { ThreeColumnImageCards };