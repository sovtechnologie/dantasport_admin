import { useQuery } from '@tanstack/react-query';
import { getGymTimeSlotList } from '../../../services/vendor/gym/endpointApi';

export const useFetchGymTimeSlots = ({ gymId }) => {
  return useQuery({
    queryKey: ['gymTimeSlots', gymId],
    queryFn: () => getGymTimeSlotList({ gymId }),
    enabled: !!gymId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    onError: (error) => {
      console.error('Failed to fetch gym time slots:', error);
    }
  });
};
