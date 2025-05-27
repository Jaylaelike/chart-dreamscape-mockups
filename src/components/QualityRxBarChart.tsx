import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LabelList,
    ResponsiveContainer
} from "recharts";

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

interface QualityTxBarChartProps {
    data: IrdHarmonicData[];
}

const QualityTxBarChart: React.FC<QualityTxBarChartProps> = ({ data }) => {
    // Calculate Min, Max, Avg for Link_Margin, C_N, and EbNo
    const calculateStats = (values: number[]) => {
        if (values.length === 0) return { min: 0, max: 0, avg: 0 };
        
        const min = Math.min(...values);
        const max = Math.max(...values);
        const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
        
    return {
            min: parseFloat(min.toFixed(2)),
            max: parseFloat(max.toFixed(2)),
            avg: parseFloat(avg.toFixed(2))
    };
  };

  // Extract numeric values from strings
  const linkMarginValues = data
    .map(item => parseFloat(item.Link_Margin))
    .filter(val => !isNaN(val));
  
  const cnValues = data
    .map(item => parseFloat(item.C_N))
    .filter(val => !isNaN(val));
  
  const ebNoValues = data
    .map(item => parseFloat(item.EbNo))
    .filter(val => !isNaN(val));

  // Calculate statistics
  const linkMarginStats = calculateStats(linkMarginValues);
  const cnStats = calculateStats(cnValues);
  const ebNoStats = calculateStats(ebNoValues);

  // Prepare chart data
  const chartData = [
    {
      name: "Link Margin",
      Min: linkMarginStats.min,
      Max: linkMarginStats.max,
      Avg: linkMarginStats.avg
    },
    {
      name: "C/N",
      Min: cnStats.min,
      Max: cnStats.max,
      Avg: cnStats.avg
    },
    {
      name: "EbNo",
      Min: ebNoStats.min,
      Max: ebNoStats.max,
      Avg: ebNoStats.avg
    }
  ];

  return (
    <div className="h-32">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 10,
            left: 10,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#9CA3AF', fontSize: 10 }}
            axisLine={{ stroke: '#374151' }}
          />
          <YAxis 
            tick={{ fill: '#9CA3AF', fontSize: 10 }}
            axisLine={{ stroke: '#374151' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '6px',
              color: '#F3F4F6'
            }}
          />
          <Legend 
            wrapperStyle={{
              color: '#9CA3AF',
              fontSize: '12px'
            }}
          />
          <Bar dataKey="Min" fill="#EF4444" minPointSize={5}>
            <LabelList 
              dataKey="Min" 
              position="top" 
              style={{ fill: '#EF4444', fontSize: '10px' }}
            />
          </Bar>
          <Bar dataKey="Max" fill="#10B981" minPointSize={5}>
            <LabelList 
              dataKey="Max" 
              position="top" 
              style={{ fill: '#10B981', fontSize: '10px' }}
            />
          </Bar>
          <Bar dataKey="Avg" fill="#3B82F6" minPointSize={5}>
            <LabelList 
              dataKey="Avg" 
              position="top" 
              style={{ fill: '#3B82F6', fontSize: '10px' }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default QualityTxBarChart;
