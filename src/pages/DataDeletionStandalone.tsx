import { Settings, Trash2, Shield } from "lucide-react";

export default function DataDeletionStandalone() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              How to Delete Your Data
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              We respect your privacy and make it easy to delete your personal
              data
            </p>
          </div>

          <div className="text-gray-700 space-y-8">
            <section className="space-y-4">
              <div className="bg-violet-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Shield className="w-6 h-6 text-violet-600 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Your Data, Your Control
                  </h2>
                </div>
                <p className="text-gray-700">
                  You have complete control over your personal data. When you
                  delete your account, all your personal information will be
                  permanently removed from our systems.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                How to Delete Your Account and Data
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Open the Ma-Talk AI App
                    </h3>
                    <p className="text-gray-700">
                      Launch the Ma-Talk AI application on your mobile device.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Settings className="w-5 h-5 text-gray-600 mr-2" />
                      <h3 className="text-lg font-medium text-gray-900">
                        Go to Settings
                      </h3>
                    </div>
                    <p className="text-gray-700">
                      Navigate to the Settings section within the app.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Scroll to the Bottom
                    </h3>
                    <p className="text-gray-700">
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
                      <h3 className="text-lg font-medium text-gray-900">
                        Press "Delete My Account"
                      </h3>
                    </div>
                    <p className="text-gray-700">
                      Tap the "Delete My Account" button to initiate the
                      deletion process.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                What Gets Deleted
              </h2>
              <p className="text-gray-700">
                When you delete your account, the following personal data will
                be permanently removed:
              </p>
              <ul className="space-y-2 text-gray-700 mt-4">
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">●</span>
                  <span>Your account information (name, email, password)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">●</span>
                  <span>Child's personal information (name, age group)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">●</span>
                  <span>All uploaded images and custom content</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">●</span>
                  <span>AAC cards and personalized phrases</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">●</span>
                  <span>Usage history and preferences</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">●</span>
                  <span>
                    All other personal data associated with your account
                  </span>
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                Important Notes
              </h2>
              <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">●</span>
                    <span>
                      <strong>This action is permanent:</strong> Once you delete
                      your account, your data cannot be recovered.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">●</span>
                    <span>
                      <strong>Subscription cancellation:</strong> Deleting your
                      account will also cancel any active subscriptions. Refunds
                      follow the policies of your app store (Apple App Store,
                      Google Play Store, etc.).
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">●</span>
                    <span>
                      <strong>Processing time:</strong> Your data will be
                      completely removed from our systems within 30 days of
                      account deletion.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                Need Help?
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  If you have any questions about deleting your data or need
                  assistance with the process, please don't hesitate to contact
                  us:
                </p>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:info@verbali.io"
                      className="text-violet-600 hover:text-violet-700 underline"
                    >
                      info@verbali.io
                    </a>
                  </p>
                  <p className="text-gray-700">
                    <strong>Subject line:</strong> Data Deletion Request
                  </p>
                </div>
                <p className="text-gray-700 mt-4 text-sm">
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
