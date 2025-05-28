import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateSLAMetric } from '@/hooks/useSLAMetrics';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Form validation schema
const formSchema = z.object({
  downtime: z.number().min(0, 'Downtime must be at least 0'),
  totalTime: z.number().min(0, 'Total time must be at least 0'),
  slaDeduct: z.number().min(0, 'SLA deduction must be at least 0'),
  slaRemain: z.number().min(0, 'SLA remaining must be at least 0'),
});

type FormValues = z.infer<typeof formSchema>;

export function SLAMetricsForm() {
  const createMetric = useCreateSLAMetric();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      downtime: 0,
      totalTime: 0,
      slaDeduct: 0,
      slaRemain: 100,
    },
  });

  const onSubmit = (data: FormValues) => {
    // Ensure all required fields are present for SLAMetricInput
    const metricData = {
      downtime: data.downtime,
      totalTime: data.totalTime,
      slaDeduct: data.slaDeduct,
      slaRemain: data.slaRemain
    };
    
    createMetric.mutate(metricData, {
      onSuccess: () => {
        toast.success('SLA metric created successfully');
        form.reset();
      },
      onError: (error) => {
        toast.error(`Failed to create SLA metric: ${error instanceof Error ? error.message : 'Unknown error'}`);
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New SLA Metric</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Removed stationId field */}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="downtime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Downtime (minutes)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="0" 
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="totalTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Time (minutes)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="0" 
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="slaDeduct"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SLA Deduct (%)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01"
                        placeholder="0" 
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="slaRemain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SLA Remain (%)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01"
                        placeholder="100" 
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={createMetric.isPending}
            >
              {createMetric.isPending ? 'Creating...' : 'Create SLA Metric'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
