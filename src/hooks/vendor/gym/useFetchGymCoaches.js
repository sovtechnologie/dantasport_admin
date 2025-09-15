import { useQuery } from '@tanstack/react-query';
import { getGymCoachesList } from '../../../services/vendor/gym/endpointApi';

export const useFetchGymCoaches = ({ gymId, type = "gym" }) => {
  return useQuery({
    queryKey: ['gymCoaches', gymId, type],
    queryFn: () => getGymCoachesList({ gymId, type }),
    enabled: !!gymId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    onError: (error) => {
      console.error('Failed to fetch gym coaches:', error);
    }
  });
};
