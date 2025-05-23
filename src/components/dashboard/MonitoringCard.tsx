
import { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface MonitoringCardProps {
  title: string;
  children: ReactNode;
}

const MonitoringCard = ({ title, children }: MonitoringCardProps) => {
  return (
    <Card className="bg-blue-600 border-blue-500">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-center text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default MonitoringCard;
