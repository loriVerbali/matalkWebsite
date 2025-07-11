import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/components/utils";

export default function AdminBlogPosts() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8">
        <Link
          to={createPageUrl("Home")}
          className="inline-flex items-center text-purple-600 hover:text-purple-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      <Alert>
        <AlertDescription>
          Admin functionality is currently unavailable. Blog management features
          have been disabled.
        </AlertDescription>
      </Alert>
    </div>
  );
}
