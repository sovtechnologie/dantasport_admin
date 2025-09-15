import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMember } from "../../../services/vendor/members/endpointApi";
import { message } from "antd";

export const useAddMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      try {
        console.log("📤 Adding member with data:", {
          venueId: formData.get("venueId"),
          fullName: formData.get("fullName"),
          mobileNumber: formData.get("mobileNumber"),
          document: formData.get("document"),
          documentNumber: formData.get("documentNumber"),
          type: formData.get("type"),
          hasDocument: !!formData.get("memberDoc")
        });

        const response = await addMember(formData);
        
        console.log("✅ Add member response:", response);
        
        if (response?.status === 200) {
          return response;
        } else {
          throw new Error(response?.message || "Failed to add member");
        }
      } catch (error) {
        console.error("❌ Add member error:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log("🎉 Member added successfully:", data);
      message.success("Member added successfully!");
      
      // Invalidate and refetch members list
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: (error) => {
      console.error("❌ Add member failed:", error);
      
      // Handle different error response formats
      let errorMessage = "Failed to add member";
      
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
