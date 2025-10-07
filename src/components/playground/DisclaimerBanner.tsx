import React from "react";

const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <span className="text-yellow-400 text-xl">⚠️</span>
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            <strong>Demo Notice:</strong> This is a demonstration of MaTalk's
            AI-powered feelings communication technology. This playground is for
            educational and testing purposes only and is not a medical device.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerBanner;
