import { useQuery } from "@tanstack/react-query";
import StationSection from "./StationSection";
import MainStationsContent from "./MainStationsContent";
import AdditionStationsContent from "./AdditionStationsContent";

interface EngineeringCenterContentProps {
  engineeringCenter: string;
}

interface StationData {
  Engineering_center: string;
  Station_Type: string;
  // ... other fields not needed for count queries
}

interface ApiResponse {
  orders: StationData[];
}

const EngineeringCenterContent = ({ engineeringCenter }: EngineeringCenterContentProps) => {
  // Query to get station counts for this engineering center
  const { data: stationCounts } = useQuery({
    queryKey: ["stationCounts", engineeringCenter],
    queryFn: async () => {
      const response = await fetch(
        import.meta.env.VITE_SERVER_URL + "api/cisco_sw_join_eng_center"
      );
      const data: ApiResponse = await response.json();
      
      // Filter by Engineering Center
      const engineeringCenterStations = data.orders.filter(
        (station) => station.Engineering_center === engineeringCenter
      );
      
      // Count Main and Addition stations
      const mainStations = engineeringCenterStations.filter(
        (station) => station.Station_Type === "M"
      );
      const additionStations = engineeringCenterStations.filter(
        (station) => station.Station_Type !== "M"
      );
      
      return {
        mainCount: mainStations.length,
        additionCount: additionStations.length,
        totalCount: engineeringCenterStations.length
      };
    },
    refetchInterval: 600000 , // Refetch every 10 minutes
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const mainCount = stationCounts?.mainCount || 0;
  const additionCount = stationCounts?.additionCount || 0;

  return (
    <div className="space-y-4">
      {/* Main Stations Section */}
      {mainCount > 0 && (
        <StationSection title={`${mainCount} Main Stations`}>
          <MainStationsContent engineeringCenter={engineeringCenter} />
        </StationSection>
      )}

      {/* Addition Stations Section */}
      {additionCount > 0 && (
        <StationSection title={`${additionCount} Addition Stations`}>
          <AdditionStationsContent engineeringCenter={engineeringCenter} />
        </StationSection>
      )}

      {/* Empty state if no stations */}
      {mainCount === 0 && additionCount === 0 && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-400 mb-2">
              No stations found
            </h3>
            <p className="text-sm text-gray-500">
              No stations are available for {engineeringCenter} engineering center.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EngineeringCenterContent;
