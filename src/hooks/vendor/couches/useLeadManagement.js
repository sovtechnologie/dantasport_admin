import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getLeadMangementSystem,
  updateLeadMangmentSystem,
} from "../../../services/vendor/coaches/endpointApi";

// GET LEADS HOOK
export const useGetLeads = (filters) => {
  return useQuery({
    queryKey: ["leads", filters],
    queryFn: () => getLeadMangementSystem(filters),
    keepPreviousData: true,
  });
};

// UPDATE + AUTO REFRESH HOOK
export const useUpdateLead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => updateLeadMangmentSystem(payload),

    onSuccess: () => {
      // 👇 Update ke baad get wali query refetch ho jayegi
      queryClient.invalidateQueries(["leads"]);
    },
  });
};
