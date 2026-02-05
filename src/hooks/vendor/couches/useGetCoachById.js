import { useQuery } from "@tanstack/react-query";
import { getCoachById } from "../../../services/vendor/coaches/endpointApi";

export const useGetCoachById = (id) => {
  return useQuery({
    queryKey: ["coachById", id],
    queryFn: () => getCoachById(id),
    enabled: !!id,
  });
};
