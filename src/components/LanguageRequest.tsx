import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Send, CheckCircle, X } from "lucide-react";
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
  language: string;
  customLanguage: string;
  region: string;
  customRegion: string;
  additionalInfo: string;
}

interface LanguageRequestProps {
  onBack: () => void;
  isOpen: boolean;
}

export function LanguageRequest({ onBack, isOpen }: LanguageRequestProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    role: "",
    customRole: "",
    language: "",
    customLanguage: "",
    region: "",
    customRegion: "",
    additionalInfo: "",
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

  const languages = [
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
    { value: "italian", label: "Italian" },
    { value: "portuguese", label: "Portuguese" },
    { value: "dutch", label: "Dutch" },
    { value: "russian", label: "Russian" },
    { value: "mandarin", label: "Mandarin Chinese" },
    { value: "cantonese", label: "Cantonese" },
    { value: "japanese", label: "Japanese" },
    { value: "korean", label: "Korean" },
    { value: "arabic", label: "Arabic" },
    { value: "hebrew", label: "Hebrew" },
    { value: "hindi", label: "Hindi" },
    { value: "bengali", label: "Bengali" },
    { value: "urdu", label: "Urdu" },
    { value: "turkish", label: "Turkish" },
    { value: "polish", label: "Polish" },
    { value: "czech", label: "Czech" },
    { value: "hungarian", label: "Hungarian" },
    { value: "romanian", label: "Romanian" },
    { value: "bulgarian", label: "Bulgarian" },
    { value: "croatian", label: "Croatian" },
    { value: "serbian", label: "Serbian" },
    { value: "slovenian", label: "Slovenian" },
    { value: "slovak", label: "Slovak" },
    { value: "ukrainian", label: "Ukrainian" },
    { value: "greek", label: "Greek" },
    { value: "norwegian", label: "Norwegian" },
    { value: "swedish", label: "Swedish" },
    { value: "danish", label: "Danish" },
    { value: "finnish", label: "Finnish" },
    { value: "icelandic", label: "Icelandic" },
    { value: "estonian", label: "Estonian" },
    { value: "latvian", label: "Latvian" },
    { value: "lithuanian", label: "Lithuanian" },
    { value: "maltese", label: "Maltese" },
    { value: "irish", label: "Irish Gaelic" },
    { value: "welsh", label: "Welsh" },
    { value: "basque", label: "Basque" },
    { value: "catalan", label: "Catalan" },
    { value: "galician", label: "Galician" },
    { value: "thai", label: "Thai" },
    { value: "vietnamese", label: "Vietnamese" },
    { value: "indonesian", label: "Indonesian" },
    { value: "malay", label: "Malay" },
    { value: "tagalog", label: "Tagalog" },
    { value: "other", label: "Other" },
  ];

  const regions = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "canada", label: "Canada" },
    { value: "australia", label: "Australia" },
    { value: "new-zealand", label: "New Zealand" },
    { value: "south-africa", label: "South Africa" },
    { value: "mexico", label: "Mexico" },
    { value: "spain", label: "Spain" },
    { value: "argentina", label: "Argentina" },
    { value: "colombia", label: "Colombia" },
    { value: "peru", label: "Peru" },
    { value: "chile", label: "Chile" },
    { value: "brazil", label: "Brazil" },
    { value: "france", label: "France" },
    { value: "belgium", label: "Belgium" },
    { value: "switzerland", label: "Switzerland" },
    { value: "germany", label: "Germany" },
    { value: "austria", label: "Austria" },
    { value: "italy", label: "Italy" },
    { value: "netherlands", label: "Netherlands" },
    { value: "portugal", label: "Portugal" },
    { value: "poland", label: "Poland" },
    { value: "czech-republic", label: "Czech Republic" },
    { value: "hungary", label: "Hungary" },
    { value: "romania", label: "Romania" },
    { value: "bulgaria", label: "Bulgaria" },
    { value: "croatia", label: "Croatia" },
    { value: "serbia", label: "Serbia" },
    { value: "slovenia", label: "Slovenia" },
    { value: "slovakia", label: "Slovakia" },
    { value: "ukraine", label: "Ukraine" },
    { value: "russia", label: "Russia" },
    { value: "greece", label: "Greece" },
    { value: "turkey", label: "Turkey" },
    { value: "israel", label: "Israel" },
    { value: "uae", label: "United Arab Emirates" },
    { value: "saudi-arabia", label: "Saudi Arabia" },
    { value: "egypt", label: "Egypt" },
    { value: "morocco", label: "Morocco" },
    { value: "china", label: "China" },
    { value: "hong-kong", label: "Hong Kong" },
    { value: "taiwan", label: "Taiwan" },
    { value: "japan", label: "Japan" },
    { value: "south-korea", label: "South Korea" },
    { value: "india", label: "India" },
    { value: "pakistan", label: "Pakistan" },
    { value: "bangladesh", label: "Bangladesh" },
    { value: "thailand", label: "Thailand" },
    { value: "vietnam", label: "Vietnam" },
    { value: "indonesia", label: "Indonesia" },
    { value: "malaysia", label: "Malaysia" },
    { value: "philippines", label: "Philippines" },
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

    if (!formData.language) {
      newErrors.language = "Please select a language";
    } else if (
      formData.language === "other" &&
      !formData.customLanguage.trim()
    ) {
      newErrors.customLanguage = "Please specify the language";
    }

    if (!formData.region) {
      newErrors.region = "Please select a region";
    } else if (formData.region === "other" && !formData.customRegion.trim()) {
      newErrors.customRegion = "Please specify the region";
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
      // Prepare the data for the API
      const requestData = {
        fullName: formData.fullName,
        email: formData.email,
        role: formData.role === "other" ? formData.customRole : formData.role,
        language:
          formData.language === "other"
            ? formData.customLanguage
            : formData.language,
        region:
          formData.region === "other" ? formData.customRegion : formData.region,
        additionalInfo: formData.additionalInfo,
        submittedAt: new Date().toISOString(),
      };

      // Make API call to the backend
      const response = await fetch(
        "https://matalkwebsitebe-production.up.railway.app/api/language-requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Language request submitted successfully:", result);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting language request:", error);
      // You might want to show an error message to the user here
      alert("Failed to submit language request. Please try again later.");
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
              Language Request Submitted! 🌍
            </h1>
            <p className="lead text-slate-600 mb-6">
              Thank you, <strong>{formData.fullName}</strong>! We've received
              your request for{" "}
              {formData.language === "other"
                ? formData.customLanguage
                : languages.find((l) => l.value === formData.language)
                    ?.label}{" "}
              support.
            </p>
            <div className="bg-purple-50/50 rounded-lg p-6 mb-8">
              <h3 className="h3 text-purple-800 mb-4">What happens next?</h3>
              <div className="text-left space-y-3 text-slate-600">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Our localization team will review your language request</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>We'll send you updates on development progress</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>You'll be notified when the language becomes available</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Early access will be provided to language contributors</p>
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
                <h2 className="h3 text-slate-900">Request Language Support</h2>
                <p className="text-slate-600">
                  Help us add your language to Verbali
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

            {/* Language */}
            <div className="space-y-2">
              <Label htmlFor="language" className="text-slate-700 font-medium">
                Language <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.language}
                onValueChange={(value) => {
                  handleInputChange("language", value);
                  if (value !== "other") {
                    handleInputChange("customLanguage", "");
                  }
                }}
              >
                <SelectTrigger
                  className={`bg-slate-50 border-slate-200 focus:bg-white focus:border-violet-500 transition-colors ${
                    errors.language
                      ? "border-red-300 focus:border-red-500 bg-red-50"
                      : ""
                  }`}
                >
                  <SelectValue placeholder="Select the language you need" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((language) => (
                    <SelectItem key={language.value} value={language.value}>
                      {language.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.language && (
                <p className="text-sm text-red-600">{errors.language}</p>
              )}

              {formData.language === "other" && (
                <div className="mt-3">
                  <Input
                    id="customLanguage"
                    type="text"
                    value={formData.customLanguage}
                    onChange={(e) =>
                      handleInputChange("customLanguage", e.target.value)
                    }
                    placeholder="Please specify the language..."
                    className={`bg-slate-50 border-slate-200 focus:bg-white focus:border-violet-500 transition-colors ${
                      errors.customLanguage
                        ? "border-red-300 focus:border-red-500 bg-red-50"
                        : ""
                    }`}
                  />
                  {errors.customLanguage && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.customLanguage}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Region */}
            <div className="space-y-2">
              <Label htmlFor="region" className="text-slate-700 font-medium">
                Region/Dialect <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.region}
                onValueChange={(value) => {
                  handleInputChange("region", value);
                  if (value !== "other") {
                    handleInputChange("customRegion", "");
                  }
                }}
              >
                <SelectTrigger
                  className={`bg-slate-50 border-slate-200 focus:bg-white focus:border-violet-500 transition-colors ${
                    errors.region
                      ? "border-red-300 focus:border-red-500 bg-red-50"
                      : ""
                  }`}
                >
                  <SelectValue placeholder="Select your region or dialect" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region.value} value={region.value}>
                      {region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.region && (
                <p className="text-sm text-red-600">{errors.region}</p>
              )}

              {formData.region === "other" && (
                <div className="mt-3">
                  <Input
                    id="customRegion"
                    type="text"
                    value={formData.customRegion}
                    onChange={(e) =>
                      handleInputChange("customRegion", e.target.value)
                    }
                    placeholder="Please specify your region or dialect..."
                    className={`bg-slate-50 border-slate-200 focus:bg-white focus:border-violet-500 transition-colors ${
                      errors.customRegion
                        ? "border-red-300 focus:border-red-500 bg-red-50"
                        : ""
                    }`}
                  />
                  {errors.customRegion && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.customRegion}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Additional Information */}
            <div className="space-y-2">
              <Label
                htmlFor="additionalInfo"
                className="text-slate-700 font-medium"
              >
                Additional Information (Optional)
              </Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) =>
                  handleInputChange("additionalInfo", e.target.value)
                }
                placeholder="Any additional context about your language needs, cultural considerations, or specific use cases that would help us prioritize this request?"
                rows={4}
                className="bg-slate-50 border-slate-200 focus:bg-white focus:border-violet-500 transition-colors resize-none"
              />
              <p className="text-sm text-slate-500">
                {formData.additionalInfo.length} characters
              </p>
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
                    Submit Language Request
                  </>
                )}
              </Button>
            </motion.div>
          </form>

          {/* Privacy Note */}
          <div className="mt-6 p-4 bg-blue-50/50 rounded-lg border border-blue-100">
            <p className="text-sm text-slate-600">
              <strong>Privacy Promise:</strong> Your language request and
              contact information will only be used for localization development
              and updates. We respect your privacy and will never share your
              details.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
