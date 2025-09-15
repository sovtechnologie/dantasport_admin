import { useQuery } from "@tanstack/react-query";
import { getGymMembersList } from "../../../services/vendor/gym/endpointApi";

export const useFetchGymMembers = ({ gymId, vendorId }) => {
  return useQuery({
    queryKey: ["gymMembers", gymId, vendorId],
    queryFn: async () => {
      try {
        if (!gymId || !vendorId) {
          console.log("⚠️ Missing gymId or vendorId, skipping fetch");
          return { result: [] };
        }

        console.log("📤 Fetching gym members for:", { gymId, vendorId });

        const payload = {
          venueId: parseInt(gymId), // Send venueId instead of gymId
          vendorId: parseInt(vendorId)
        };

        const response = await getGymMembersList(payload);
        
        console.log("✅ Fetch gym members response:", response);
        
        if (response?.status === 200) {
          return response;
        } else {
          throw new Error(response?.message || "Failed to fetch gym members");
        }
      } catch (error) {
        console.error("❌ Fetch gym members error:", error);
        throw error;
      }
    },
    enabled: !!gymId && !!vendorId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    retryDelay: 1000,
  });
};
