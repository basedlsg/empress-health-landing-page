"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { ChevronRight, Star, Zap } from "lucide-react";
import { useRef } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Wellness Journey Member",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sarah%20M",
    content:
      "Empress Health helped me reclaim my energy and confidence. The personalized approach made all the difference.",
  },
  {
    name: "Jessica L.",
    role: "Hormone Health Client",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Jessica%20L",
    content:
      "Finally, supplements that actually work. My hormone balance has never been better.",
  },
  {
    name: "Maria K.",
    role: "Coaching Program Graduate",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Maria%20K",
    content:
      "The coaching changed my relationship with wellness completely. I feel empowered and in control.",
  },
  {
    name: "Alex Chen",
    role: "Tech Lead",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Alex%20Chen",
    content:
      "This platform has completely transformed our development workflow. We can ship features faster while maintaining high quality standards.",
  },
  {
    name: "Maria Rodriguez",
    role: "Design Director",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Maria%20Rodriguez",
    content:
      "The seamless integration between design and development tools has eliminated so many bottlenecks in our creative process.",
  },
  {
    name: "Jordan Taylor",
    role: "Product Manager",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Jordan%20Taylor",
    content:
      "Our team productivity has increased dramatically. What used to take weeks now takes days, without compromising on quality.",
  },
  {
    name: "Rachel Kim",
    role: "Frontend Engineer",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Rachel%20Kim",
    content:
      "The developer experience is incredible. Clean APIs, great documentation, and the tooling just works seamlessly together.",
  },
  {
    name: "Michael Brown",
    role: "Creative Director",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Michael%20Brown",
    content:
      "Finally, a platform that understands both the creative and technical aspects of modern product development.",
  },
  {
    name: "Samantha Lee",
    role: "Engineering Manager",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Samantha%20Lee",
    content:
      "The collaboration features have revolutionized how our distributed team works together. Everyone stays in sync effortlessly.",
  },
];

const ScrollingCarouselTestimonials = () => {
  const plugin = useRef(
    AutoScroll({
      startDelay: 500,
      speed: 0.7,
    })
  );

  return (
    <section className="py-32 bg-[#F5F2EF]">
      <div className="container flex flex-col items-center gap-4">
        <h2 className="text-center text-3xl font-serif font-semibold text-[#4A235A] lg:text-4xl">
          Transformation Stories
        </h2>
        <p className="text-center text-[#6B5B73] lg:text-lg">
          Real women, real results, real empowerment.
        </p>
        <a href="#" className="flex items-center gap-1 font-semibold text-[#4A235A]">
          View all testimonials
          <ChevronRight className="mt-0.5 h-4 w-auto" />
        </a>
      </div>
      <div className="lg:container">
        <div className="mt-16 space-y-4">
          <Carousel
            opts={{
              loop: true,
            }}
            plugins={[plugin.current]}
            onMouseLeave={() => plugin.current.play()}
            className="relative before:absolute before:top-0 before:bottom-0 before:left-0 before:z-10 before:w-36 before:bg-linear-to-r before:from-[#F5F2EF] before:to-transparent after:absolute after:top-0 after:right-0 after:bottom-0 after:z-10 after:w-36 after:bg-linear-to-l after:from-[#F5F2EF] after:to-transparent"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="basis-auto">
                  <Card className="max-w-96 p-6 select-none bg-white border-border">
                    <div className="mb-4 flex gap-4">
                      <Avatar className="size-14 rounded-full ring-1 ring-[#4A235A]/20">
                        <AvatarImage
                          src={testimonial.avatar}
                          alt={testimonial.name}
                        />
                      </Avatar>
                      <div>
                        <p className="font-medium text-[#4A235A]">{testimonial.name}</p>
                        <p className="text-sm text-[#6B5B73]">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <q className="leading-7 text-[#6B5B73]">
                      {testimonial.content}
                    </q>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export { ScrollingCarouselTestimonials };