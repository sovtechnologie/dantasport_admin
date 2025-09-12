import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGymMember } from "../../../services/vendor/gym/endpointApi";
import { message } from "antd";

export const useUpdateGymMember = (gymId, vendorId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      try {
        console.log("📤 Updating gym member with payload:", payload);

        const response = await updateGymMember(payload);
        
        console.log("✅ Update gym member response:", response);
        
        if (response?.status === 200) {
          return response;
        } else {
          throw new Error(response?.message || "Failed to update gym member");
        }
      } catch (error) {
        console.error("❌ Update gym member error:", error);
        throw error;
      }
    },
    onSuccess: (data, variables) => {
      console.log("🎉 Gym member updated successfully:", data);
      message.success("Gym member updated successfully!");
      
      // Invalidate and refetch gym members list with specific gym and vendor
      if (gymId && vendorId) {
        queryClient.invalidateQueries({ queryKey: ["gymMembers", gymId, vendorId] });
      }
      // Also invalidate all gym members queries as fallback
      queryClient.invalidateQueries({ queryKey: ["gymMembers"] });
    },
    onError: (error) => {
      console.error("❌ Update gym member failed:", error);
      const errorMessage = error?.response?.data?.message || error?.message || "Failed to update gym member";
      message.error(errorMessage);
    },
  });
};
