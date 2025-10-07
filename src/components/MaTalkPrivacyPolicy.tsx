import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

interface MaTalkPrivacyPolicyProps {
  onBack: () => void;
}

export function MaTalkPrivacyPolicy({ onBack }: MaTalkPrivacyPolicyProps) {
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
            <h1 className="h1 text-slate-900 mb-4">
              Matalk AI – Privacy Policy v1.0
            </h1>
            <p className="text-slate-600">Effective Date: July 9, 2025</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <p className="text-slate-700 mb-4">
                Thank you for using Matalk AI, an app by Verbali Inc.
                ("Verbali," "we," "our," or "us"). This Privacy Policy describes
                how we collect, use, and protect your personal information when
                you use the Matalk AI mobile application ("App") and related
                services.
              </p>
              <p className="text-slate-700 mb-4">
                By using Matalk AI, you agree to this policy. If you do not
                agree, please do not use the App.
              </p>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">
                1. Information We Collect
              </h2>
              <p className="text-slate-700 mb-4">
                <strong>California Notice at Collection:</strong> We collect the
                categories of personal information described below for the
                purposes stated in Section 2.
              </p>
              <p className="text-slate-700 mb-4">
                We collect only the minimum data needed to provide and improve
                the Matalk AI experience.
              </p>

              <h3 className="h3 text-slate-900 mb-3">
                A. Information You Provide
              </h3>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>Parent/guardian name</li>
                <li>Email address or Google account</li>
                <li>Password</li>
                <li>Child's age group (optional, used for personalization)</li>
                <li>Child's first name (optional, used for personalization)</li>
              </ul>

              <h3 className="h3 text-slate-900 mb-3">
                B. User-Generated Content
              </h3>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>Images created or uploaded for AAC cards</li>
                <li>Text labels or custom phrases</li>
              </ul>

              <h3 className="h3 text-slate-900 mb-3">C. Usage Data</h3>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>Device type and OS version</li>
                <li>IP address</li>
                <li>In-app activity (e.g., screen views, time spent)</li>
              </ul>

              <h3 className="h3 text-slate-900 mb-3">D. Audio Data</h3>
              <p className="text-slate-700 mb-4">
                We process ambient speech by streaming it securely to a
                third-party speech-to-text provider (e.g., OpenAI). Audio is not
                stored, and we do not retain voice recordings.
              </p>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-slate-700 mb-4">We use your data to:</p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>
                  Provide and maintain the service (contractual necessity)
                </li>
                <li>Personalize the app experience (with your consent)</li>
                <li>
                  Process text, image, and speech input via third-party AI tools
                  solely to deliver in-app content. These providers are
                  contractually forbidden from using your data to train their
                  models.
                </li>
                <li>
                  Respond to support inquiries and prevent abuse (legitimate
                  interest)
                </li>
                <li>Comply with legal obligations and protect user safety</li>
              </ul>
              <p className="text-slate-700 mb-4">
                We do not sell or rent your personal data. We do not use it for
                advertising or behavioral tracking.
              </p>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">
                3. What Is Personal Information?
              </h2>
              <p className="text-slate-700 mb-4">
                "Personal information" means any information that identifies,
                relates to, or could reasonably be linked with you or your
                household. This includes:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>Names, emails, and login credentials</li>
                <li>Child's age group</li>
                <li>IP address and device identifiers</li>
                <li>Uploaded images or text tied to an account</li>
                <li>Transcribed speech tied to user profiles</li>
              </ul>
              <p className="text-slate-700 mb-4">
                It does not include aggregated or anonymized information that
                cannot be re-linked to a specific individual.
              </p>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">
                4. Subscriptions & Payments
              </h2>
              <p className="text-slate-700 mb-4">
                Matalk AI is a subscription-based app. Payment is processed by
                Apple, Google, or Amazon; we never store your credit card data.
                Refunds follow the policies of the store where you purchased
                your subscription.
              </p>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">
                5. Children's Privacy – COPPA Compliance
              </h2>
              <p className="text-slate-700 mb-4">
                Matalk AI is designed to support communication for children
                under 13, but it is intended to be used under adult supervision.
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>
                  We obtain verifiable parental consent through a combination of
                  required payment and adult account creation.
                </li>
                <li>Children cannot use the app independently.</li>
                <li>
                  Parents can review, update, or delete their child's data by
                  contacting us (see Section 12).
                </li>
                <li>
                  If we discover data was collected without proper consent, we
                  will delete it immediately.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">
                6. Data Sharing with Service Providers
              </h2>
              <p className="text-slate-700 mb-4">
                We may share data with trusted service providers that support
                the core operation of the App. These include services for:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>Cloud hosting and storage</li>
                <li>Speech and image processing</li>
                <li>Product analytics (non-identifiable aggregates only)</li>
              </ul>
              <p className="text-slate-700 mb-4">
                All service providers are contractually required to handle your
                data securely and may only use it to deliver services to us. We
                do not allow them to use your data for their own purposes,
                including training AI models.
              </p>
              <div className="bg-blue-50 rounded-lg p-6">
                <p className="text-slate-700">
                  <strong>💬 Why we don't name specific vendors:</strong> We
                  work with a small set of reputable providers, but reserve the
                  right to change partners to improve service quality and
                  security. If we make a material change in how your data is
                  handled, we'll notify you in advance.
                </p>
              </div>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">
                7. Data Retention & Deletion
              </h2>
              <p className="text-slate-700 mb-4">
                We retain data only as long as needed to provide the service or
                comply with legal obligations:
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-slate-300">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="border border-slate-300 p-3 text-left text-slate-900">
                        Data Type
                      </th>
                      <th className="border border-slate-300 p-3 text-left text-slate-900">
                        Retention Period
                      </th>
                      <th className="border border-slate-300 p-3 text-left text-slate-900">
                        After That
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 p-3 text-slate-700">
                        Account info & content
                      </td>
                      <td className="border border-slate-300 p-3 text-slate-700">
                        30 days after account deletion/inactivity
                      </td>
                      <td className="border border-slate-300 p-3 text-slate-700">
                        Deleted or anonymized
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-3 text-slate-700">
                        Usage logs
                      </td>
                      <td className="border border-slate-300 p-3 text-slate-700">
                        30 days after account deletion
                      </td>
                      <td className="border border-slate-300 p-3 text-slate-700">
                        Deleted
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-3 text-slate-700">
                        Transcription results
                      </td>
                      <td className="border border-slate-300 p-3 text-slate-700">
                        Temporary (not stored)
                      </td>
                      <td className="border border-slate-300 p-3 text-slate-700">
                        Not retained
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-slate-700 mb-4">
                You may request deletion sooner at any time (see Section 12).
              </p>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">8. Security Measures</h2>
              <p className="text-slate-700 mb-4">
                We use technical and organizational safeguards to protect your
                data, including:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>
                  End-to-end encryption (TLS 1.2+) and encryption at rest
                  (AES-256)
                </li>
                <li>Multi-factor authentication for internal access</li>
                <li>Access logging and role-based controls</li>
              </ul>
              <p className="text-slate-700 mb-4">
                In the event of a data breach, we will notify affected users and
                regulators within 72 hours as required by law.
              </p>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">9. Your Privacy Rights</h2>

              <h3 className="h3 text-slate-900 mb-3">
                California Residents (CCPA/CPRA)
              </h3>
              <p className="text-slate-700 mb-4">
                If you live in California, you have the right to:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>Know what personal information we collect</li>
                <li>Access or request deletion of your data</li>
                <li>Correct inaccurate personal information</li>
                <li>
                  Limit use of sensitive personal data (e.g., child's age group)
                </li>
                <li>
                  Be free from discrimination for exercising any of these rights
                </li>
              </ul>
              <p className="text-slate-700 mb-4">
                We do not sell or share your personal information for
                advertising purposes.
              </p>
              <p className="text-slate-700 mb-4">
                To exercise your rights, email: info@verbali.io. We will respond
                within 45 days.
              </p>

              <h3 className="h3 text-slate-900 mb-3">Canada (PIPEDA)</h3>
              <p className="text-slate-700 mb-4">Canadian users may:</p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>Access or correct their information</li>
                <li>Withdraw consent at any time</li>
                <li>Request deletion</li>
                <li>
                  File a complaint with the Office of the Privacy Commissioner
                  of Canada
                </li>
              </ul>
              <p className="text-slate-700 mb-4">
                Withdrawing consent may limit your ability to use the app.
              </p>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">10. International Use</h2>
              <p className="text-slate-700 mb-4">
                Matalk AI is operated from the United States. If you access the
                app from outside the U.S. or Canada, your data may be
                transferred to servers in the U.S., where it is subject to U.S.
                law.
              </p>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">
                11. Changes to This Policy
              </h2>
              <p className="text-slate-700 mb-4">
                We may update this Privacy Policy periodically. You'll be
                notified in-app or via email before any material change takes
                effect. Archived versions are available upon request.
              </p>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">12. Contact Us</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-slate-700 mb-2">
                  <strong>Verbali Inc.</strong>
                </p>
                <p className="text-slate-700 mb-2">
                  12345 Parklawn Drive, Suite 200
                </p>
                <p className="text-slate-700 mb-2">Rockville, MD 20852, USA</p>
                <p className="text-slate-700 mb-2">
                  <strong>General inquiries:</strong> info@verbali.io
                </p>
                <p className="text-slate-700">
                  <strong>Privacy inquiries or data requests:</strong>{" "}
                  info@verbali.io
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
