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

interface ArtificialDelayBarChartProps {
    data: DailyReporterData[];
}

const ArtificialDelayBarChart: React.FC<ArtificialDelayBarChartProps> = ({ data }) => {
    // Calculate Min, Max, Avg for SFN and Emission
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
    const sfnValues = data
        .map(item => parseFloat(item.SFN))
        .filter(val => !isNaN(val));
    
    const emissionValues = data
        .map(item => parseFloat(item.Emission))
        .filter(val => !isNaN(val));

    // Calculate statistics
    const sfnStats = calculateStats(sfnValues);
    const emissionStats = calculateStats(emissionValues);

    // Prepare chart data
    const chartData = [
        {
            name: "SFN",
            Min: sfnStats.min,
            Max: sfnStats.max,
            Avg: sfnStats.avg
        },
        {
            name: "Emission",
            Min: emissionStats.min,
            Max: emissionStats.max,
            Avg: emissionStats.avg
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

export default ArtificialDelayBarChart;
