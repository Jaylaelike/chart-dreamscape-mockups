
import { Radio } from "lucide-react";

interface EmptyStationContentProps {
  name: string;
  location?: string;
}

const EmptyStationContent = ({ name, location }: EmptyStationContentProps) => {
  return (
    <div className="text-center py-20">
      <Radio className="w-16 h-16 mx-auto mb-4 text-blue-400" />
      <h3 className="text-xl font-bold mb-2">{name} {location && `- ${location}`}</h3>
      <p className="text-gray-400">Station monitoring data would appear here</p>
    </div>
  );
};

export default EmptyStationContent;
