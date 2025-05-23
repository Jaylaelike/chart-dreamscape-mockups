
import StatusIndicator from "@/components/StatusIndicator";
import QualityChart from "@/components/QualityChart";
import TransmitterChart from "@/components/TransmitterChart";
import MonitoringCard from "./MonitoringCard";

const MainStationsContent = () => {
  return (
    <>
      <div className="grid grid-cols-6 gap-4">
        <MonitoringCard title="Quality Measurement TX">
          <QualityChart />
        </MonitoringCard>

        <MonitoringCard title="Quality Measurement RX">
          <QualityChart />
        </MonitoringCard>

        <MonitoringCard title="On Air">
          <StatusIndicator status="active" value="53" />
        </MonitoringCard>

        <MonitoringCard title="PEA & MEA Status">
          <StatusIndicator status="active" value="53" />
        </MonitoringCard>

        <MonitoringCard title="NT Link Status">
          <StatusIndicator status="active" value="53" />
        </MonitoringCard>

        <MonitoringCard title="Satellite Link Status">
          <StatusIndicator status="active" value="39" />
        </MonitoringCard>
      </div>

      <div className="grid grid-cols-6 gap-4 mt-4">
        <MonitoringCard title="Artificial delay">
          <QualityChart showDelay />
        </MonitoringCard>

        <MonitoringCard title="Transmitter">
          <TransmitterChart />
        </MonitoringCard>

        <MonitoringCard title="Downtime">
          <div className="flex items-center justify-center h-20">
            <span className="text-orange-400 text-lg">N/A</span>
          </div>
        </MonitoringCard>

        <MonitoringCard title="Electrical Fault">
          <div className="flex items-center justify-center h-20">
            <div className="text-center">
              <div className="text-orange-400">เขียวใหม่</div>
              <div className="text-xs text-orange-300">ส.ส.ท.</div>
            </div>
          </div>
        </MonitoringCard>

        <MonitoringCard title="NT Link Fault">
          <div className="flex items-center justify-center h-20">
            <span className="text-orange-400 text-lg">N/A</span>
          </div>
        </MonitoringCard>

        <MonitoringCard title="Satellite Link Fault">
          <div className="flex items-center justify-center h-20">
            <span className="text-orange-400 text-lg">N/A</span>
          </div>
        </MonitoringCard>
      </div>
    </>
  );
};

export default MainStationsContent;
