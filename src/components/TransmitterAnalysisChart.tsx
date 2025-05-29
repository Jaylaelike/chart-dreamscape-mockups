import { BarChart, Bar, ResponsiveContainer, Cell, XAxis, Tooltip } from 'recharts';
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

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

interface TransmitterAnalysisChartProps {
  data: DailyReporterData[];
}

const TransmitterAnalysisChart = ({ data }: TransmitterAnalysisChartProps) => {
  // Group TX_ANT data by Facility and categorize
  const transmitterDataByFacility = data.reduce((acc, station) => {
    const facility = station.Facility;
    if (!acc[facility]) {
      acc[facility] = { mux: 0, reserve: 0, unknown: 0 };
    }
    
    if (station.TX_ANT === "TX A") {
      acc[facility].mux++;
    } else if (station.TX_ANT === "TX B") {
      acc[facility].reserve++;
    } else {
      acc[facility].unknown++;
    }
    
    return acc;
  }, {} as Record<string, { mux: number; reserve: number; unknown: number }>);

  // Calculate total counts across all facilities
  const totalCounts = Object.values(transmitterDataByFacility).reduce(
    (acc, counts) => ({
      mux: acc.mux + counts.mux,
      reserve: acc.reserve + counts.reserve,
      unknown: acc.unknown + counts.unknown,
    }),
    { mux: 0, reserve: 0, unknown: 0 }
  );

  const chartData = [
    { name: 'Mux', value: totalCounts.mux, category: 'mux' },
    { name: 'Reserve', value: totalCounts.reserve, category: 'reserve' },
    { name: 'Unknown', value: totalCounts.unknown, category: 'unknown' },
  ];

  // Modern gradient colors based on category
  const getBarColor = (category: string) => {
    switch (category) {
      case 'mux':
        return ['#4ade80', '#10b981']; // Green gradient for Mux (TX A)
      case 'reserve':
        return ['#60a5fa', '#3b82f6']; // Blue gradient for Reserve (TX B)
      case 'unknown':
        return ['#94a3b8', '#64748b']; // Gray gradient for Unknown
      default:
        return ['#ef4444', '#b91c1c']; // Red fallback
    }
  };

  const getStatusText = (category: string, value: number) => {
    if (value === 0) return "None";
    switch (category) {
      case 'mux':
        return "Mux";
      case 'reserve':
        return "Reserve";
      case 'unknown':
        return "Unknown";
      default:
        return "N/A";
    }
  };

  const totalStations = totalCounts.mux + totalCounts.reserve + totalCounts.unknown;

  if (totalStations === 0) {
    return (
      <div className="h-20 flex flex-col items-center justify-center">
        <div className="text-slate-400 text-md">No transmitter data</div>
      </div>
    );
  }

  return (
    <div className="h-20 flex flex-col">
      <ResponsiveContainer width="100%" height={45}>
        <BarChart data={chartData} barGap={2}>
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#94a3b8', fontSize: 10 }} 
            axisLine={false}
            tickLine={false}
            tickMargin={5}
          />
          <Tooltip 
            cursor={false}
            contentStyle={{ 
              background: 'rgba(15, 23, 42, 0.8)', 
              border: '1px solid #334155',
              borderRadius: '0.375rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value: number, name: string) => [
              `${value} stations`,
              name
            ]}
          />
          
          <svg width="0" height="0">
            <defs>
              {chartData.map((entry, index) => {
                const colors = getBarColor(entry.category);
                return (
                  <linearGradient
                    key={`gradient-${index}`}
                    id={`gradient-${index}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor={colors[0]} />
                    <stop offset="100%" stopColor={colors[1]} />
                  </linearGradient>
                );
              })}
            </defs>
          </svg>
          
          <Bar 
            dataKey="value" 
            radius={[4, 4, 0, 0]}
            style={{ 
              filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`}
                fill={`url(#gradient-${index})`} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      <div className="flex justify-center items-center mt-1 gap-2">
        {chartData.map((entry, index) => {
          const colors = getBarColor(entry.category);
          const status = getStatusText(entry.category, entry.value);
          
          return (
            <TooltipProvider key={`status-${index}`}>
              <div className="flex flex-col items-center">
                <div 
                  className={cn(
                    "text-white text-md px-2 py-0.5 rounded font-medium ",
                    entry.category === 'mux' ? "bg-gradient-to-r from-green-400 to-green-600" :
                    entry.category === 'reserve' ? "bg-gradient-to-r from-blue-400 to-blue-600" :
                    entry.category === 'unknown' ? "bg-gradient-to-r from-gray-400 to-gray-600" :
                    "bg-gradient-to-r from-red-400 to-red-600"
                  )}
                >
                  {entry.value}
                </div>
                <span className="text-xs text-gray-400 mt-0.5">
                  {status}
                </span>
              </div>
            </TooltipProvider>
          );
        })}
      </div>
      
      {/* Show facility breakdown if there are multiple facilities */}
      {Object.keys(transmitterDataByFacility).length > 1 && (
        <div className="mt-1 text-md text-black text-center">
          Across {Object.keys(transmitterDataByFacility).length} facilities
        </div>
      )}
    </div>
  );
};

export default TransmitterAnalysisChart;
