
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StationData {
  id: string;
  name: string;
  location?: string;
  active: boolean;
}

interface StationTabsProps {
  stations: StationData[];
}

const StationTabs = ({ stations }: StationTabsProps) => {
  return (
    <div className="bg-gray-800 px-6 py-2">
      <TabsList className="bg-transparent gap-1">
        {stations.map((station) => (
          <TabsTrigger
            key={station.id}
            value={station.id}
            className={`px-4 py-2 text-sm font-medium rounded ${
              station.active 
                ? "bg-blue-600 text-white data-[state=active]:bg-blue-500" 
                : "bg-gray-600 text-gray-300"
            }`}
          >
            {station.name}
            {station.location && (
              <div className="text-xs">{station.location}</div>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
};

export default StationTabs;
