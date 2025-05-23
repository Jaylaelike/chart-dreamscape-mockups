// Update this page (the content is just a fallback if you fail to update the page)

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import QualityChart from "@/components/QualityChart";
import StatusIndicator from "@/components/StatusIndicator";
import TransmitterChart from "@/components/TransmitterChart";
import { Clock, Radio, Satellite, Zap } from "lucide-react";

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
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <h1 className="text-2xl font-bold text-yellow-400">Engineering Department</h1>
            <p className="text-blue-300">Thai Public Broadcasting Service</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{currentTime}</span>
            </div>
            <div className="text-right">
              <div>2024</div>
              <div className="text-xs text-gray-400">5/21/2025 11:08 AM</div>
            </div>
          </div>
        </div>
        
        {/* SLA Summary */}
        <div className="mt-4 flex justify-center gap-8 text-sm">
          <div className="flex gap-2">
            <span className="text-yellow-400">Downtime:</span>
            <div className="bg-pink-500 px-2 rounded">00:00:00</div>
          </div>
          <div className="flex gap-2">
            <span className="text-yellow-400">Total Time:</span>
            <div className="bg-yellow-500 text-black px-2 rounded">0.000000</div>
          </div>
          <div className="flex gap-2">
            <span className="text-yellow-400">SLA deduct:</span>
            <div className="bg-green-500 text-black px-2 rounded">0.000000</div>
          </div>
          <div className="flex gap-2">
            <span className="text-yellow-400">SLA remain:</span>
            <div className="bg-green-500 text-black px-2 rounded">100.000000</div>
          </div>
        </div>
      </div>

      {/* Station Tabs */}
      <Tabs defaultValue="r11" className="w-full">
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

        {/* Main Content */}
        <div className="p-6">
          <TabsContent value="r11" className="space-y-6">
            {/* 39 Main Stations */}
            <div>
              <h2 className="text-xl font-bold mb-4 text-center bg-gray-800 py-2 rounded">
                39 Main Stations
              </h2>
              
              <div className="grid grid-cols-6 gap-4">
                {/* Quality Measurement TX */}
                <Card className="bg-blue-600 border-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-center text-white">Quality Measurement TX</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <QualityChart />
                  </CardContent>
                </Card>

                {/* Quality Measurement RX */}
                <Card className="bg-blue-600 border-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-center text-white">Quality Measurement RX</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <QualityChart />
                  </CardContent>
                </Card>

                {/* On Air */}
                <Card className="bg-blue-600 border-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-center text-white">On Air</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <StatusIndicator status="active" value="53" />
                  </CardContent>
                </Card>

                {/* PEA & MEA Status */}
                <Card className="bg-blue-600 border-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-center text-white">PEA & MEA Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <StatusIndicator status="active" value="53" />
                  </CardContent>
                </Card>

                {/* NT Link Status */}
                <Card className="bg-blue-600 border-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-center text-white">NT Link Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <StatusIndicator status="active" value="53" />
                  </CardContent>
                </Card>

                {/* Satellite Link Status */}
                <Card className="bg-blue-600 border-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-center text-white">Satellite Link Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <StatusIndicator status="active" value="39" />
                  </CardContent>
                </Card>
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-6 gap-4 mt-4">
                {/* Artificial delay */}
                <Card className="bg-blue-600 border-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-center text-white">Artificial delay</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <QualityChart showDelay />
                  </CardContent>
                </Card>

                {/* Transmitter */}
                <Card className="bg-blue-600 border-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-center text-white">Transmitter</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TransmitterChart />
                  </CardContent>
                </Card>

                {/* Downtime */}
                <Card className="bg-blue-600 border-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-center text-white">Downtime</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center h-20">
                    <span className="text-orange-400 text-lg">N/A</span>
                  </CardContent>
                </Card>

                {/* Electrical Fault */}
                <Card className="bg-blue-600 border-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-center text-white">Electrical Fault</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center h-20">
                    <div className="text-center">
                      <div className="text-orange-400">เขียวใหม่</div>
                      <div className="text-xs text-orange-300">ส.ส.ท.</div>
                    </div>
                  </CardContent>
                </Card>

                {/* NT Link Fault */}
                <Card className="bg-blue-600 border-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-center text-white">NT Link Fault</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center h-20">
                    <span className="text-orange-400 text-lg">N/A</span>
                  </CardContent>
                </Card>

                {/* Satellite Link Fault */}
                <Card className="bg-blue-600 border-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-center text-white">Satellite Link Fault</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center h-20">
                    <span className="text-orange-400 text-lg">N/A</span>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 129 Addition Stations */}
            <div>
              <h2 className="text-xl font-bold mb-4 text-center bg-gray-800 py-2 rounded">
                129 Addition Stations
              </h2>
              
              <div className="grid grid-cols-6 gap-4">
                {/* Quality Measurement TX [NEC] */}
                <Card className="bg-blue-600 border-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-center text-white">Quality Measurement TX [NEC]</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <QualityChart />
                  </CardContent>
                </Card>

                {/* Quality Measurement RX */}
                <Card className="bg-blue-600 border-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-center text-white">Quality Measurement RX</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <QualityChart />
                  </CardContent>
                </Card>

                {/* On Air */}
                <Card className="bg-blue-600 border-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-center text-white">On Air</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-1">
                      <StatusIndicator status="active" value="54" size="sm" />
                      <StatusIndicator status="inactive" value="0" size="sm" />
                      <StatusIndicator status="inactive" value="0" size="sm" />
                      <StatusIndicator status="active" value="54" size="sm" />
                    </div>
                  </CardContent>
                </Card>

                {/* PEA & MEA Status */}
                <Card className="bg-blue-600 border-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-center text-white">PEA & MEA Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-1">
                      <StatusIndicator status="inactive" value="0" size="sm" />
                      <StatusIndicator status="active" value="54" size="sm" />
                      <StatusIndicator status="active" value="54" size="sm" />
                      <StatusIndicator status="active" value="54" size="sm" />
                    </div>
                  </CardContent>
                </Card>

                {/* NT Link Status */}
                <Card className="bg-blue-600 border-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-center text-white">NT Link Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <StatusIndicator status="active" value="127" />
                  </CardContent>
                </Card>

                {/* Satellite Link Status */}
                <Card className="bg-blue-600 border-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-center text-white">Satellite Link Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-1">
                      <StatusIndicator status="active" value="129" size="sm" />
                      <StatusIndicator status="inactive" value="0" size="sm" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Second Row for Addition Stations */}
              <div className="grid grid-cols-6 gap-4 mt-4">
                <Card className="bg-blue-600 border-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-center text-white">Artificial delay</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <QualityChart showDelay />
                  </CardContent>
                </Card>

                <Card className="bg-blue-600 border-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-center text-white">Transmitter</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TransmitterChart value={25} />
                  </CardContent>
                </Card>

                <Card className="bg-blue-600 border-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-center text-white">Downtime</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center h-20">
                    <span className="text-orange-400 text-lg">N/A</span>
                  </CardContent>
                </Card>

                <Card className="bg-blue-600 border-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-center text-white">Electrical Fault</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center h-20">
                    <span className="text-orange-400 text-lg">N/A</span>
                  </CardContent>
                </Card>

                <Card className="bg-blue-600 border-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-center text-white">NT Link Fault</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center h-20">
                    <div className="text-center text-orange-400 text-xs">
                      <div>ปราบรามงานครา</div>
                      <div>เงียบแง่ง</div>
                      <div>อสังหา</div>
                      <div>ทรท.</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-600 border-blue-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-center text-white">Satellite Link Fault</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center h-20">
                    <span className="text-orange-400 text-lg">N/A</span>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Other station tabs would have similar content */}
          {stations.slice(1).map((station) => (
            <TabsContent key={station.id} value={station.id} className="space-y-6">
              <div className="text-center py-20">
                <Radio className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                <h3 className="text-xl font-bold mb-2">{station.name} - {station.location}</h3>
                <p className="text-gray-400">Station monitoring data would appear here</p>
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default Index;
