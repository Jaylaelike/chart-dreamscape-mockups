
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface QualityChartProps {
  showDelay?: boolean;
}

const QualityChart = ({ showDelay = false }: QualityChartProps) => {
  const data = showDelay ? [
    { name: 'SPF90', Min: 540, Avg: 650, Max: 780 },
    { name: 'Environment', Min: 480, Avg: 590, Max: 720 },
  ] : [
    { name: 'All Gateways', Min: 45, Avg: 55, Max: 65 },
    { name: 'VF Pol', Min: 35, Avg: 45, Max: 55 },
    { name: 'External', Min: 40, Avg: 50, Max: 60 },
  ];

  return (
    <div className="h-32">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 10, fill: 'white' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide />
          <Bar dataKey="Min" fill="#ef4444" />
          <Bar dataKey="Avg" fill="#f59e0b" />
          <Bar dataKey="Max" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-2 mt-1">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-red-500"></div>
          <span className="text-xs text-white">Min</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-yellow-500"></div>
          <span className="text-xs text-white">Avg</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-500"></div>
          <span className="text-xs text-white">Max</span>
        </div>
      </div>
    </div>
  );
};

export default QualityChart;
