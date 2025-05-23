
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StatusIndicatorProps {
  status: 'active' | 'inactive' | 'fault';
  value: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  tooltip?: string;
}

const StatusIndicator = ({ status, value, size = 'md', label, tooltip }: StatusIndicatorProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return 'bg-gradient-to-br from-green-400 to-green-600 shadow-md shadow-green-500/20';
      case 'inactive':
        return 'bg-gradient-to-br from-red-400 to-red-600 shadow-md shadow-red-500/20';
      case 'fault':
        return 'bg-gradient-to-br from-orange-400 to-orange-600 shadow-md shadow-orange-500/20';
      default:
        return 'bg-gradient-to-br from-slate-400 to-slate-600 shadow-md shadow-slate-500/20';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-6 h-6 md:w-8 md:h-8 text-[10px] md:text-xs';
      case 'lg':
        return 'w-12 h-12 md:w-16 md:h-16 text-base md:text-xl';
      default:
        return 'w-10 h-10 md:w-12 md:h-12 text-xs md:text-sm';
    }
  };

  const indicatorContent = (
    <div className={cn(
      "rounded-lg flex items-center justify-center font-bold border border-white/10",
      getStatusColor(),
      getSizeClasses()
    )}>
      {value}
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {tooltip ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {indicatorContent}
            </TooltipTrigger>
            <TooltipContent className="bg-slate-800 border-slate-700 text-white">
              {tooltip}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        indicatorContent
      )}
      {label && (
        <div className="text-[10px] md:text-xs text-slate-300 mt-1 text-center">{label}</div>
      )}
    </div>
  );
};

export default StatusIndicator;
