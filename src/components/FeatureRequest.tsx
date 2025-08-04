import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Send, CheckCircle, X } from "lucide-react";
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

interface FormData {
  fullName: string;
  email: string;
  role: string;
  customRole: string;
  featureDescription: string;
}

interface FeatureRequestProps {
  onBack: () => void;
  isOpen: boolean;
}

export function FeatureRequest({ onBack, isOpen }: FeatureRequestProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    role: "",
    customRole: "",
    featureDescription: "",
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

    if (!formData.featureDescription.trim()) {
      newErrors.featureDescription = "Feature description is required";
    } else if (formData.featureDescription.trim().length < 10) {
      newErrors.featureDescription =
        "Please provide at least 10 characters describing the feature";
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
      const response = await fetch(
        "https://matalkwebsitebe-production.up.railway.app/api/feature-requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit feature request");
      }

      const result = await response.json();
      console.log("Feature request submitted:", result);

      // Track successful feature request submission
      analytics.trackFormSubmission("Feature Request", true, {
        role: formData.role,
        feature_description_length: formData.featureDescription.length,
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting feature request:", error);

      // Track failed feature request submission
      analytics.trackFormSubmission("Feature Request", false, {
        error: error instanceof Error ? error.message : "Unknown error",
      });

      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof Partial<FormData>]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
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
              Feature Request Submitted! 🚀
            </h1>
            <p className="lead text-slate-600 mb-6">
              Thank you, <strong>{formData.fullName}</strong>! We've received
              your feature request and will review it carefully.
            </p>
            <div className="bg-purple-50/50 rounded-lg p-6 mb-8">
              <h3 className="h3 text-purple-800 mb-4">What happens next?</h3>
              <div className="text-left space-y-3 text-slate-600">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Our product team will review your suggestion</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    We'll send you an email when we have an update on your
                    request
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    Popular requests will be prioritized for future releases
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Contributors may be invited to beta test new features</p>
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
                <h2 className="h3 text-slate-900">Suggest a Feature</h2>
                <p className="text-slate-600">
                  Help us improve Verbali with your ideas
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
                <SelectContent className="bg-white border border-slate-200 shadow-lg z-[9999]">
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

            {/* Feature Description */}
            <div className="space-y-2">
              <Label
                htmlFor="featureDescription"
                className="text-slate-700 font-medium"
              >
                Feature Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="featureDescription"
                value={formData.featureDescription}
                onChange={(e) =>
                  handleInputChange("featureDescription", e.target.value)
                }
                placeholder="Describe the feature you'd like us to add. Include details about how it would help you or your users, and any specific functionality you envision."
                rows={6}
                className={`bg-slate-50 border-slate-200 focus:bg-white focus:border-violet-500 transition-colors resize-none ${
                  errors.featureDescription
                    ? "border-red-300 focus:border-red-500 bg-red-50"
                    : ""
                }`}
              />
              <div className="flex justify-between items-center">
                {errors.featureDescription && (
                  <p className="text-sm text-red-600">
                    {errors.featureDescription}
                  </p>
                )}
                <p className="text-sm text-slate-500 ml-auto">
                  {formData.featureDescription.length} characters
                </p>
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
                    Submitting Request...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Feature Request
                  </>
                )}
              </Button>
            </motion.div>
          </form>

          {/* Privacy Note */}
          <div className="mt-6 p-4 bg-blue-50/50 rounded-lg border border-blue-100">
            <p className="text-sm text-slate-600">
              <strong>Privacy Promise:</strong> Your feature request and contact
              information will only be used to communicate about product
              development. We'll never share your details with third parties.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
