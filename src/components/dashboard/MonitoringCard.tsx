
import { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface MonitoringCardProps {
  title: string;
  children: ReactNode;
}

const MonitoringCard = ({ title, children }: MonitoringCardProps) => {
  return (
    <Card className="bg-white border-blue-200 h-full shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-2 p-3 sm:p-4">
        <CardTitle className="text-xs sm:text-sm text-center text-blue-700 font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-4 pt-0">
        {children}
      </CardContent>
    </Card>
  );
};

export default MonitoringCard;
