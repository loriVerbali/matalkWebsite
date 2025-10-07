import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

interface VerbaliPrivacyPolicyProps {
  onBack: () => void;
}

export function VerbaliPrivacyPolicy({ onBack }: VerbaliPrivacyPolicyProps) {
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
              Verbali Website – Privacy Policy v1.0
            </h1>
            <p className="text-slate-600">Effective Date: July 9, 2025</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <p className="text-slate-700 mb-4">
                Verbali Inc. ("Verbali," "we," "our," or "us") respects your
                privacy. This Privacy Policy explains how we collect, use, and
                protect personal information on www.verbali.io (the "Site") and
                any pages that link to it.
              </p>
              <p className="text-slate-700 mb-4">
                By using the Site, you agree to this Policy. If you do not
                agree, please do not use the Site.
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

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-slate-300">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="border border-slate-300 p-3 text-left text-slate-900">
                        Category
                      </th>
                      <th className="border border-slate-300 p-3 text-left text-slate-900">
                        Examples
                      </th>
                      <th className="border border-slate-300 p-3 text-left text-slate-900">
                        Collected When
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 p-3 text-slate-700">
                        Information you provide
                      </td>
                      <td className="border border-slate-300 p-3 text-slate-700">
                        • Name, e-mail, company
                        <br />• Messages sent via contact forms
                        <br />• Newsletter sign-up details
                      </td>
                      <td className="border border-slate-300 p-3 text-slate-700">
                        You fill in a form or opt in to our mailing list
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-3 text-slate-700">
                        Usage data & device info
                      </td>
                      <td className="border border-slate-300 p-3 text-slate-700">
                        • IP address, browser type, OS
                        <br />• Pages viewed, time spent, referring URL
                      </td>
                      <td className="border border-slate-300 p-3 text-slate-700">
                        Automatically via cookies / pixels
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-3 text-slate-700">
                        Cookies & similar tech
                      </td>
                      <td className="border border-slate-300 p-3 text-slate-700">
                        • Session cookies (necessary)
                        <br />• Analytics cookies (optional)
                      </td>
                      <td className="border border-slate-300 p-3 text-slate-700">
                        Stored on your browser (see Section 4)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-slate-700 mb-4">
                The Site is informative and does not collect payment
                information. If you purchase a Matalk AI subscription, see the
                in-app policy.
              </p>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">
                2. How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>
                  Provide the Site and respond to inquiries (contractual
                  necessity).
                </li>
                <li>
                  Improve content and performance through aggregated analytics
                  (legitimate interest).
                </li>
                <li>
                  Send newsletters or product updates when you opt in (consent).
                </li>
                <li>
                  Comply with legal obligations and protect against fraud or
                  misuse.
                </li>
              </ul>
              <p className="text-slate-700 mb-4">
                We do not sell or rent your personal information, nor use it for
                behavioral advertising.
              </p>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">
                3. What Counts as Personal Information?
              </h2>
              <p className="text-slate-700 mb-4">
                Any data that identifies or can reasonably be linked to you or
                your household—such as your name, e-mail, IP address, or cookie
                ID—is personal information. Aggregate or anonymized data is not
                personal information.
              </p>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">
                4. Cookies & Similar Technologies
              </h2>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-slate-300">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="border border-slate-300 p-3 text-left text-slate-900">
                        Type
                      </th>
                      <th className="border border-slate-300 p-3 text-left text-slate-900">
                        Purpose
                      </th>
                      <th className="border border-slate-300 p-3 text-left text-slate-900">
                        Opt-out
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 p-3 text-slate-700">
                        Essential cookies
                      </td>
                      <td className="border border-slate-300 p-3 text-slate-700">
                        Site security, basic functionality
                      </td>
                      <td className="border border-slate-300 p-3 text-slate-700">
                        Cannot be disabled
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-3 text-slate-700">
                        Analytics cookies
                      </td>
                      <td className="border border-slate-300 p-3 text-slate-700">
                        Understand traffic patterns (e.g., Google Analytics with
                        IP anonymization)
                      </td>
                      <td className="border border-slate-300 p-3 text-slate-700">
                        Banner opt-in / browser settings
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-3 text-slate-700">
                        E-mail pixel
                      </td>
                      <td className="border border-slate-300 p-3 text-slate-700">
                        Track newsletter opens (only for subscribers)
                      </td>
                      <td className="border border-slate-300 p-3 text-slate-700">
                        Unsubscribe link in every e-mail
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-slate-700 mb-4">
                You can manage non-essential cookies via our banner or browser
                controls.
              </p>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">
                5. Service Providers (Categories Only)
              </h2>
              <p className="text-slate-700 mb-4">
                We share data with trusted vendors that:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>Host our website and databases</li>
                <li>Provide aggregated analytics</li>
                <li>Power e-mail newsletters</li>
              </ul>
              <p className="text-slate-700 mb-4">
                All vendors are contractually bound to use your data solely to
                serve Verbali and to apply appropriate security measures.
              </p>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">6. Data Retention</h2>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-slate-300">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="border border-slate-300 p-3 text-left text-slate-900">
                        Data
                      </th>
                      <th className="border border-slate-300 p-3 text-left text-slate-900">
                        Retention Period
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 p-3 text-slate-700">
                        Contact-form submissions
                      </td>
                      <td className="border border-slate-300 p-3 text-slate-700">
                        1 year from last interaction
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-3 text-slate-700">
                        Marketing subscription data
                      </td>
                      <td className="border border-slate-300 p-3 text-slate-700">
                        Until you unsubscribe + 30 days
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-3 text-slate-700">
                        Server logs & analytics
                      </td>
                      <td className="border border-slate-300 p-3 text-slate-700">
                        12 months, then aggregated or deleted
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">7. Security Measures</h2>
              <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
                <li>TLS 1.2+ encryption for data in transit</li>
                <li>Firewalls and access controls on hosting environment</li>
                <li>Regular security patching and vulnerability scans</li>
              </ul>
              <p className="text-slate-700 mb-4">
                If a data breach affects your information, we will notify you
                and regulators within 72 hours as required.
              </p>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">8. Your Privacy Rights</h2>

              <h3 className="h3 text-slate-900 mb-3">
                California Residents (CCPA/CPRA)
              </h3>
              <p className="text-slate-700 mb-4">
                You may request to know, delete, correct, or limit use of any
                Sensitive PI we hold (we collect none by default). We do not
                sell or share personal information. We will not discriminate if
                you exercise your rights.
              </p>

              <h3 className="h3 text-slate-900 mb-3">Canada (PIPEDA)</h3>
              <p className="text-slate-700 mb-4">
                Canadian users may access, correct, or withdraw consent for
                their information at any time. Withdrawing consent may limit the
                services we can provide.
              </p>

              <p className="text-slate-700 mb-4">
                <strong>How to exercise rights:</strong> E-mail info@verbali.io.
                We will verify your request and respond within statutory
                timelines.
              </p>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">
                9. International Transfers
              </h2>
              <p className="text-slate-700 mb-4">
                Our servers are in the United States. By using the Site, you
                consent to your data being transferred and processed in the U.S.
                under protective contracts consistent with PIPEDA and CCPA.
              </p>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">
                10. Changes to This Policy
              </h2>
              <p className="text-slate-700 mb-4">
                We may update this Policy periodically. Material changes will
                appear on this page and, where appropriate, you'll receive
                additional notice. Archived versions are available on request.
              </p>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">11. Contact Us</h2>
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
                  <strong>Privacy requests:</strong> info@verbali.io
                </p>
              </div>
              <p className="text-slate-700 mt-4">
                Thank you for visiting Verbali.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
