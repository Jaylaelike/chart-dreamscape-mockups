
import { useState } from "react";
import { Clock } from "lucide-react";

const Header = () => {
  const [currentTime] = useState(new Date().toLocaleTimeString());
  
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
            <div>2024</div>
            <div className="text-xs text-gray-400">5/21/2025 11:08 AM</div>
          </div>
        </div>
      </div>
      
      {/* SLA Summary */}
      <div className="mt-6 bg-gray-900/50 rounded-lg p-4 border border-gray-600/30">
        <h3 className="text-center text-yellow-400 font-semibold mb-4 text-base tracking-wide">
          SLA Performance Metrics
        </h3>
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-gray-800/80 rounded-lg p-3 border border-gray-600/50 hover:border-pink-400/50 transition-colors">
            <div className="text-center">
              <div className="text-pink-400 font-medium text-sm mb-2">Downtime</div>
              <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-2 rounded-md font-mono text-lg font-bold shadow-lg">
                00:00:00
              </div>
            </div>
          </div>
          <div className="bg-gray-800/80 rounded-lg p-3 border border-gray-600/50 hover:border-yellow-400/50 transition-colors">
            <div className="text-center">
              <div className="text-yellow-400 font-medium text-sm mb-2">Total Time</div>
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-3 py-2 rounded-md font-mono text-lg font-bold shadow-lg">
                0.000000
              </div>
            </div>
          </div>
          <div className="bg-gray-800/80 rounded-lg p-3 border border-gray-600/50 hover:border-blue-400/50 transition-colors">
            <div className="text-center">
              <div className="text-blue-400 font-medium text-sm mb-2">SLA Deduct</div>
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-2 rounded-md font-mono text-lg font-bold shadow-lg">
                0.000000
              </div>
            </div>
          </div>
          <div className="bg-gray-800/80 rounded-lg p-3 border border-gray-600/50 hover:border-green-400/50 transition-colors">
            <div className="text-center">
              <div className="text-green-400 font-medium text-sm mb-2">SLA Remain</div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-2 rounded-md font-mono text-lg font-bold shadow-lg">
                100.000000
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
