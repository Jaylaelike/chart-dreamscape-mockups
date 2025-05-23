
import { ReactNode } from "react";
import MonitoringCard from "./MonitoringCard";

interface StationSectionProps {
  title: string;
  children: ReactNode;
}

const StationSection = ({ title, children }: StationSectionProps) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-center bg-gray-800 py-2 rounded">
        {title}
      </h2>
      {children}
    </div>
  );
};

export default StationSection;
