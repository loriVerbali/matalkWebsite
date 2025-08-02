import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

interface TermsOfUseProps {
  onBack: () => void;
}

export function TermsOfUse({ onBack }: TermsOfUseProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {/* Header */}
          <div className="mb-8">
            <Button
              onClick={onBack}
              variant="ghost"
              className="mb-6 -ml-4 text-slate-600 hover:text-violet-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="h1 text-slate-900 mb-4">Terms of Use</h1>
            <p className="text-slate-600">Last updated: January 26, 2025</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="h2 text-slate-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-slate-700 mb-4">
                Welcome to Verbali, an AI-powered Augmentative and Alternative Communication (AAC) platform. By accessing or using Verbali's services, including our website, mobile applications, and related services (collectively, the "Service"), you agree to be bound by these Terms of Use ("Terms").
              </p>
              <p className="text-slate-700 mb-4">
                If you do not agree to these Terms, you may not access or use our Service. These Terms apply to all users, including individuals, parents, caregivers, healthcare professionals, educators, and organizations.
              </p>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">2. Description of Service</h2>
              <p className="text-slate-700 mb-4">
                Verbali provides an AI-powered communication platform designed to support individuals with diverse communication needs. Our services include:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>AI-assisted communication tools and interfaces</li>
                <li>Personalized communication symbol systems</li>
                <li>Speech-to-text and text-to-speech functionality</li>
                <li>Predictive text and communication suggestions</li>
                <li>Multi-modal communication support</li>
                <li>Progress tracking and analytics</li>
                <li>Educational resources and support materials</li>
              </ul>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">3. User Accounts and Registration</h2>
              <h3 className="h3 text-slate-900 mb-3">3.1 Account Creation</h3>
              <p className="text-slate-700 mb-4">
                To access certain features of the Service, you must create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Promptly update account information as needed</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>

              <h3 className="h3 text-slate-900 mb-3">3.2 Minors and Supervised Accounts</h3>
              <p className="text-slate-700 mb-4">
                Accounts for users under 18 years of age must be created and supervised by a parent, legal guardian, or authorized caregiver who accepts responsibility for the minor's use of the Service.
              </p>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">4. Acceptable Use Policy</h2>
              <h3 className="h3 text-slate-900 mb-3">4.1 Permitted Uses</h3>
              <p className="text-slate-700 mb-4">
                You may use the Service for lawful communication and educational purposes, including:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>Supporting individual communication needs and goals</li>
                <li>Educational and therapeutic activities</li>
                <li>Research and academic purposes (with proper permissions)</li>
                <li>Personal, family, and professional communication</li>
              </ul>

              <h3 className="h3 text-slate-900 mb-3">4.2 Prohibited Uses</h3>
              <p className="text-slate-700 mb-4">
                You agree not to use the Service to:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>Violate any local, state, national, or international law</li>
                <li>Transmit harmful, offensive, or inappropriate content</li>
                <li>Impersonate others or provide false identification</li>
                <li>Interfere with or disrupt the Service or its security features</li>
                <li>Attempt to reverse engineer or extract proprietary algorithms</li>
                <li>Use automated tools to access the Service without permission</li>
                <li>Share account credentials with unauthorized individuals</li>
              </ul>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">5. Intellectual Property Rights</h2>
              <h3 className="h3 text-slate-900 mb-3">5.1 Verbali's Intellectual Property</h3>
              <p className="text-slate-700 mb-4">
                The Service, including its AI algorithms, user interface, content, and technology, is protected by intellectual property laws. Verbali retains all rights to:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>Ma-Talk AI technology and algorithms</li>
                <li>Software, applications, and user interfaces</li>
                <li>Trademarks, logos, and brand elements</li>
                <li>Original content and educational materials</li>
              </ul>

              <h3 className="h3 text-slate-900 mb-3">5.2 User Content</h3>
              <p className="text-slate-700 mb-4">
                You retain ownership of content you create using the Service. By using Verbali, you grant us a limited license to:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>Process your content to provide the Service</li>
                <li>Use anonymized data to improve AI algorithms</li>
                <li>Display your content within the Service interface</li>
                <li>Backup and secure your content</li>
              </ul>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">6. Privacy and Data Protection</h2>
              <p className="text-slate-700 mb-4">
                Your privacy is important to us. Our data collection, use, and protection practices are governed by our Privacy Policy, which is incorporated into these Terms by reference. Key privacy commitments include:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>Transparent data collection and use practices</li>
                <li>Strong security measures to protect your information</li>
                <li>User control over personal data and privacy settings</li>
                <li>Compliance with applicable privacy laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">7. Payment Terms</h2>
              <h3 className="h3 text-slate-900 mb-3">7.1 Subscription Plans</h3>
              <p className="text-slate-700 mb-4">
                Verbali offers various subscription plans with different features and pricing. By subscribing, you agree to:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>Pay all applicable fees as described in your chosen plan</li>
                <li>Automatic renewal unless cancelled according to our cancellation policy</li>
                <li>Responsibility for all charges incurred under your account</li>
              </ul>

              <h3 className="h3 text-slate-900 mb-3">7.2 Refunds and Cancellations</h3>
              <p className="text-slate-700 mb-4">
                Refund eligibility and cancellation procedures are detailed in our separate Billing and Refund Policy, available on our website.
              </p>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">8. AI and Technology Disclaimers</h2>
              <h3 className="h3 text-slate-900 mb-3">8.1 AI Limitations</h3>
              <p className="text-slate-700 mb-4">
                While Ma-Talk AI is designed to assist communication, you acknowledge that:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>AI suggestions may not always be accurate or appropriate</li>
                <li>The technology is continuously improving but not infallible</li>
                <li>Human judgment should always be used in communication decisions</li>
                <li>Emergency situations require immediate human intervention</li>
              </ul>

              <h3 className="h3 text-slate-900 mb-3">8.2 Medical and Educational Disclaimer</h3>
              <p className="text-slate-700 mb-4">
                Verbali is a communication tool and is not intended to:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>Replace professional medical or therapeutic advice</li>
                <li>Diagnose or treat medical conditions</li>
                <li>Substitute for qualified educational or therapeutic services</li>
                <li>Provide emergency communication capabilities</li>
              </ul>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">9. Service Availability and Modifications</h2>
              <p className="text-slate-700 mb-4">
                Verbali strives to provide consistent service availability, but we reserve the right to:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>Modify, update, or discontinue features with reasonable notice</li>
                <li>Perform maintenance that may temporarily interrupt service</li>
                <li>Update these Terms as necessary for legal or operational reasons</li>
                <li>Suspend accounts that violate these Terms</li>
              </ul>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">10. Limitation of Liability</h2>
              <p className="text-slate-700 mb-4">
                To the fullest extent permitted by law, Verbali and its affiliates shall not be liable for:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>Indirect, incidental, special, or consequential damages</li>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Service interruptions or technical failures</li>
                <li>Third-party actions or content</li>
                <li>Decisions made based on AI suggestions</li>
              </ul>
              <p className="text-slate-700 mb-4">
                Our total liability for any claim shall not exceed the amount paid by you for the Service in the preceding 12 months.
              </p>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">11. Indemnification</h2>
              <p className="text-slate-700 mb-4">
                You agree to indemnify and hold harmless Verbali from any claims, damages, or expenses arising from:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>Your use of the Service in violation of these Terms</li>
                <li>Content you create or share through the Service</li>
                <li>Your violation of any third-party rights</li>
                <li>Negligent or wrongful conduct related to your use of the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">12. Dispute Resolution</h2>
              <h3 className="h3 text-slate-900 mb-3">12.1 Informal Resolution</h3>
              <p className="text-slate-700 mb-4">
                Before pursuing formal legal action, we encourage users to contact our support team to resolve disputes informally.
              </p>

              <h3 className="h3 text-slate-900 mb-3">12.2 Binding Arbitration</h3>
              <p className="text-slate-700 mb-4">
                Any disputes that cannot be resolved informally shall be settled through binding arbitration in accordance with the rules of the American Arbitration Association, except where prohibited by law.
              </p>

              <h3 className="h3 text-slate-900 mb-3">12.3 Class Action Waiver</h3>
              <p className="text-slate-700 mb-4">
                You agree to resolve disputes individually and waive the right to participate in class actions or collective proceedings.
              </p>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">13. Governing Law</h2>
              <p className="text-slate-700 mb-4">
                These Terms are governed by the laws of the State of California, United States, without regard to conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">14. Changes to Terms</h2>
              <p className="text-slate-700 mb-4">
                We may update these Terms from time to time. We will notify users of material changes through:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>Email notifications to registered users</li>
                <li>Prominent notices on our website and applications</li>
                <li>In-app notifications for significant changes</li>
              </ul>
              <p className="text-slate-700 mb-4">
                Continued use of the Service after changes become effective constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">15. Termination</h2>
              <p className="text-slate-700 mb-4">
                Either party may terminate the agreement at any time:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>Users may delete their accounts and discontinue use</li>
                <li>Verbali may suspend or terminate accounts for Terms violations</li>
                <li>Upon termination, certain provisions (privacy, intellectual property, indemnification) remain in effect</li>
                <li>Users may request data export before account deletion</li>
              </ul>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">16. Contact Information</h2>
              <p className="text-slate-700 mb-4">
                For questions about these Terms of Use, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-slate-700 mb-2"><strong>Email:</strong> legal@verbali.com</p>
                <p className="text-slate-700 mb-2"><strong>Support:</strong> support@verbali.com</p>
                <p className="text-slate-700 mb-2"><strong>Mail:</strong> Verbali Legal Department</p>
                <p className="text-slate-700 mb-2">123 Communication Drive</p>
                <p className="text-slate-700 mb-2">Tech Valley, CA 94000</p>
                <p className="text-slate-700"><strong>Phone:</strong> +1 (555) 123-4567</p>
              </div>
            </section>

            <section className="bg-blue-50 rounded-lg p-6">
              <h2 className="h2 text-slate-900 mb-4">Accessibility Commitment</h2>
              <p className="text-slate-700">
                Verbali is committed to making our services accessible to all users. If you encounter accessibility barriers or need assistance with these Terms, please contact our accessibility team at accessibility@verbali.com. We will work to provide alternative formats and reasonable accommodations as needed.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}