
import { ReactNode } from "react";

interface StationSectionProps {
  title: string;
  children: ReactNode;
}

const StationSection = ({ title, children }: StationSectionProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4 text-center bg-gray-800 py-2 rounded shadow-md">
        {title}
      </h2>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default StationSection;
