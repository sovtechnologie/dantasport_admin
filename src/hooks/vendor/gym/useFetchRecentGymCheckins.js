import { useQuery } from '@tanstack/react-query';
import { getRecentGymCheckins } from '../../../services/vendor/gym/endpointApi';

export const useFetchRecentGymCheckins = ({ gymId }) => {
  return useQuery({
    queryKey: ['recentGymCheckins', gymId],
    queryFn: () => getRecentGymCheckins({ gymId }),
    enabled: !!gymId,
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // Refetch every minute
  });
};
