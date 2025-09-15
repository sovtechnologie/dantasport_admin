import { useQuery } from '@tanstack/react-query';
import { getPendingGymCheckins } from '../../../services/vendor/gym/endpointApi';

export const useFetchPendingGymCheckins = ({ gymId }) => {
  return useQuery({
    queryKey: ['pendingGymCheckins', gymId],
    queryFn: () => getPendingGymCheckins({ gymId }),
    enabled: !!gymId,
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // Refetch every minute
  });
};
