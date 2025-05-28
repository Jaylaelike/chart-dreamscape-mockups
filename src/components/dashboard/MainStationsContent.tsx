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

const MainStationsContent = () => {
  // Fetch NT Link data with React Query
  const { data: stationData = [], isLoading: isStationDataLoading } = useQuery({
    queryKey: ["stationData", "main"],
    queryFn: async () => {
      const response = await fetch(
        "http://localhost:3000/api/cisco_sw_join_eng_center"
      );
      const data: ApiResponse = await response.json();

      // Filter only Station_Type === "M"
      const filteredData = data.orders.filter(
        (station) => station.Station_Type === "M"
      );
      console.log("Fetched station data:", filteredData);
      return filteredData;
    },
    refetchInterval: 10000, // Refetch every 10 seconds
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  // Fetch Daily Reporter data with React Query
  const {
    data: dailyReporterData = [],
    isLoading: isDailyReporterDataLoading,
  } = useQuery({
    queryKey: ["dailyReporterData", "main"],
    queryFn: async () => {
      const dailyResponse = await fetch(
        "http://localhost:3000/api/daily_reporter"
      );
      const dailyData: DailyReporterData[] = await dailyResponse.json();

      // Filter only Station_Type === "M"
      const filteredDailyData = dailyData.filter(
        (station) => station.Station_Type === "M"
      );
      console.log("Fetched daily reporter data:", filteredDailyData);
      return filteredDailyData;
    },
    refetchInterval: 10000, // Refetch every 10 seconds
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  // Fetch IRD Harmonic data with React Query
  const { data: irdHarmonicData = [], isLoading: isIrdHarmonicDataLoading } =
    useQuery({
      queryKey: ["irdHarmonicData", "main"],
      queryFn: async () => {
        const irdResponse = await fetch(
          "http://localhost:3000/api/ird_harmonic_join_eng_center"
        );
        const irdData: IrdApiResponse = await irdResponse.json();

        // Filter only Station_Type === "M"
        const filteredIrdData = irdData.orders.filter(
          (station) => station.Station_Type === "M"
        );
        console.log("Fetched IRD harmonic data:", filteredIrdData);
        return filteredIrdData;
      },
      refetchInterval: 10000, // Refetch every 10 seconds
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    });

  // Fetch TX Control data with React Query
  const { data: txControlData = [], isLoading: isTxControlDataLoading } =
    useQuery({
      queryKey: ["txControlData", "main"],
      queryFn: async () => {
        const txResponse = await fetch(
          "http://localhost:3000/api/tx_control_with_eng_center"
        );
        const txData: TxControlApiResponse = await txResponse.json();

        // Filter only Station_Type === "M"
        const filteredTxData = txData.orders.filter(
          (station) => station.Station_Type === "M"
        );
        console.log("Fetched TX control data:", filteredTxData);
        return filteredTxData;
      },
      refetchInterval: 10000, // Refetch every 10 seconds
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
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-400 font-medium">
                  OnAir: {normalStations.length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-red-400 font-medium">
                  Down: {downtimeStations.length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-gray-400 font-medium">
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
                      className="flex items-center gap-1 text-xs"
                    >
                      <span className="text-gray-300 w-8 truncate">
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
                      <span className="text-gray-400 text-xs">
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
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-400 font-medium">
                  ON: {peaOnStations.length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-red-400 font-medium">
                  OFF: {peaOffStations.length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-gray-400 font-medium">
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
                    className="flex items-center gap-1 text-xs"
                  >
                    <span className="text-gray-300 w-8 truncate">
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
                    <span className="text-gray-400 text-xs">
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
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-400 font-medium">
                  Online: {ntOnlineCount}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-red-400 font-medium">
                  Offline: {ntOfflineCount}
                </span>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              Total: {stationData.length} stations
            </div>
          </div>
        </MonitoringCard>
        <MonitoringCard title="Satellite Link Status">
          <div className="flex flex-col items-center justify-center h-16 md:h-20 space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-400 font-medium">
                  Locked: {lockedCarrierStations.length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-red-400 font-medium">
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
                    className="flex items-center gap-1 text-xs"
                  >
                    <span className="text-gray-300 w-12 truncate">
                      {deviceType}
                    </span>
                    <div className="flex-1 bg-gray-700 rounded-full h-1.5 overflow-hidden flex">
                      <div
                        className="bg-green-500 h-full transition-all duration-300"
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
                    <span className="text-gray-400 text-xs">
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
                <div className="text-orange-400 font-medium text-xs leading-tight space-y-0.5 max-h-16 overflow-y-auto">
                  {downtimeStations.slice(0, 3).map((station, index) => (
                    <div key={index} className="mb-1">
                      <div className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-semibold">
                        {station.Station_Thai}
                      </div>
                      <div className="text-orange-300/80 text-xs">
                        {station.Facility}
                      </div>
                    </div>
                  ))}
                  {downtimeStations.length > 3 && (
                    <div className="text-orange-300/60 text-xs mt-1">
                      +{downtimeStations.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-2 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                <span className="text-gray-400 text-lg font-semibold">N/A</span>
              </div>
            )}
          </div>
        </MonitoringCard>

        <MonitoringCard title="Electrical Fault">
          <div className="flex items-center justify-center h-16 md:h-20">
            {peaOffStations.length > 0 || peaUnknownStations.length > 0 ? (
              <div className="text-center bg-gradient-to-br from-lime-50 to-green-50 p-3 rounded-lg border border-lime-200 backdrop-blur-sm hover:border-lime-300 transition-all duration-200 shadow-sm hover:shadow-md w-full">
                <div className="text-lime-600 font-medium text-xs leading-tight space-y-0.5 max-h-16 overflow-y-auto">
                  {peaOffStations.slice(0, 2).map((station, index) => (
                    <div key={index} className="mb-1">
                      <div className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent font-semibold">
                        {station.Station_Thai} (OFF)
                      </div>
                      <div className="text-lime-500 text-xs">
                        {station.Facility}
                      </div>
                    </div>
                  ))}
                  {peaUnknownStations
                    .slice(0, Math.max(0, 3 - peaOffStations.length))
                    .map((station, index) => (
                      <div key={`unknown-${index}`} className="mb-1">
                        <div className="bg-gradient-to-r from-gray-400 to-gray-500 bg-clip-text text-transparent font-semibold">
                          {station.Station_Thai} (Unknown)
                        </div>
                        <div className="text-gray-500 text-xs">
                          {station.Facility}
                        </div>
                      </div>
                    ))}
                  {peaOffStations.length + peaUnknownStations.length > 3 && (
                    <div className="text-lime-400 text-xs mt-1">
                      +{peaOffStations.length + peaUnknownStations.length - 3}{" "}
                      more
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-2 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                <span className="text-gray-400 text-lg font-semibold">N/A</span>
              </div>
            )}
          </div>
        </MonitoringCard>

        <MonitoringCard title="NT Link Fault">
          <div className="flex items-center justify-center h-16 md:h-20">
            {disconnectedStations.length > 0 ? (
              <div className="text-center bg-gradient-to-br from-red-50 to-pink-50 p-3 rounded-lg border border-red-200 backdrop-blur-sm hover:border-red-300 transition-all duration-200 shadow-sm hover:shadow-md w-full">
                <div className="text-red-600 font-medium text-xs leading-tight space-y-0.5 max-h-16 overflow-y-auto">
                  {disconnectedStations.slice(0, 3).map((station, index) => (
                    <div key={index} className="mb-1">
                      <div className="text-red-600 font-semibold">
                        {station.Station_Thai}
                      </div>
                      <div className="text-red-500 text-xs">
                        {station.Facility}
                      </div>
                    </div>
                  ))}
                  {disconnectedStations.length > 3 && (
                    <div className="text-red-400 text-xs mt-1">
                      +{disconnectedStations.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-2 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                <span className="text-gray-400 text-lg font-semibold">N/A</span>
              </div>
            )}
          </div>
        </MonitoringCard>

        <MonitoringCard title="Satellite Link Fault">
          <div className="flex items-center justify-center h-16 md:h-20">
            {unlockedCarrierStations.length > 0 ? (
              <div className="text-center bg-gradient-to-br from-orange-50 to-red-50 p-3 rounded-lg border border-orange-200 backdrop-blur-sm hover:border-orange-300 transition-all duration-200 shadow-sm hover:shadow-md w-full">
                <div className="text-orange-600 font-medium text-xs leading-tight space-y-0.5 max-h-16 overflow-y-auto">
                  {unlockedCarrierStations.slice(0, 3).map((station, index) => (
                    <div key={index} className="mb-1">
                      <div className="text-orange-600 font-semibold">
                        {station.Station_Thai}
                      </div>
                      <div className="text-orange-500 text-xs">
                        {station.Facility} - {station.Device_Name}
                      </div>
                    </div>
                  ))}
                  {unlockedCarrierStations.length > 3 && (
                    <div className="text-orange-400 text-xs mt-1">
                      +{unlockedCarrierStations.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-2 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                <span className="text-gray-400 text-lg font-semibold">N/A</span>
              </div>
            )}
          </div>
        </MonitoringCard>
      </div>
    </div>
  );
};

export default MainStationsContent;
