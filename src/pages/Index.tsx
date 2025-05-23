// Update this page (the content is just a fallback if you fail to update the page)

import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Header from "@/components/dashboard/Header";
import StationTabs from "@/components/dashboard/StationTabs";
import StationSection from "@/components/dashboard/StationSection";
import MainStationsContent from "@/components/dashboard/MainStationsContent";
import AdditionStationsContent from "@/components/dashboard/AdditionStationsContent";
import EmptyStationContent from "@/components/dashboard/EmptyStationContent";

const Index = () => {
  const [currentTime] = useState(new Date().toLocaleTimeString());
  
  const stations = [
    { id: "all", name: "ALL", active: false },
    { id: "r11", name: "R11", location: "Bangkok", active: true },
    { id: "r12", name: "R12", location: "Sa Kaeo", active: true },
    { id: "r21", name: "R21", location: "Song Khla", active: true },
    { id: "r22", name: "R22", location: "Surat Thani", active: true },
    { id: "r23", name: "R23", location: "Chumphon", active: true },
    { id: "r31", name: "R31", location: "Chang Mai", active: true },
    { id: "r32", name: "R32", location: "Sukhothai", active: true },
    { id: "r33", name: "R33", location: "Phrae", active: true },
    { id: "r41", name: "R41", location: "Khon Kaen", active: true },
    { id: "r42", name: "R42", location: "Ubon Ratchathani", active: true },
    { id: "r43", name: "R43", location: "Surin", active: true },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <Header />

      {/* Station Tabs */}
      <Tabs defaultValue="r11" className="w-full">
        <StationTabs stations={stations} />

        {/* Main Content */}
        <div className="p-6">
          <TabsContent value="r11" className="space-y-6">
            {/* 39 Main Stations */}
            <StationSection title="39 Main Stations">
              <MainStationsContent />
            </StationSection>

            {/* 129 Addition Stations */}
            <StationSection title="129 Addition Stations">
              <AdditionStationsContent />
            </StationSection>
          </TabsContent>

          {/* Other station tabs would have similar content */}
          {stations.slice(1).map((station) => (
            <TabsContent key={station.id} value={station.id} className="space-y-6">
              <EmptyStationContent name={station.name} location={station.location} />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default Index;
