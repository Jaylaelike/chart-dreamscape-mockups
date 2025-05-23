
import { BarChart, Bar, ResponsiveContainer } from 'recharts';

interface TransmitterChartProps {
  value?: number;
}

const TransmitterChart = ({ value = 50 }: TransmitterChartProps) => {
  const data = [
    { name: 'TX A', value: value },
    { name: 'TX B', value: value - 10 },
  ];

  return (
    <div className="h-20 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="bg-green-500 text-white px-4 py-2 rounded font-bold text-lg">
          {value}
        </div>
        <div className="text-xs text-white mt-1">On-Air</div>
      </div>
    </div>
  );
};

export default TransmitterChart;
