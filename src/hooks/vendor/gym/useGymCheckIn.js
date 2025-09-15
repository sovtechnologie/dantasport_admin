import { useMutation, useQueryClient } from '@tanstack/react-query';
import { gymCheckIn } from '../../../services/vendor/gym/endpointApi';
import { message } from 'antd';

export const useGymCheckIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: gymCheckIn,
    onSuccess: (data) => {
      message.success('Check-in successful');
      // Invalidate and refetch related queries
      queryClient.invalidateQueries({ queryKey: ['pendingGymCheckins'] });
      queryClient.invalidateQueries({ queryKey: ['recentGymCheckins'] });
    },
    onError: (error) => {
      console.error('Check-in error:', error);
      message.error(error.response?.data?.message || 'Check-in failed');
    },
  });
};
