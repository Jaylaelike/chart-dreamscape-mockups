import React, { useState } from 'react';
import { useSLAMetrics, useUpdateSLAMetric } from '@/hooks/useSLAMetrics';
import { SLAPerformanceMetric } from '@prisma/client';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type EditableCellProps = {
  value: number;
  field: keyof SLAPerformanceMetric;
  id: number;
  onSave: (id: number, field: keyof SLAPerformanceMetric, value: number) => void;
};

// Editable cell component for double-click functionality
const EditableCell: React.FC<EditableCellProps> = ({ value, field, id, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onSave(id, field, editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center space-x-1">
        <Input
          type="number"
          step={field === 'slaDeduct' || field === 'slaRemain' ? 0.01 : 1}
          value={editValue}
          onChange={(e) => setEditValue(parseFloat(e.target.value))}
          onKeyDown={handleKeyDown}
          autoFocus
          className="w-20 h-8 text-sm p-1"
        />
        <div className="flex space-x-1">
          <Button size="sm" variant="outline" onClick={handleSave} className="h-6 px-2 py-0">
            Save
          </Button>
          <Button size="sm" variant="outline" onClick={handleCancel} className="h-6 px-2 py-0">
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div onDoubleClick={handleDoubleClick} className="cursor-pointer hover:bg-gray-200 p-2 rounded font-medium text-base transition-colors">
      <span className={`
        ${field === 'downtime' ? 'text-pink-600 font-semibold' : ''}
        ${field === 'totalTime' ? 'text-yellow-600 font-semibold' : ''}
        ${field === 'slaDeduct' ? 'text-blue-600 font-semibold' : ''}
        ${field === 'slaRemain' ? 'text-green-600 font-semibold' : ''}
      `}>
        {field === 'slaDeduct' || field === 'slaRemain' 
          ? `${value.toFixed(2)}%` 
          : field === 'downtime' || field === 'totalTime' 
            ? `${value.toFixed(0)} min` 
            : value}
      </span>
    </div>
  );
};

export function SLAMetricsTable() {
  const { data: metrics, isLoading, isError } = useSLAMetrics();
  const updateMetric = useUpdateSLAMetric();

  const handleUpdateField = (id: number, field: keyof SLAPerformanceMetric, value: number) => {
    updateMetric.mutate(
      {
        id,
        data: { [field]: value }
      },
      {
        onSuccess: () => {
          toast.success(`Updated ${field} successfully`);
        },
        onError: (error) => {
          toast.error(`Failed to update: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
    );
  };

  if (isLoading) return <div className="text-center p-6 text-lg">Loading SLA metrics...</div>;
  if (isError) return <div className="text-center p-6 text-lg text-red-500 font-semibold">Error loading SLA metrics</div>;
  if (!metrics || metrics.length === 0) return <div className="text-center p-6 text-lg">No SLA metrics found</div>;

  return (
    <div className="overflow-x-auto rounded-lg shadow-md border border-gray-700">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-3 text-left border border-gray-700 font-bold text-pink-400 text-base">Downtime (min)</th>
            <th className="p-3 text-left border border-gray-700 font-bold text-yellow-400 text-base">Total Time (min)</th>
            <th className="p-3 text-left border border-gray-700 font-bold text-blue-400 text-base">SLA Deduct (%)</th>
            <th className="p-3 text-left border border-gray-700 font-bold text-green-400 text-base">SLA Remain (%)</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric) => (
            <tr key={metric.id} className="border-b border-gray-700 hover:bg-gray-100 transition-colors">
              <td className="p-3 border border-gray-300">
                <EditableCell 
                  value={metric.downtime} 
                  field="downtime" 
                  id={metric.id} 
                  onSave={handleUpdateField} 
                />
              </td>
              <td className="p-3 border border-gray-300">
                <EditableCell 
                  value={metric.totalTime} 
                  field="totalTime" 
                  id={metric.id} 
                  onSave={handleUpdateField} 
                />
              </td>
              <td className="p-3 border border-gray-300">
                <EditableCell 
                  value={metric.slaDeduct} 
                  field="slaDeduct" 
                  id={metric.id} 
                  onSave={handleUpdateField} 
                />
              </td>
              <td className="p-3 border border-gray-300">
                <EditableCell 
                  value={metric.slaRemain} 
                  field="slaRemain" 
                  id={metric.id} 
                  onSave={handleUpdateField} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
