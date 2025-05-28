// Update this page (the content is just a fallback if you fail to update the page)

import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Header from "@/components/dashboard/Header";
import StationTabs from "@/components/dashboard/StationTabs";
import StationSection from "@/components/dashboard/StationSection";
import MainStationsContent from "@/components/dashboard/MainStationsContent";
import AdditionStationsContent from "@/components/dashboard/AdditionStationsContent";
import EngineeringCenterContent from "@/components/dashboard/EngineeringCenterContent";
import { useEngineeringCenters } from "@/hooks/useEngineeringCenters";
import { SLAMetricsForm } from "@/components/sla-metrics/SLAMetricsForm";
import { SLAMetricsTable } from "@/components/sla-metrics/SLAMetricsTable";

const Index = () => {
  const [currentTime] = useState(new Date().toLocaleTimeString());
  
  // Fetch Engineering Centers from API
  const { data: engineeringCenters = [], isLoading } = useEngineeringCenters();
  
  // Create stations array with "ALL" tab and engineering centers
  const stations = [
    { id: "all", name: "ALL", active: true },
    ...engineeringCenters.map(center => ({
      id: center.id,
      name: center.name,
      location: center.location,
      active: center.active
    }))
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <Header />

      {/* Loading state */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-gray-400">Loading Engineering Centers...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Station Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <StationTabs stations={stations} />

            {/* Main Content */}
            <div className="p-2 sm:p-4 md:p-6">
              <TabsContent value="all" className="space-y-4">
                {/* Main Stations - All Engineering Centers */}
                <StationSection title="Main Stations (All Engineering Centers)">
                  <MainStationsContent />
                </StationSection>

                {/* Addition Stations - All Engineering Centers */}
                <StationSection title="Addition Stations (All Engineering Centers)">
                  <AdditionStationsContent />
                </StationSection>

               
              </TabsContent>

              {/* Engineering Center specific tabs */}
              {engineeringCenters.map((center) => (
                <TabsContent key={center.id} value={center.id} className="space-y-6">
                  <EngineeringCenterContent engineeringCenter={center.name} />
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default Index;
