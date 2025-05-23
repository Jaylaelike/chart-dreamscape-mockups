
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
      <div className="mt-4 flex justify-center gap-8 text-sm">
        <div className="flex gap-2">
          <span className="text-yellow-400">Downtime:</span>
          <div className="bg-pink-500 px-2 rounded">00:00:00</div>
        </div>
        <div className="flex gap-2">
          <span className="text-yellow-400">Total Time:</span>
          <div className="bg-yellow-500 text-black px-2 rounded">0.000000</div>
        </div>
        <div className="flex gap-2">
          <span className="text-yellow-400">SLA deduct:</span>
          <div className="bg-green-500 text-black px-2 rounded">0.000000</div>
        </div>
        <div className="flex gap-2">
          <span className="text-yellow-400">SLA remain:</span>
          <div className="bg-green-500 text-black px-2 rounded">100.000000</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
