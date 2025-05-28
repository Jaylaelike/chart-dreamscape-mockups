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

interface QualityTxBarChartProps {
    data: TxControlData[];
}

const QualityTxBarChart: React.FC<QualityTxBarChartProps> = ({ data }) => {
    // Calculate Min, Max, Avg for Output_Power_Percent, IMD, and MER
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

    // Extract numeric values from strings and exclude 0 values
    const outputPowerValues = data
        .map(item => parseFloat(item.Output_Power_Percent))
        .filter(val => !isNaN(val) && val !== 0);
    
    // For IMD, exclude 0 values and use absolute values to make them non-negative
    const imdValues = data
        .map(item => parseFloat(item.IMD))
        .filter(val => !isNaN(val) && val !== 0)
        .map(val => Math.abs(val));
    
    const merValues = data
        .map(item => parseFloat(item.MER))
        .filter(val => !isNaN(val) && val !== 0);

    // Calculate statistics
    const outputPowerStats = calculateStats(outputPowerValues);
    const imdStats = calculateStats(imdValues);
    const merStats = calculateStats(merValues);

    // Prepare chart data
    const chartData = [
        {
            name: "Output %",
            Min: outputPowerStats.min,
            Max: outputPowerStats.max,
            Avg: outputPowerStats.avg
        },
        {
            name: "IMD",
            Min: imdStats.min,
            Max: imdStats.max,
            Avg: imdStats.avg
        },
        {
            name: "MER",
            Min: merStats.min,
            Max: merStats.max,
            Avg: merStats.avg
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