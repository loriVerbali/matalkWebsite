declare module "*.json" {
  const value: any;
  export default value;
}

// Add specific type for testimonials data
declare module "*/testimonials-data.json" {
  import { Testimonial } from "../components/testimonials-types";
  const value: Testimonial[];
  export default value;
}
