import { useQuery } from "@tanstack/react-query";

interface StationData {
  Engineering_center: string;
  Station_Type: string;
  Station_Thai: string;
  Facility: string;
}

interface ApiResponse {
  orders: StationData[];
}

export interface EngineeringCenter {
  id: string;
  name: string;
  location: string;
  mainCount: number;
  additionCount: number;
  totalCount: number;
  active: boolean;
}

export const useEngineeringCenters = () => {
  return useQuery({
    queryKey: ["engineeringCenters"],
    queryFn: async (): Promise<EngineeringCenter[]> => {
      const response = await fetch(
        import.meta.env.VITE_SERVER_URL + "api/cisco_sw_join_eng_center"
      );
      const data: ApiResponse = await response.json();
      
      // Group stations by Engineering Center
      const engineeringCenterMap = new Map<string, {
        mainCount: number;
        additionCount: number;
        stations: StationData[];
      }>();
      
      data.orders.forEach((station) => {
        const center = station.Engineering_center;
        if (!center) return; // Skip stations without engineering center
        
        if (!engineeringCenterMap.has(center)) {
          engineeringCenterMap.set(center, {
            mainCount: 0,
            additionCount: 0,
            stations: []
          });
        }
        
        const centerData = engineeringCenterMap.get(center)!;
        centerData.stations.push(station);
        
        if (station.Station_Type === "M") {
          centerData.mainCount++;
        } else {
          centerData.additionCount++;
        }
      });
      
      // Convert to array and add metadata
      const engineeringCenters: EngineeringCenter[] = Array.from(engineeringCenterMap.entries())
        .map(([centerName, data]) => {
          // Extract location from first station's facility or use center name
          const location = data.stations[0]?.Facility || centerName;
          
          return {
            id: centerName.toLowerCase().replace(/\s+/g, "-"),
            name: centerName,
            location: location,
            mainCount: data.mainCount,
            additionCount: data.additionCount,
            totalCount: data.mainCount + data.additionCount,
            active: true
          };
        })
        .filter(center => center.totalCount > 0) // Only include centers with stations
        .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically
      
      console.log("Engineering Centers:", engineeringCenters);
      return engineeringCenters;
    },
    refetchInterval: 600000 , // Refetch every 10 minutes
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
