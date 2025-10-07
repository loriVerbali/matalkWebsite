import { ArrowLeft, Settings, Trash2, Shield } from "lucide-react";
import { Button } from "./ui/button";

interface DataDeletionProps {
  onBack: () => void;
}

export function DataDeletion({ onBack }: DataDeletionProps) {
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
            <h1 className="h1 text-slate-900 mb-4">How to Delete Your Data</h1>
            <p className="text-slate-600">
              We respect your privacy and make it easy to delete your personal
              data
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <div className="bg-violet-50 rounded-lg p-6 mb-8">
                <div className="flex items-center mb-4">
                  <Shield className="w-6 h-6 text-violet-600 mr-3" />
                  <h2 className="h2 text-slate-900 mb-0">
                    Your Data, Your Control
                  </h2>
                </div>
                <p className="text-slate-700">
                  You have complete control over your personal data. When you
                  delete your account, all your personal information will be
                  permanently removed from our systems.
                </p>
              </div>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-6">
                How to Delete Your Account and Data
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="h3 text-slate-900 mb-2">
                      Open the Matalk AI App
                    </h3>
                    <p className="text-slate-700">
                      Launch the Matalk AI application on your mobile device.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Settings className="w-5 h-5 text-slate-600 mr-2" />
                      <h3 className="h3 text-slate-900 mb-0">Go to Settings</h3>
                    </div>
                    <p className="text-slate-700">
                      Navigate to the Settings section within the app.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="h3 text-slate-900 mb-2">
                      Scroll to the Bottom
                    </h3>
                    <p className="text-slate-700">
                      Scroll down to the bottom of the Settings page to find the
                      account deletion option.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-semibold">
                    4
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Trash2 className="w-5 h-5 text-red-600 mr-2" />
                      <h3 className="h3 text-slate-900 mb-0">
                        Press "Delete My Account"
                      </h3>
                    </div>
                    <p className="text-slate-700">
                      Tap the "Delete My Account" button to initiate the
                      deletion process.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">What Gets Deleted</h2>
              <p className="text-slate-700 mb-4">
                When you delete your account, the following personal data will
                be permanently removed:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-6 space-y-2">
                <li>Your account information (name, email, password)</li>
                <li>
                  Local personalized phrases and images - these are stored on
                  your device and are not uploaded to our servers
                </li>
                <li>
                  The AI assistant that was used to generate the personalized
                  answers - the AI assistant does not store any data and does
                  not use the information for training or improving the
                  assistant.
                </li>
                <li>
                  All other personal data associated with your account - this
                  includes your name, email.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">Important Notes</h2>
              <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
                <ul className="list-disc pl-6 text-slate-700 space-y-2">
                  <li>
                    <strong>This action is permanent:</strong> Once you delete
                    your account, your data cannot be recovered.
                  </li>
                  <li>
                    <strong>Processing time:</strong> Your data will be
                    completely removed from our systems within 30 days of
                    account deletion.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="h2 text-slate-900 mb-4">Need Help?</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-slate-700 mb-4">
                  If you have any questions about deleting your data or need
                  assistance with the process, please don't hesitate to contact
                  us:
                </p>
                <div className="space-y-2">
                  <p className="text-slate-700">
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:info@verbali.io"
                      className="text-violet-600 hover:text-violet-700 underline"
                    >
                      info@verbali.io
                    </a>
                  </p>
                  <p className="text-slate-700">
                    <strong>Subject line:</strong> Data Deletion Request
                  </p>
                </div>
                <p className="text-slate-700 mt-4 text-sm">
                  We typically respond to data deletion inquiries within 24-48
                  hours.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
