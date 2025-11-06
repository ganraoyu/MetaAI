import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export const BackButton = () => (
  <div className="flex flex-col mb-2">
    <Link to="/data/items">
      <button className="flex items-center gap-1 underline hover:no-underline">
        <FaChevronLeft className="h-3 w-3" />
        <p className="text-[0.8rem]">Back to Items</p>
      </button>
    </Link>
  </div>
);
