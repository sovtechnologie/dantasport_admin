import { useQuery } from "@tanstack/react-query";
import { coachesAcademyListgetAll } from "../../../services/vendor/coaches/endpointApi.js";

export const useGetCoaches = () => {
  return useQuery({
    queryKey: ["coachesListAll"],
    queryFn: coachesAcademyListgetAll,
   select: (res) => res?.result || [],
    refetchOnWindowFocus: false,   // window switch pe dubara call mat karo
    staleTime: 5 * 60 * 1000,      // 5 minute tak fresh rakho
    retry: false,                  // error pe bar bar try mat karo
  });
};
