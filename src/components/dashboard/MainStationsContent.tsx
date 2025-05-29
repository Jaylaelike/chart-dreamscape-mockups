import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import StatusIndicator from "@/components/StatusIndicator";
import QualityChart from "@/components/QualityChart";
import QualityTxBarChart from "@/components/QualityTxBarChart";
import TransmitterChart from "@/components/TransmitterChart";
import TransmitterAnalysisChart from "@/components/TransmitterAnalysisChart";
import ArtificialDelayBarChart from "@/components/ArtificialDelayBarChart";
import MonitoringCard from "./MonitoringCard";
import QualityRxBarChart from "@/components/QualityRxBarChart";

interface StationData {
  time: string;
  Center: string;
  Station: string;
  Device_name: string;
  IP: string;
  Status: string;
  Engineering_center: string;
  ip: string;
  Transmistion_Brand: string;
  No: string;
  Facility: string;
  Station_Eng: string;
  Station_Thai: string;
  Station_Type: string;
  Eng_No: number;
}

interface DailyReporterData {
  Engineering_center: string;
  Station: string;
  Status_: string;
  ip: string;
  Transmistion_Brand: string;
  No: string;
  Facility: string;
  Station_Eng: string;
  Station_Thai: string;
  Station_Type: string;
  Eng_No: number;
  Eng_No_n: number;
  TX_ANT: string;
  RF_Power: string;
  SFN: string;
  Emission: string;
  Downtime: string;
  PEA: string;
  GEN: string;
  Feul_M: string;
  Feul_A: string;
}

interface IrdHarmonicData {
  time: string;
  Center: string;
  Station: string;
  Device_Name: string;
  IP: string;
  Lock_Carrier: string;
  C_N: string;
  Link_Margin: string;
  EbNo: string;
  Status: string;
  Engineering_center: string;
  ip: string;
  Transmistion_Brand: string;
  No: string;
  Facility: string;
  Station_Eng: string;
  Station_Thai: string;
  Station_Type: string;
  Eng_No: number;
}

interface TxControlData {
  time: string;
  Center: string;
  Station: string;
  Device_Name: string;
  IP: string;
  Output_Power_Percent: string;
  IMD: string;
  MER: string;
  Status: string;
  Engineering_center: string;
  ip: string;
  Transmistion_Brand: string;
  No: string;
  Facility: string;
  Station_Eng: string;
  Station_Thai: string;
  Station_Type: string;
  Eng_No: number;
}

interface ApiResponse {
  orders: StationData[];
}

interface IrdApiResponse {
  orders: IrdHarmonicData[];
}

interface TxControlApiResponse {
  orders: TxControlData[];
}

interface MainStationsContentProps {
  engineeringCenter?: string;
}

