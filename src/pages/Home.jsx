import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import HeroSection from "../components/home/HeroSection";
import AboutSection from "../components/home/AboutSection";
import TestimonialCarousel from "../components/home/TestimonialCarousel";
import BlogSection from "../components/home/BlogSection";
import CTASection from "../components/home/CTASection";

export default function HomePage() {
  const [showWaitlistForm, setShowWaitlistForm] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "",
    other_description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    // Static testimonials data
    const staticTestimonials = [
      {
        id: 1,
        author: "Andrea Pham, MA, CCC-SLP Chen",
        role: "Speech-Language Pathologist",
        quote:
          "Verbali's Augmentative and Alternative Communication (AAC) has revolutionized how individuals with complex communication needs (CCNs) engage with the world",
      },
      {
        id: 2,
        author: "Talia Waldstreicher M.S. BCBA LBA",
        role: "Licensed Behavior Analyst",
        quote:
          "...This is more than a technological advancement—it’s a chance to give a voice to children who’ve never had one...",
      },
      {
        id: 3,
        author: "Kate Falls",
        role: "Director of Inclusion - Bender JCC of Greater Washington",
        quote:
          "This will open so many doors for children to be a part of their community",
      },
      {
        id: 4,
        author: "Sharyl Stevens, MS, CCC-SLP",
        role: "Speech-Language Pathologist",
        quote:
          "Verbali has knocked down those barriers and allows for so much potential for more natural social interactions, streamlined data for progress of use, and a way for SLPs to identify the expressive and receptive needs of the user",
      },
      {
        id: 5,
        author: "Dana Goldberg, MA, CCC-SLP",
        role: "Speech-Language Pathologist, Owner Speech Therapy Solutions, LLC",
        quote:
          "This product offers individuals with access to cutting-edge technology while giving people with communication needs more fluid, effective, and timely interaction",
      },
    ];

    setTestimonials(staticTestimonials);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://matalkwebsitebe-production.up.railway.app/api/waitlist",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setShowWaitlistForm(false);
          setSubmitted(false);
          setFormData({
            first_name: "",
            last_name: "",
            email: "",
            role: "",
            other_description: "",
          });
        }, 2000);
      } else {
        const error = await response.json();
        console.error("Submission failed:", error);
        // You can add error handling here (show toast notification, etc.)
        alert(`Error: ${error.message || "Failed to join waitlist"}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error. Please check if the server is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      <HeroSection onJoinWaitlist={() => setShowWaitlistForm(true)} />
      <AboutSection />
      <TestimonialCarousel testimonials={testimonials} />
      <BlogSection />
      <CTASection onJoinWaitlist={() => setShowWaitlistForm(true)} />

      <Dialog open={showWaitlistForm} onOpenChange={setShowWaitlistForm}>
        <DialogContent className="sm:max-w-md">
          <div className="bg-white rounded-[20px] p-6 relative">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                  Join Our Waiting List
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first_name">First Name</Label>
                      <Input
                        id="first_name"
                        value={formData.first_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            first_name: e.target.value,
                          })
                        }
                        required
                        className="rounded-xl border-2 border-purple-100 bg-purple-50/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last_name">Last Name</Label>
                      <Input
                        id="last_name"
                        value={formData.last_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            last_name: e.target.value,
                          })
                        }
                        required
                        className="rounded-xl border-2 border-purple-100 bg-purple-50/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="rounded-xl border-2 border-purple-100 bg-purple-50/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">I am a...</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value) =>
                        setFormData({ ...formData, role: value })
                      }
                      required
                    >
                      <SelectTrigger className="rounded-xl border-2 border-purple-100 bg-purple-50/30">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="slp">
                          Speech Language Pathologist (SLP)
                        </SelectItem>
                        <SelectItem value="aba">
                          Applied Behavior Analysis (ABA) Specialist
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.role === "other" && (
                    <div className="space-y-2">
                      <Label htmlFor="other_description">
                        Tell us a bit more
                      </Label>
                      <Input
                        id="other_description"
                        value={formData.other_description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            other_description: e.target.value,
                          })
                        }
                        required
                        className="rounded-xl border-2 border-purple-100 bg-purple-50/30"
                      />
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                >
                  {isSubmitting ? "Submitting..." : "Join Waiting List"}
                </Button>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Thank you for joining!
                </h3>
                <p className="text-gray-600">
                  We'll keep you updated on our progress.
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
