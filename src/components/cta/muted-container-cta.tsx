"use client";

import { Button } from "@/components/ui/button";

const MutedContainerCta = () => {
  return (
    <section className="py-32 bg-[#F5F2EF]">
      <div className="container mx-auto">
        <div className="relative mx-auto flex max-w-4xl flex-col justify-center overflow-hidden rounded-xl border bg-white p-6 md:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-semibold md:text-4xl font-serif text-[#4A235A]">
              Join the Waitlist
            </h2>
            <p className="mt-4 text-[#6B5B73] md:text-lg">
              Be the first to experience the future of women's wellness. Get early access to new products and exclusive health insights.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button
                style={{ backgroundColor: '#4A235A' }}
                className="hover:opacity-90 transition-opacity"
              >
                Join Waitlist
              </Button>
            </div>
            <p className="mt-4 text-sm text-[#6B5B73]">
              No spam, just wellness wisdom.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { MutedContainerCta };