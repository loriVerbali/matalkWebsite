import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Send, CheckCircle, Users, X } from "lucide-react";
import { analytics } from "../utils/analytics";
// Placeholder image - replace with actual image when available
const matalkLogo = "/images/MatalkLogoWeb.png";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";

interface FormData {
  fullName: string;
  email: string;
  role: string;
  customRole: string;
  organization: string;
  communicationNeeds: string;
  interests: string[];
}

interface WaitListProps {
  onBack: () => void;
  isOpen: boolean;
}

export function WaitList({ onBack, isOpen }: WaitListProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    role: "",
    customRole: "",
    organization: "",
    communicationNeeds: "",
    interests: [],
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const roles = [
    { value: "parent", label: "Parent/Guardian" },
    { value: "caregiver", label: "Caregiver" },
    { value: "slp", label: "Speech-Language Pathologist" },
    { value: "aba", label: "ABA Therapist" },
    { value: "teacher", label: "Special Education Teacher" },
    { value: "teacher-general", label: "General Education Teacher" },
    { value: "ot", label: "Occupational Therapist" },
    { value: "pt", label: "Physical Therapist" },
    { value: "admin", label: "School Administrator" },
    { value: "researcher", label: "Researcher/Academic" },
    { value: "tech", label: "Technology Professional" },
    { value: "other", label: "Other" },
  ];

  const interestOptions = [
    { value: "beta-testing", label: "Beta testing opportunities" },
    { value: "product-updates", label: "Product development updates" },
    { value: "webinars", label: "Educational webinars" },
    { value: "community", label: "Community discussions" },
    { value: "pricing", label: "Pricing and plan updates" },
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.role) {
      newErrors.role = "Please select your role";
    } else if (formData.role === "other" && !formData.customRole.trim()) {
      newErrors.customRole = "Please specify your role";
    }

    if (
      formData.communicationNeeds.trim() &&
      formData.communicationNeeds.trim().length < 10
    ) {
      newErrors.communicationNeeds =
        "Please provide at least 10 characters describing your needs";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock API call - replace with actual Supabase integration
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In a real implementation, this would:
      // 1. Save to Supabase waitlist table
      // 2. Send welcome email via Supabase Edge Functions
      // 3. Add to email marketing list
      // 4. Send notification to team

      console.log("Waitlist signup submitted:", formData);

      // Track successful waitlist submission
      analytics.trackFormSubmission("Waitlist", true, {
        role: formData.role,
        organization: formData.organization,
        interests_count: formData.interests.length,
        has_communication_needs: !!formData.communicationNeeds.trim(),
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting waitlist signup:", error);

      // Track failed waitlist submission
      analytics.trackFormSubmission("Waitlist", false, {
        error: error instanceof Error ? error.message : "Unknown error",
      });

      // Handle error (show toast notification, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof Partial<FormData>]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleInterestToggle = (interest: string) => {
    const currentInterests = formData.interests;
    const updatedInterests = currentInterests.includes(interest)
      ? currentInterests.filter((i) => i !== interest)
      : [...currentInterests, interest];

    handleInputChange("interests", updatedInterests);
  };

  if (!isOpen) return null;

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-8 h-8 text-green-600" />
            </motion.div>

            <h1 className="h2 text-slate-900 mb-4">
              Welcome to the Verbali Waitlist! 🎉
            </h1>
            <p className="lead text-slate-600 mb-6">
              Thank you, <strong>{formData.fullName}</strong>! We've sent a
              confirmation email to <strong>{formData.email}</strong>.
            </p>
            <div className="bg-purple-50/50 rounded-lg p-6 mb-8">
              <h3 className="h3 text-purple-800 mb-4">What happens next?</h3>
              <div className="text-left space-y-3 text-slate-600">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>You'll receive early access when Verbali launches</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>We'll keep you updated on development progress</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    You'll be invited to provide feedback during beta testing
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Special pricing will be available for early supporters</p>
                </div>
              </div>
            </div>

            <Button onClick={onBack} className="btn-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-lg flex items-center justify-center p-1">
                <img
                  src={matalkLogo}
                  alt="Verbali Logo"
                  className="w-full h-full object-contain rounded-md"
                />
              </div>
              <div>
                <h2 className="h3 text-slate-900">Join the Verbali Waitlist</h2>
                <p className="text-slate-600">
                  Get early access and exclusive updates
                </p>
              </div>
            </div>
            <Button
              onClick={onBack}
              variant="ghost"
              size="sm"
              className="text-slate-500 hover:text-slate-700 hover:bg-slate-100 w-8 h-8 rounded-full p-0 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-slate-700 font-medium">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="Enter your full name"
                className={`bg-slate-50 border-slate-200 focus:bg-white focus:border-violet-500 transition-colors ${
                  errors.fullName
                    ? "border-red-300 focus:border-red-500 bg-red-50"
                    : ""
                }`}
              />
              {errors.fullName && (
                <p className="text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-medium">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email address"
                className={`bg-slate-50 border-slate-200 focus:bg-white focus:border-violet-500 transition-colors ${
                  errors.email
                    ? "border-red-300 focus:border-red-500 bg-red-50"
                    : ""
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="role" className="text-slate-700 font-medium">
                Your Role <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.role}
                onValueChange={(value) => {
                  handleInputChange("role", value);
                  if (value !== "other") {
                    handleInputChange("customRole", "");
                  }
                }}
              >
                <SelectTrigger
                  className={`bg-slate-50 border-slate-200 focus:bg-white focus:border-violet-500 transition-colors ${
                    errors.role
                      ? "border-red-300 focus:border-red-500 bg-red-50"
                      : ""
                  }`}
                >
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-sm text-red-600">{errors.role}</p>
              )}

              {formData.role === "other" && (
                <div className="mt-3">
                  <Input
                    id="customRole"
                    type="text"
                    value={formData.customRole}
                    onChange={(e) =>
                      handleInputChange("customRole", e.target.value)
                    }
                    placeholder="Please specify your role..."
                    className={`bg-slate-50 border-slate-200 focus:bg-white focus:border-violet-500 transition-colors ${
                      errors.customRole
                        ? "border-red-300 focus:border-red-500 bg-red-50"
                        : ""
                    }`}
                  />
                  {errors.customRole && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.customRole}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Organization */}
            <div className="space-y-2">
              <Label
                htmlFor="organization"
                className="text-slate-700 font-medium"
              >
                Organization (Optional)
              </Label>
              <Input
                id="organization"
                type="text"
                value={formData.organization}
                onChange={(e) =>
                  handleInputChange("organization", e.target.value)
                }
                placeholder="School, clinic, therapy center, etc."
                className="bg-slate-50 border-slate-200 focus:bg-white focus:border-violet-500 transition-colors"
              />
            </div>

            {/* Communication Needs */}
            <div className="space-y-2">
              <Label
                htmlFor="communicationNeeds"
                className="text-slate-700 font-medium"
              >
                Communication Needs (Optional)
              </Label>
              <Textarea
                id="communicationNeeds"
                value={formData.communicationNeeds}
                onChange={(e) =>
                  handleInputChange("communicationNeeds", e.target.value)
                }
                placeholder="Tell us about your specific AAC needs, challenges, or goals (optional). What features would be most valuable to you?"
                rows={4}
                className={`bg-slate-50 border-slate-200 focus:bg-white focus:border-violet-500 transition-colors resize-none ${
                  errors.communicationNeeds
                    ? "border-red-300 focus:border-red-500 bg-red-50"
                    : ""
                }`}
              />
              <div className="flex justify-between items-center">
                {errors.communicationNeeds && (
                  <p className="text-sm text-red-600">
                    {errors.communicationNeeds}
                  </p>
                )}
                <p className="text-sm text-slate-500 ml-auto">
                  {formData.communicationNeeds.length} characters
                </p>
              </div>
            </div>

            {/* Interests */}
            <div className="space-y-3">
              <Label className="text-slate-700 font-medium">
                What are you most interested in? (Optional)
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {interestOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleInterestToggle(option.value)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      formData.interests.includes(option.value)
                        ? "bg-violet-50 border-violet-300 text-violet-700"
                        : "bg-slate-50 border-slate-200 hover:border-violet-200 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                          formData.interests.includes(option.value)
                            ? "bg-violet-600 border-violet-600"
                            : "border-gray-300"
                        }`}
                      >
                        {formData.interests.includes(option.value) && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="text-sm">{option.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="pt-4"
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary h-12 text-base"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Joining Waitlist...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Join the Waitlist
                  </>
                )}
              </Button>
            </motion.div>
          </form>

          {/* Privacy Note */}
          <div className="mt-6 p-4 bg-blue-50/50 rounded-lg border border-blue-100">
            <p className="text-sm text-slate-600">
              <strong>Privacy Promise:</strong> We'll only use your information
              to communicate about Verbali. No spam, no third-party sharing. You
              can unsubscribe anytime.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
