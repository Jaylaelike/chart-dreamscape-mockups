// Using browser fetch API instead of direct Prisma calls
import { SLAPerformanceMetric } from '@prisma/client';

// Type for creating or updating SLA metrics
export type SLAMetricInput = {
  downtime: number;
  totalTime: number;
  slaDeduct: number;
  slaRemain: number;
};
export type SLAMetricUpdateInput = Partial<SLAMetricInput>;

// Get all SLA metrics
export async function getAllSLAMetrics(): Promise<SLAPerformanceMetric[]> {
  const response = await fetch(import.meta.env.VITE_CONFIG_SLA_URL + 'api/sla-metrics');
  if (!response.ok) {
    throw new Error('Failed to fetch SLA metrics');
  }
  return await response.json();
}

// Get a single SLA metric by ID
export async function getSLAMetricById(id: number): Promise<SLAPerformanceMetric | null> {
  const response = await fetch( import.meta.env.VITE_CONFIG_SLA_URL + `api/sla-metrics/${id}`);
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error(`Failed to fetch SLA metric with ID ${id}`);
  }
  return await response.json();
}

// Create a new SLA metric
export async function createSLAMetric(data: SLAMetricInput): Promise<SLAPerformanceMetric> {
  const response = await fetch(import.meta.env.VITE_CONFIG_SLA_URL + 'api/sla-metrics', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create SLA metric');
  }
  
  return await response.json();
}

// Update an existing SLA metric
export async function updateSLAMetric(id: number, data: SLAMetricUpdateInput): Promise<SLAPerformanceMetric> {
  const response = await fetch(import.meta.env.VITE_CONFIG_SLA_URL + `api/sla-metrics/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `Failed to update SLA metric with ID ${id}`);
  }
  
  return await response.json();
}

// Delete an SLA metric
export async function deleteSLAMetric(id: number): Promise<void> {
  const response = await fetch(import.meta.env.VITE_CONFIG_SLA_URL + `api/sla-metrics/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `Failed to delete SLA metric with ID ${id}`);
  }
}
