"use client";

import { useState } from "react";
import { AnimatedIndicatorNavbar } from "@/components/navbars/animated-indicator-navbar";
import { MinimalCenteredFooter } from "@/components/footers/minimal-centered-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Utensils, Dumbbell, Moon } from "lucide-react";
import { toast } from "sonner";

const specialties = [
  {
    id: "obgyn",
    name: "OB-GYN",
    description: "Obstetrics & Gynecology specialists focused on women's reproductive health and menopause care",
    icon: User,
  },
  {
    id: "rd",
    name: "RD",
    description: "Registered Dietitians providing personalized nutrition guidance for hormonal balance",
    icon: Utensils,
  },
  {
    id: "pt", 
    name: "PT",
    description: "Physical Therapists specializing in pelvic health and menopause-related mobility",
    icon: Dumbbell,
  },
  {
    id: "cbti",
    name: "CBT-I",
    description: "Sleep specialists trained in Cognitive Behavioral Therapy for Insomnia and sleep disorders",
    icon: Moon,
  }
];

export default function DoctorsComingSoon() {
  const [email, setEmail] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !selectedSpecialty) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/doctors/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          specialty: selectedSpecialty,
        }),
      });

      if (response.ok) {
        toast.success("Successfully added to waitlist! We'll notify you when this specialty becomes available.");
        setEmail("");
        setSelectedSpecialty("");
      } else {
        const errorData = await response.json();
        if (errorData.code === "DUPLICATE_EMAIL") {
          toast.error("You're already on the waitlist for this specialty!");
        } else {
          toast.error(errorData.error || "Something went wrong. Please try again.");
        }
      }
    } catch (error) {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNotifyMe = (specialtyId: string) => {
    setSelectedSpecialty(specialtyId);
    document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <AnimatedIndicatorNavbar />
      
      <main className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#4A235A] mb-6">
            Doctors Directory
          </h1>
          <p className="text-xl text-[#D7BCE8] max-w-3xl mx-auto mb-4 font-medium">
            Coming Soon
          </p>
          <p className="text-lg text-[#6B5B73] max-w-4xl mx-auto leading-relaxed">
            We're curating a comprehensive directory of healthcare specialists who understand the unique needs of women navigating menopause and hormonal health. Get early access by joining our waitlist.
          </p>
        </div>

        {/* Specialty Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
          {specialties.map((specialty) => {
            const IconComponent = specialty.icon;
            return (
              <Card 
                key={specialty.id}
                className="bg-[#FAF8F5] border-2 border-[#D7BCE8] hover:border-[#4A235A] transition-all duration-300 hover:shadow-lg group cursor-pointer"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#D7BCE8]/30 rounded-lg flex items-center justify-center group-hover:bg-[#D7BCE8]/50 transition-colors duration-300">
                      <IconComponent className="w-6 h-6 text-[#4A235A]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-2xl font-semibold text-[#4A235A] mb-2">
                        {specialty.name}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-[#6B5B73] leading-relaxed mb-6">
                    {specialty.description}
                  </p>
                  
                  <Button 
                    onClick={() => handleNotifyMe(specialty.id)}
                    className="w-full border-[#4A235A] text-[#4A235A] bg-transparent hover:bg-[#4A235A] hover:text-white transition-all duration-300 border"
                  >
                    Notify Me
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Email Capture Form */}
        <div id="waitlist-form" className="max-w-2xl mx-auto">
          <Card className="bg-white border-2 border-[#E8E0E5]">
            <CardContent className="p-8">
              <h2 className="font-serif text-3xl font-semibold text-[#4A235A] text-center mb-4">
                Join the Waitlist
              </h2>
              <p className="text-[#6B5B73] text-center mb-8">
                Be the first to know when our curated directory of specialists becomes available.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 text-lg border-[#E8E0E5] focus:border-[#4A235A]"
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty} disabled={isSubmitting}>
                    <SelectTrigger className="w-full h-12 text-lg border-[#E8E0E5] focus:border-[#4A235A]">
                      <SelectValue placeholder="Select a specialty you're interested in" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty.id} value={specialty.id}>
                          {specialty.name} - {specialty.name === "OB-GYN" ? "Obstetrics & Gynecology" : 
                           specialty.name === "RD" ? "Registered Dietitian" :
                           specialty.name === "PT" ? "Physical Therapy" :
                           "Cognitive Behavioral Therapy for Insomnia"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg bg-[#4A235A] hover:bg-[#D7BCE8] hover:text-[#4A235A] text-white transition-colors duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding to Waitlist..." : "Join Waitlist"}
                </Button>
              </form>
              
              <p className="text-sm text-[#6B5B73] text-center mt-6">
                We'll only notify you about the specialty you select. Your email will never be shared.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <MinimalCenteredFooter />
    </div>
  );
}