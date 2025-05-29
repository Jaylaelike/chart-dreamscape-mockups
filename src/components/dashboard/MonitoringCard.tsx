
import { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface MonitoringCardProps {
  title: string;
  children: ReactNode;
}

const MonitoringCard = ({ title, children }: MonitoringCardProps) => {
  return (
    <Card className="bg-gradient-to-br from-white to-slate-50 border-slate-200 h-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2">
      <CardHeader className="pb-2 p-3 sm:p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-lg">
        <CardTitle className="text-sm sm:text-base md:text-md text-center text-white font-bold tracking-wide drop-shadow-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-4 pt-2">
        {children}
      </CardContent>
    </Card>
  );
};

export default MonitoringCard;
