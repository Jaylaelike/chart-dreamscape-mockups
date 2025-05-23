import StatusIndicator from "@/components/StatusIndicator";
import QualityChart from "@/components/QualityChart";
import TransmitterChart from "@/components/TransmitterChart";
import MonitoringCard from "./MonitoringCard";

const AdditionStationsContent = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
        <MonitoringCard title="Quality Measurement TX [NEC]">
          <QualityChart />
        </MonitoringCard>

        <MonitoringCard title="Quality Measurement RX">
          <QualityChart />
        </MonitoringCard>

        <MonitoringCard title="On Air">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
            <StatusIndicator status="active" value="54" size="sm" />
            <StatusIndicator status="inactive" value="0" size="sm" />
            <StatusIndicator status="inactive" value="0" size="sm" />
            <StatusIndicator status="active" value="54" size="sm" />
          </div>
        </MonitoringCard>

        <MonitoringCard title="PEA & MEA Status">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
            <StatusIndicator status="inactive" value="0" size="sm" />
            <StatusIndicator status="active" value="54" size="sm" />
            <StatusIndicator status="active" value="54" size="sm" />
            <StatusIndicator status="active" value="54" size="sm" />
          </div>
        </MonitoringCard>

        <MonitoringCard title="NT Link Status">
          <StatusIndicator status="active" value="127" />
        </MonitoringCard>

        <MonitoringCard title="Satellite Link Status">
          <div className="grid grid-cols-2 gap-1">
            <StatusIndicator status="active" value="129" size="sm" />
            <StatusIndicator status="inactive" value="0" size="sm" />
          </div>
        </MonitoringCard>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
        <MonitoringCard title="Artificial delay">
          <QualityChart showDelay />
        </MonitoringCard>

        <MonitoringCard title="Transmitter">
          <TransmitterChart value={25} />
        </MonitoringCard>

        <MonitoringCard title="Downtime">
          <div className="flex items-center justify-center h-16 md:h-20">
            <div className="bg-gradient-to-r from-slate-600 to-slate-700 px-4 py-2 rounded-lg border border-slate-500/50 shadow-md hover:shadow-lg transition-all duration-200">
              <span className="text-slate-300 text-lg font-semibold">N/A</span>
            </div>
          </div>
        </MonitoringCard>

        <MonitoringCard title="Electrical Fault">
          <div className="flex items-center justify-center h-16 md:h-20">
            <div className="bg-gradient-to-r from-slate-600 to-slate-700 px-4 py-2 rounded-lg border border-slate-500/50 shadow-md hover:shadow-lg transition-all duration-200">
              <span className="text-slate-300 text-lg font-semibold">N/A</span>
            </div>
          </div>
        </MonitoringCard>

        <MonitoringCard title="NT Link Fault">
          <div className="flex items-center justify-center h-16 md:h-20">
            <div className="text-center bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-3 rounded-lg border border-amber-400/30 backdrop-blur-sm hover:border-amber-400/50 transition-all duration-200 shadow-md">
              <div className="text-amber-400 font-medium text-xs leading-tight space-y-0.5">
                <div className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent font-semibold">ปทุมราชวงศา</div>
                <div className="text-amber-300/90">เวียงแห่ง</div>
                <div className="text-amber-300/90">อสมท</div>
                <div className="text-amber-300/80 font-medium">ททบ.</div>
              </div>
            </div>
          </div>
        </MonitoringCard>

        <MonitoringCard title="Satellite Link Fault">
          <div className="flex items-center justify-center h-16 md:h-20">
            <div className="bg-gradient-to-r from-slate-600 to-slate-700 px-4 py-2 rounded-lg border border-slate-500/50 shadow-md hover:shadow-lg transition-all duration-200">
              <span className="text-slate-300 text-lg font-semibold">N/A</span>
            </div>
          </div>
        </MonitoringCard>
      </div>
    </div>
  );
};

export default AdditionStationsContent;
