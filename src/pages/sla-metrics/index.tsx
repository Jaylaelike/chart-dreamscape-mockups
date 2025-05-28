import React from 'react';
import { SLAMetricsTable } from '@/components/sla-metrics/SLAMetricsTable';
import { SLAMetricsForm } from '@/components/sla-metrics/SLAMetricsForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SLAMetricsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">SLA Performance Metrics</h1>
      
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="add">Add New Metric</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">SLA Metrics Dashboard</h2>
            <p className="text-gray-500 mb-4">
              Double-click on Downtime, Total Time, SLA Deduct, or SLA Remain values to edit them directly.
            </p>
            <SLAMetricsTable />
          </div>
        </TabsContent>
        <TabsContent value="add">
          <div className="max-w-2xl mx-auto">
            <SLAMetricsForm />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