const MainStationsContent = ({ engineeringCenter }: MainStationsContentProps) => {
  // Fetch NT Link data with React Query
  const { data: stationData = [], isLoading: isStationDataLoading } = useQuery({
    queryKey: ["stationData", "main", engineeringCenter],
    queryFn: async () => {
      const response = await fetch(
       import.meta.env.VITE_SERVER_URL +  "api/cisco_sw_join_eng_center"
      );
      const data: ApiResponse = await response.json();

      // Filter by Station_Type === "M" and optionally by Engineering_center
      let filteredData = data.orders.filter(
        (station) => station.Station_Type === "M"
      );
      
      if (engineeringCenter) {
        filteredData = filteredData.filter(
          (station) => station.Engineering_center === engineeringCenter
        );
      }
      
      console.log("Fetched station data:", filteredData);
      return filteredData;
    },
    refetchInterval: 600000 , // Refetch every 10 minutes
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  // Fetch Daily Reporter data with React Query
  const {
    data: dailyReporterData = [],
    isLoading: isDailyReporterDataLoading,
  } = useQuery({
    queryKey: ["dailyReporterData", "main", engineeringCenter],
    queryFn: async () => {
      const dailyResponse = await fetch(
        import.meta.env.VITE_SERVER_URL + "api/daily_reporter"
      );
      const dailyData: DailyReporterData[] = await dailyResponse.json();

      // Filter by Station_Type === "M" and optionally by Engineering_center
      let filteredDailyData = dailyData.filter(
        (station) => station.Station_Type === "M"
      );
      
      if (engineeringCenter) {
        filteredDailyData = filteredDailyData.filter(
          (station) => station.Engineering_center === engineeringCenter
        );
      }
      
      console.log("Fetched daily reporter data:", filteredDailyData);
      return filteredDailyData;
    },
    refetchInterval: 600000 , // Refetch every 10 minutes
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  // Fetch IRD Harmonic data with React Query
  const { data: irdHarmonicData = [], isLoading: isIrdHarmonicDataLoading } =
    useQuery({
      queryKey: ["irdHarmonicData", "main", engineeringCenter],
      queryFn: async () => {
        const irdResponse = await fetch(
          import.meta.env.VITE_SERVER_URL + "api/ird_harmonic_join_eng_center"
        );
        const irdData: IrdApiResponse = await irdResponse.json();

        // Filter by Station_Type === "M" and optionally by Engineering_center
        let filteredIrdData = irdData.orders.filter(
          (station) => station.Station_Type === "M"
        );
        
        if (engineeringCenter) {
          filteredIrdData = filteredIrdData.filter(
            (station) => station.Engineering_center === engineeringCenter
          );
        }
        
        console.log("Fetched IRD harmonic data:", filteredIrdData);
        return filteredIrdData;
      },
      refetchInterval: 600000 , // Refetch every 10 minutes
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    });

  // Fetch TX Control data with React Query
  const { data: txControlData = [], isLoading: isTxControlDataLoading } =
    useQuery({
      queryKey: ["txControlData", "main", engineeringCenter],
      queryFn: async () => {
        const txResponse = await fetch(
          import.meta.env.VITE_SERVER_URL + "api/tx_control_with_eng_center"
        );
        const txData: TxControlApiResponse = await txResponse.json();

        // Filter by Station_Type === "M" and optionally by Engineering_center
        let filteredTxData = txData.orders.filter(
          (station) => station.Station_Type === "M"
        );
        
        if (engineeringCenter) {
          filteredTxData = filteredTxData.filter(
            (station) => station.Engineering_center === engineeringCenter
          );
        }
        
        console.log("Fetched TX control data:", filteredTxData);
        return filteredTxData;
      },
      refetchInterval: 600000 , // Refetch every 10 minutes
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    });

  const loading =
    isStationDataLoading ||
    isDailyReporterDataLoading ||
    isIrdHarmonicDataLoading ||
    isTxControlDataLoading;

  // Calculate NT Link statistics
  const connectedStations = stationData.filter(
    (station) => station.Status === "Connected"
  );
  const disconnectedStations = stationData.filter(
    (station) => station.Status === "Disconnect"
  );

  const ntOnlineCount = connectedStations.length;
  const ntOfflineCount = disconnectedStations.length;

  // Calculate PEA & MEA Status statistics
  const peaOnStations = dailyReporterData.filter(
    (station) => station.PEA === "PEA : ON"
  );
  const peaOffStations = dailyReporterData.filter(
    (station) => station.PEA === "PEA : OFF"
  );
  const peaUnknownStations = dailyReporterData.filter(
    (station) => !station.PEA || station.PEA === "" || station.PEA === null
  );

  // Calculate Downtime Status statistics (On Air section)
  const normalStations = dailyReporterData.filter(
    (station) => station.Downtime === "Normal"
  );
  const downtimeStations = dailyReporterData.filter(
    (station) => station.Downtime === "Downtime"
  );
  const unknownDowntimeStations = dailyReporterData.filter(
    (station) =>
      !station.Downtime ||
      station.Downtime === "" ||
      station.Downtime === null ||
      (station.Downtime !== "Normal" && station.Downtime !== "Downtime")
  );

  // Group by Station_Type for On Air bar chart
  const downtimeByStationType = dailyReporterData.reduce((acc, station) => {
    const stationType = station.Station_Type;
    if (!acc[stationType]) {
      acc[stationType] = { normal: 0, downtime: 0, unknown: 0 };
    }
    if (station.Downtime === "Normal") {
      acc[stationType].normal++;
    } else if (station.Downtime === "Downtime") {
      acc[stationType].downtime++;
    } else {
      acc[stationType].unknown++;
    }
    return acc;
  }, {} as Record<string, { normal: number; downtime: number; unknown: number }>);

  // Group by Facility for PEA status
  const peaStatusByFacility = dailyReporterData.reduce((acc, station) => {
    const facility = station.Facility;
    if (!acc[facility]) {
      acc[facility] = { on: 0, off: 0, unknown: 0 };
    }
    if (station.PEA === "PEA : ON") {
      acc[facility].on++;
    } else if (station.PEA === "PEA : OFF") {
      acc[facility].off++;
    } else if (!station.PEA || station.PEA === "" || station.PEA === null) {
      acc[facility].unknown++;
    }
    return acc;
  }, {} as Record<string, { on: number; off: number; unknown: number }>);

  // Calculate Satellite Link Status statistics
  const lockedCarrierStations = irdHarmonicData.filter(
    (station) => station.Lock_Carrier === "Locked"
  );
  const unlockedCarrierStations = irdHarmonicData.filter(
    (station) => station.Lock_Carrier !== "Locked"
  );

  // Group by Device_Name for satellite link status
  const satelliteByDevice = irdHarmonicData.reduce((acc, station) => {
    const deviceType =
      station.Device_Name === "IRD A"
        ? "Main"
        : station.Device_Name === "IRD B"
        ? "Backup"
        : station.Device_Name;
    if (!acc[deviceType]) {
      acc[deviceType] = { locked: 0, unlocked: 0 };
    }
    if (station.Lock_Carrier === "Locked") {
      acc[deviceType].locked++;
    } else {
      acc[deviceType].unlocked++;
    }
    return acc;
  }, {} as Record<string, { locked: number; unlocked: number }>);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
        {" "}
        <MonitoringCard title="Quality Measurement TX">
          <QualityTxBarChart data={txControlData} />
        </MonitoringCard>
        <MonitoringCard title="Quality Measurement RX">
          <QualityRxBarChart data={irdHarmonicData} />
        </MonitoringCard>
        <MonitoringCard title="On Air">
          <div className="flex flex-col items-center justify-center h-16 md:h-20 space-y-1">
            <div className="flex items-center gap-2 text-sm md:text-base">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-400 font-bold">
                  OnAir: {normalStations.length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-red-400 font-bold">
                  Down: {downtimeStations.length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span className="text-gray-500 font-bold">
                  Unknown: {unknownDowntimeStations.length}
                </span>
              </div>
            </div>
            <div className="w-full space-y-1 max-h-12 overflow-y-auto">
              {Object.entries(downtimeByStationType).map(
                ([stationType, counts]) => {
                  const total =
                    counts.normal + counts.downtime + counts.unknown;
                  return (
                    <div
                      key={stationType}
                      className="flex items-center gap-1 text-md"
                    >
                      <span className="text-black truncate font-medium">
                        {stationType}
                      </span>
                      <div className="flex-1 bg-gray-700 rounded-full h-1.5 overflow-hidden flex">
                        <div
                          className="bg-green-500 h-full transition-all duration-300"
                          style={{
                            width: `${
                              total > 0 ? (counts.normal / total) * 100 : 0
                            }%`,
                          }}
                        />
                        <div
                          className="bg-red-500 h-full transition-all duration-300"
                          style={{
                            width: `${
                              total > 0 ? (counts.downtime / total) * 100 : 0
                            }%`,
                          }}
                        />
                        <div
                          className="bg-gray-500 h-full transition-all duration-300"
                          style={{
                            width: `${
                              total > 0 ? (counts.unknown / total) * 100 : 0
                            }%`,
                          }}
                        />
                      </div>
                      <span className="text-black text-md font-medium">
                        {counts.normal}/{counts.downtime}/{counts.unknown}
                      </span>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </MonitoringCard>
        <MonitoringCard title="PEA & MEA Status">
          <div className="flex flex-col items-center justify-center h-16 md:h-20 space-y-1">
            <div className="flex items-center gap-2 text-sm md:text-base">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-400 font-bold">
                  ON: {peaOnStations.length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-red-400 font-bold">
                  OFF: {peaOffStations.length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span className="text-gray-400 font-bold">
                  Unknown: {peaUnknownStations.length}
                </span>
              </div>
            </div>
            <div className="w-full space-y-1 max-h-12 ">
              {Object.entries(peaStatusByFacility).map(([facility, counts]) => {
                const total = counts.on + counts.off + counts.unknown;
                return (
                  <div
                    key={facility}
                    className="flex items-center gap-1 text-md"
                  >
                    <span className="truncate text-black ">
                      {facility}
                    </span>
                    <div className="flex-1 bg-gray-700 rounded-full h-1.5 overflow-hidden flex">
                      <div
                        className="bg-green-500 h-full transition-all duration-300"
                        style={{
                          width: `${
                            total > 0 ? (counts.on / total) * 100 : 0
                          }%`,
                        }}
                      />
                      <div
                        className="bg-red-500 h-full transition-all duration-300"
                        style={{
                          width: `${
                            total > 0 ? (counts.off / total) * 100 : 0
                          }%`,
                        }}
                      />
                      <div
                        className="bg-gray-500 h-full transition-all duration-300"
                        style={{
                          width: `${
                            total > 0 ? (counts.unknown / total) * 100 : 0
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-blsck text-md font-medium">
                      {counts.on}/{counts.off}/{counts.unknown}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </MonitoringCard>
        <MonitoringCard title="NT Link Status">
          <div className="flex flex-col items-center justify-center h-16 md:h-20 space-y-1">
            <div className="flex items-center gap-4 text-base md:text-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-400 font-bold">
                  Online: {ntOnlineCount}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-red-400 font-bold">
                  Offline: {ntOfflineCount}
                </span>
              </div>
            </div>
            <div className="text-md text-black font-medium">
              Total: {stationData.length} stations
            </div>
          </div>
        </MonitoringCard>
        <MonitoringCard title="Satellite Link Status">
          <div className="flex flex-col items-center justify-center h-16 md:h-20 space-y-1">
            <div className="flex items-center gap-2 text-sm md:text-base">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-400 font-bold">
                  Locked: {lockedCarrierStations.length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-red-400 font-bold">
                  Unlocked: {unlockedCarrierStations.length}
                </span>
              </div>
            </div>
            <div className="w-full space-y-0.5 max-h-12 ">
              {Object.entries(satelliteByDevice).map(([deviceType, counts]) => {
                const total = counts.locked + counts.unlocked;
                return (
                  <div
                    key={deviceType}
                    className="flex items-center gap-1 text-md"
                  >
                    <span className="text-black  truncate text-md">
                      {deviceType}
                    </span>
                    <div className="flex-1 bg-gray-700 rounded-full h-1.5 overflow-hidden flex">
                      <div
                        className="bg-green-500 h-full transition-all duration-300 "
                        style={{
                          width: `${
                            total > 0 ? (counts.locked / total) * 100 : 0
                          }%`,
                        }}
                      />
                      <div
                        className="bg-red-500 h-full transition-all duration-300"
                        style={{
                          width: `${
                            total > 0 ? (counts.unlocked / total) * 100 : 0
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-black  text-md font-medium">
                      {counts.locked}/{counts.unlocked}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </MonitoringCard>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
        <MonitoringCard title="Artificial delay">
          <ArtificialDelayBarChart data={dailyReporterData} />
        </MonitoringCard>

        <MonitoringCard title="Transmitter">
          <TransmitterAnalysisChart data={dailyReporterData} />
        </MonitoringCard>

        <MonitoringCard title="Downtime">
          <div className="flex items-center justify-center h-16 md:h-20">
            {downtimeStations.length > 0 ? (
              <div className="text-center bg-gradient-to-br from-orange-500/20 to-red-500/20 p-3 rounded-lg border border-orange-400/30 backdrop-blur-sm hover:border-orange-400/50 transition-all duration-200 shadow-md w-full">
                <div className="text-orange-400 font-bold text-sm leading-tight space-y-0.5 max-h-16 overflow-y-auto">
                  {downtimeStations.slice(0, 3).map((station, index) => (
                    <div key={index} className="mb-1">
                      <div className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-bold text-base">
                        {station.Station_Thai}
                      </div>
                      <div className="text-orange-300/80 text-sm font-medium">
                        {station.Facility}
                      </div>
                    </div>
                  ))}
                  {downtimeStations.length > 3 && (
                    <div className="text-orange-300/60 text-sm mt-1 font-medium">
                      +{downtimeStations.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-4 py-3 rounded-lg border border-gray-600 shadow-md hover:shadow-lg transition-all duration-200">
                <span className="text-gray-300 text-2xl font-bold">N/A</span>
              </div>
            )}
          </div>
        </MonitoringCard>

        <MonitoringCard title="Electrical Fault">
          <div className="flex items-center justify-center h-16 md:h-20">
            {peaOffStations.length > 0 || peaUnknownStations.length > 0 ? (
              <div className="text-center bg-gradient-to-br from-red-50 to-red-50 p-3 rounded-lg border border-red-200 backdrop-blur-sm hover:border-red-300 transition-all duration-200 shadow-sm hover:shadow-md w-full">
                <div className="text-red-600 font-bold text-sm leading-tight space-y-0.5 max-h-16 overflow-y-auto">
                  {peaOffStations.slice(0, 100).map((station, index) => (
                    <div key={index} className="mb-1">
                      <div className="text-red-700 font-bold text-lg">
                        {station.Station_Thai} (OFF)
                      </div>
                      <div className="text-red-600 text-sm font-medium">
                        {station.Facility}
                      </div>
                    </div>
                  ))}
                  {/* {peaUnknownStations
                    .slice(0, Math.max(0, 3 - peaOffStations.length))
                    .map((station, index) => (
                      <div key={`unknown-${index}`} className="mb-1">
                        <div className="text-gray-700 font-bold text-lg">
                          {station.Station_Thai} (Unknown)
                        </div>
                        <div className="text-gray-600 text-sm font-medium">
                          {station.Facility}
                        </div>
                      </div>
                    ))}
                  {peaOffStations.length + peaUnknownStations.length > 3 && (
                    <div className="text-red-400 text-sm mt-1 font-medium">
                      +{peaOffStations.length + peaUnknownStations.length - 3}{" "}
                      more
                    </div>
                  )} */}
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-4 py-3 rounded-lg border border-gray-600 shadow-md hover:shadow-lg transition-all duration-200">
                <span className="text-gray-300 text-2xl font-bold">N/A</span>
              </div>
            )}
          </div>
        </MonitoringCard>

        <MonitoringCard title="NT Link Fault">
          <div className="flex items-center justify-center h-16 md:h-20">
            {disconnectedStations.length > 0 ? (
              <div className="text-center bg-gradient-to-br from-red-100 to-pink-100 p-3 rounded-lg border-2 border-red-300 backdrop-blur-sm hover:border-red-400 transition-all duration-200 shadow-md hover:shadow-lg w-full">
                <div className="text-red-600 font-bold text-sm leading-tight space-y-1 max-h-16 overflow-y-auto">
                  {disconnectedStations.slice(0, 100).map((station, index) => (
                    <div key={index} className="mb-1">
                      <div className="text-red-700 font-bold text-lg">
                        {station.Station_Thai}
                      </div>
                      <div className="text-red-600 text-base font-medium">
                        {station.Facility}
                      </div>
                    </div>
                  ))}
                  {/* {disconnectedStations.length > 3 && (
                    <div className="text-red-500 text-base mt-1 font-bold">
                      +{disconnectedStations.length - 3} more
                    </div>
                  )} */}
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-4 py-3 rounded-lg border border-gray-600 shadow-md hover:shadow-lg transition-all duration-200">
                <span className="text-gray-300 text-2xl font-bold">N/A</span>
              </div>
            )}
          </div>
        </MonitoringCard>

        <MonitoringCard title="Satellite Link Fault">
          <div className="flex items-center justify-center h-16 md:h-20">
            {unlockedCarrierStations.length > 0 ? (
              <div className="text-center bg-gradient-to-br from-orange-100 to-red-100 p-3 rounded-lg border-2 border-orange-300 backdrop-blur-sm hover:border-orange-400 transition-all duration-200 shadow-md hover:shadow-lg w-full">
                <div className="text-orange-600 font-bold text-sm leading-tight space-y-1 max-h-16 overflow-y-auto">
                  {unlockedCarrierStations.slice(0, 3).map((station, index) => (
                    <div key={index} className="mb-1">
                      <div className="text-orange-700 font-bold text-lg">
                        {station.Station_Thai}
                      </div>
                      <div className="text-orange-600 text-base font-medium">
                        {station.Facility} - {station.Device_Name}
                      </div>
                    </div>
                  ))}
                  {unlockedCarrierStations.length > 3 && (
                    <div className="text-orange-500 text-base mt-1 font-bold">
                      +{unlockedCarrierStations.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-4 py-3 rounded-lg border border-gray-600 shadow-md hover:shadow-lg transition-all duration-200">
                <span className="text-gray-300 text-2xl font-bold">N/A</span>
              </div>
            )}
          </div>
        </MonitoringCard>
      </div>
    </div>
  );
};

export default MainStationsContent;
