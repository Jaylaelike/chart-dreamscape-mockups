
import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: 'active' | 'inactive' | 'fault';
  value: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const StatusIndicator = ({ status, value, size = 'md', label }: StatusIndicatorProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return 'bg-green-500 text-white';
      case 'inactive':
        return 'bg-red-500 text-white';
      case 'fault':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8 text-xs';
      case 'lg':
        return 'w-16 h-16 text-xl';
      default:
        return 'w-12 h-12 text-sm';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className={cn(
        "rounded flex items-center justify-center font-bold",
        getStatusColor(),
        getSizeClasses()
      )}>
        {value}
      </div>
      {label && (
        <div className="text-xs text-white mt-1 text-center">{label}</div>
      )}
    </div>
  );
};

export default StatusIndicator;
