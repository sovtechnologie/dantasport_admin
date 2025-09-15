import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addGymMember } from "../../../services/vendor/gym/endpointApi";
import { message } from "antd";

export const useAddGymMember = (gymId, vendorId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      try {
        console.log("📤 Adding gym member with formData:", formData);

        const response = await addGymMember(formData);
        
        console.log("✅ Add gym member response:", response);
        
        if (response?.status === 200 || response?.status === 201) {
          return response;
        } else {
          throw new Error(response?.message || "Failed to add gym member");
        }
      } catch (error) {
        console.error("❌ Add gym member error:", error);
        throw error;
      }
    },
    onSuccess: (data, variables) => {
      console.log("🎉 Gym member added successfully:", data);
      message.success("Gym member added successfully!");
      
      // Invalidate and refetch gym members list with specific gym and vendor
      if (gymId && vendorId) {
        queryClient.invalidateQueries({ queryKey: ["gymMembers", gymId, vendorId] });
      }
      // Also invalidate all gym members queries as fallback
      queryClient.invalidateQueries({ queryKey: ["gymMembers"] });
    },
    onError: (error) => {
      console.error("❌ Add gym member failed:", error);
      const errorMessage = error?.response?.data?.message || error?.message || "Failed to add gym member";
      message.error(errorMessage);
    },
  });
};
