
import StatusIndicator from "@/components/StatusIndicator";
import QualityChart from "@/components/QualityChart";
import TransmitterChart from "@/components/TransmitterChart";
import MonitoringCard from "./MonitoringCard";

const AdditionStationsContent = () => {
  return (
    <>
      <div className="grid grid-cols-6 gap-4">
        <MonitoringCard title="Quality Measurement TX [NEC]">
          <QualityChart />
        </MonitoringCard>

        <MonitoringCard title="Quality Measurement RX">
          <QualityChart />
        </MonitoringCard>

        <MonitoringCard title="On Air">
          <div className="grid grid-cols-4 gap-1">
            <StatusIndicator status="active" value="54" size="sm" />
            <StatusIndicator status="inactive" value="0" size="sm" />
            <StatusIndicator status="inactive" value="0" size="sm" />
            <StatusIndicator status="active" value="54" size="sm" />
          </div>
        </MonitoringCard>

        <MonitoringCard title="PEA & MEA Status">
          <div className="grid grid-cols-4 gap-1">
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

      <div className="grid grid-cols-6 gap-4 mt-4">
        <MonitoringCard title="Artificial delay">
          <QualityChart showDelay />
        </MonitoringCard>

        <MonitoringCard title="Transmitter">
          <TransmitterChart value={25} />
        </MonitoringCard>

        <MonitoringCard title="Downtime">
          <div className="flex items-center justify-center h-20">
            <span className="text-orange-400 text-lg">N/A</span>
          </div>
        </MonitoringCard>

        <MonitoringCard title="Electrical Fault">
          <div className="flex items-center justify-center h-20">
            <span className="text-orange-400 text-lg">N/A</span>
          </div>
        </MonitoringCard>

        <MonitoringCard title="NT Link Fault">
          <div className="flex items-center justify-center h-20">
            <div className="text-center text-orange-400 text-xs">
              <div>ปราบรามงานครา</div>
              <div>เงียบแง่ง</div>
              <div>อสังหา</div>
              <div>ทรท.</div>
            </div>
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

export default AdditionStationsContent;
