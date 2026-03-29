import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { addGyme } from "../../../services/vendor/gym/endpointApi";

export const useAddGyme = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      console.log("📤 Sending gym payload:", formData);
      const data = await addGyme(formData);
      console.log("✅ Gym added:", data);
      return data;
    },
    onSuccess: (data) => {
      message.success("Gym added successfully!");
      queryClient.invalidateQueries({ queryKey: ["gymList"] });
    },
    onError: (error) => {
      console.error("❌ Add gym failed:", error);
      const errorMessage =
        error?.response?.data?.message || error?.message || "Failed to add gym";
      message.error(errorMessage);
    },
  });
};
