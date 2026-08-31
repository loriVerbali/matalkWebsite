import { useNavigate } from "react-router-dom";
import { ScheduleDemoModal } from "../components/ScheduleDemoModal";

const logoImage = "/images/verbiPose.png";

/**
 * Shareable landing page for the demo form (/ScheduleVerbaliDemo). Renders the same
 * modal used on the pricing page, already open; closing it sends the visitor
 * to the homepage instead of leaving them on an empty backdrop.
 */
export default function ScheduleVerbaliDemo() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50">
      <div className="flex justify-center pt-10">
        <img src={logoImage} alt="Verbali Logo" className="h-16 w-auto" />
      </div>
      <ScheduleDemoModal isOpen onClose={() => navigate("/")} />
    </div>
  );
}
