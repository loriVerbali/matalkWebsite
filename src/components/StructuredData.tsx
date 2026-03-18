import { useEffect } from "react";

interface StructuredDataProps {
  data: object;
}

/**
 * Component to inject JSON-LD structured data into the document <head>.
 * This helps search engines understand the content and structure of the page.
 */
export function StructuredData({ data }: StructuredDataProps) {
  useEffect(() => {
    // Create the script element
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    
    // Append to head
    document.head.appendChild(script);

    // Cleanup: remove the script tag when the component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, [data]);

  return null; // This component doesn't render anything to the DOM
}
