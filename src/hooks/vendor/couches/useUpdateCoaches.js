import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCoachesAndAcademy } from "../../../services/vendor/coaches/endpointApi";

export const useUpdateCoachesAndAcademy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCoachesAndAcademy,

    onSuccess: () => {
      // 🔥 List API ko turant refresh kar do
      queryClient.invalidateQueries(["coachesAcademyList"]);
    },
  });
};
