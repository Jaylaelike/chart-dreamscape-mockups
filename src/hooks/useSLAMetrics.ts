import { 
  useQuery, 
  useMutation, 
  useQueryClient,
  QueryClient
} from '@tanstack/react-query';
import { 
  getAllSLAMetrics, 
  getSLAMetricById, 
  createSLAMetric, 
  updateSLAMetric, 
  deleteSLAMetric,
  SLAMetricInput,
  SLAMetricUpdateInput
} from '@/api/slaMetrics';

// Query keys
export const slaMetricsKeys = {
  all: ['slaMetrics'] as const,
  lists: () => [...slaMetricsKeys.all, 'list'] as const,
  list: (filters: string) => [...slaMetricsKeys.lists(), { filters }] as const,
  details: () => [...slaMetricsKeys.all, 'detail'] as const,
  detail: (id: number) => [...slaMetricsKeys.details(), id] as const,
};

// Hook to fetch all SLA metrics
export function useSLAMetrics() {
  return useQuery({
    queryKey: slaMetricsKeys.lists(),
    queryFn: getAllSLAMetrics,
    refetchInterval: 600000 , // Refetch every 10 minutes
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}

// Hook to fetch a single SLA metric
export function useSLAMetric(id: number) {
  return useQuery({
    queryKey: slaMetricsKeys.detail(id),
    queryFn: () => getSLAMetricById(id),
    enabled: !!id,
  });
}

// Hook to create a new SLA metric
export function useCreateSLAMetric() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newMetric: SLAMetricInput) => createSLAMetric(newMetric),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: slaMetricsKeys.lists() });
    },
  });
}

// Hook to update an SLA metric
export function useUpdateSLAMetric() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: SLAMetricUpdateInput }) => 
      updateSLAMetric(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: slaMetricsKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: slaMetricsKeys.lists() });
    },
  });
}

// Hook to delete an SLA metric
export function useDeleteSLAMetric() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteSLAMetric(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: slaMetricsKeys.lists() });
    },
  });
}
