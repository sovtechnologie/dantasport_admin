import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMember } from "../../../services/vendor/members/endpointApi";
import { message } from "antd";

export const useUpdateMember = (venueId, vendorId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      try {
        console.log("📤 Updating member with data:", payload);

        const response = await updateMember(payload);
        
        console.log("✅ Update member response:", response);
        
        if (response?.status === 200) {
          return response;
        } else {
          throw new Error(response?.message || "Failed to update member");
        }
      } catch (error) {
        console.error("❌ Update member error:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log("🎉 Member updated successfully:", data);
      message.success("Member updated successfully!");
      
      // Invalidate and refetch members list with specific venue and vendor
      if (venueId && vendorId) {
        queryClient.invalidateQueries({ queryKey: ["members", venueId, vendorId] });
      }
      // Also invalidate all members queries as fallback
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: (error) => {
      console.error("❌ Update member failed:", error);
      
      // Handle different error response formats
      let errorMessage = "Failed to update member";
      
      if (error?.response?.data) {
        // API error response format: {"status":500,"message":"Mobile number already exists"}
        errorMessage = error.response.data.message || errorMessage;
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      console.error("📝 Error details:", {
        status: error?.response?.status,
        statusText: error?.response?.statusText,
        data: error?.response?.data,
        message: errorMessage
      });
      
      message.error(errorMessage);
    },
  });
};
