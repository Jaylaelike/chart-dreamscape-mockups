
import { useState, useEffect } from "react";
import { Clock, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useSLAMetrics } from "@/hooks/useSLAMetrics";

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const { data: slaMetrics, isLoading, isError } = useSLAMetrics();
  
  // Update the current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
  // Get the most recent SLA metric (assuming newest entry is most relevant)
  const latestMetric = slaMetrics && slaMetrics.length > 0 ? slaMetrics[0] : null;
  
  return (
    <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="text-center flex-1">
          <h1 className="text-2xl font-bold text-yellow-400">Engineering Department</h1>
          <p className="text-blue-300">Thai Public Broadcasting Service</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{currentTime}</span>
          </div>
          <div className="text-right">
            <div>{new Date().getFullYear()}</div>
            <div className="text-xs text-gray-400">{new Date().toLocaleDateString()} {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
          </div>
        </div>
      </div>
      
      {/* SLA Summary */}
      <div className="mt-6 bg-gray-900/50 rounded-lg p-4 border border-gray-600/30">
        <Link to="/sla-metrics" className="block hover:opacity-90 transition-opacity">
          <h3 className="text-center text-yellow-400 font-semibold mb-4 text-base tracking-wide flex items-center justify-center">
            SLA Performance Metrics
            <span className="ml-2 text-xs bg-blue-500 px-2 py-0.5 rounded-full text-white">Click to manage</span>
          </h3>
        </Link>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-gray-400">Loading SLA metrics...</p>
            </div>
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center py-6 text-red-400">
            <AlertCircle className="mr-2" />
            <p>Error loading SLA metrics</p>
          </div>
        ) : !latestMetric ? (
          <div className="flex items-center justify-center py-6 text-gray-400">
            <p>No SLA metrics found</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-6">
            <Link to="/sla-metrics" className="block">
              <div className="bg-gray-800/80 rounded-lg p-3 border border-gray-600/50 hover:border-pink-400/50 transition-colors cursor-pointer">
                <div className="text-center">
                  <div className="text-pink-400 font-medium text-sm mb-2">Downtime</div>
                  <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-2 rounded-md font-mono text-lg font-bold shadow-lg">
                    {latestMetric.downtime.toFixed(0)} min
                  </div>
                  <div className="text-xs text-gray-400 mt-2">Double-click to edit</div>
                </div>
              </div>
            </Link>
            <Link to="/sla-metrics" className="block">
              <div className="bg-gray-800/80 rounded-lg p-3 border border-gray-600/50 hover:border-yellow-400/50 transition-colors cursor-pointer">
                <div className="text-center">
                  <div className="text-yellow-400 font-medium text-sm mb-2">Total Time</div>
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-3 py-2 rounded-md font-mono text-lg font-bold shadow-lg">
                    {latestMetric.totalTime.toFixed(0)} min
                  </div>
                  <div className="text-xs text-gray-400 mt-2">Double-click to edit</div>
                </div>
              </div>
            </Link>
            <Link to="/sla-metrics" className="block">
              <div className="bg-gray-800/80 rounded-lg p-3 border border-gray-600/50 hover:border-blue-400/50 transition-colors cursor-pointer">
                <div className="text-center">
                  <div className="text-blue-400 font-medium text-sm mb-2">SLA Deduct</div>
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-2 rounded-md font-mono text-lg font-bold shadow-lg">
                    {latestMetric.slaDeduct.toFixed(2)}%
                  </div>
                  <div className="text-xs text-gray-400 mt-2">Double-click to edit</div>
                </div>
              </div>
            </Link>
            <Link to="/sla-metrics" className="block">
              <div className="bg-gray-800/80 rounded-lg p-3 border border-gray-600/50 hover:border-green-400/50 transition-colors cursor-pointer">
                <div className="text-center">
                  <div className="text-green-400 font-medium text-sm mb-2">SLA Remain</div>
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-2 rounded-md font-mono text-lg font-bold shadow-lg">
                    {latestMetric.slaRemain.toFixed(2)}%
                  </div>
                  <div className="text-xs text-gray-400 mt-2">Double-click to edit</div>
                </div>
              </div>
            </Link>
          </div>
        )}        
      </div>
    </div>
  );
};

export default Header;
