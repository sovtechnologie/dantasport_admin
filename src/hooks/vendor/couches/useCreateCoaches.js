// src/hooks/useCreateCoachesAndAcademy.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCoachesAndAcademy } from "../../../services/vendor/coaches/endpointApi";

export const useCreateCoachesAndAcademy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCoachesAndAcademy,
    onSuccess: (data) => {
      // optional: invalidate or refetch list
      queryClient.invalidateQueries(["coachesAcademyList"]);
      console.log("Coach/Academy created successfully:", data);
    },
    onError: (error) => {
      console.error("Failed to create coach/academy:", error);
    },
  });
};
