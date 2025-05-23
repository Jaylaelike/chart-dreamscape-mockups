
import { BarChart, Bar, ResponsiveContainer, Cell, XAxis, Tooltip } from 'recharts';
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

interface TransmitterChartProps {
  value?: number;
  secondaryValue?: number;
}

const TransmitterChart = ({ 
  value = 50, 
  secondaryValue = value - 10 
}: TransmitterChartProps) => {
  const data = [
    { name: 'TX A', value: value },
    { name: 'TX B', value: secondaryValue },
  ];

  // Modern gradient colors
  const getBarColor = (val: number) => {
    if (val >= 75) return ['#4ade80', '#10b981']; // High - green gradient
    if (val >= 50) return ['#60a5fa', '#3b82f6']; // Medium - blue gradient
    if (val >= 25) return ['#f59e0b', '#d97706']; // Low - amber gradient
    return ['#ef4444', '#b91c1c']; // Critical - red gradient
  };

  const getStatusText = (val: number) => {
    if (val >= 75) return "Excellent";
    if (val >= 50) return "On-Air";
    if (val >= 25) return "Low";
    return "Critical";
  };

  return (
    <div className="h-20 flex flex-col">
      <ResponsiveContainer width="100%" height={45}>
        <BarChart data={data} barGap={2}>
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#94a3b8', fontSize: 10 }} 
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            cursor={false}
            contentStyle={{ 
              background: 'rgba(15, 23, 42, 0.8)', 
              border: '1px solid #334155',
              borderRadius: '0.375rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`}
                fill={`url(#gradient-${index})`} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      <div className="flex justify-center items-center mt-1 gap-2">
        {data.map((entry, index) => {
          const colors = getBarColor(entry.value);
          const status = getStatusText(entry.value);
          
          return (
            <TooltipProvider key={`status-${index}`}>
              <div className="flex flex-col items-center">
                <div 
                  className={cn(
                    "text-white px-3 py-1 rounded font-medium text-sm",
                    entry.value >= 75 ? "bg-gradient-to-r from-green-400 to-green-600" :
                    entry.value >= 50 ? "bg-gradient-to-r from-blue-400 to-blue-600" :
                    entry.value >= 25 ? "bg-gradient-to-r from-amber-400 to-amber-600" :
                    "bg-gradient-to-r from-red-400 to-red-600"
                  )}
                >
                  {entry.value}
                </div>
                <div className="text-xs text-slate-300 mt-0.5">{entry.name}</div>
              </div>
            </TooltipProvider>
          );
        })}
        
        {/* SVG Gradients */}
        <svg style={{ height: 0 }}>
          {data.map((entry, index) => {
            const colors = getBarColor(entry.value);
            return (
              <defs key={`gradient-def-${index}`}>
                <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={colors[0]} />
                  <stop offset="100%" stopColor={colors[1]} />
                </linearGradient>
              </defs>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default TransmitterChart;
