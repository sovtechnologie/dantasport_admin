import { useQuery } from "@tanstack/react-query";
import { getMembersList } from "../../../services/vendor/members/endpointApi";

export const useFetchMembers = ({ venueId, vendorId }) => {
  return useQuery({
    queryKey: ["members", venueId, vendorId],
    queryFn: async () => {
      try {
        if (!venueId || !vendorId) {
          console.log("⚠️ Missing venueId or vendorId, skipping fetch");
          return { result: [] };
        }

        console.log("📤 Fetching members for:", { venueId, vendorId });

        const payload = {
          venueId: parseInt(venueId),
          vendorId: parseInt(vendorId)
        };

        const response = await getMembersList(payload);
        
        console.log("✅ Fetch members response:", response);
        
        if (response?.status === 200) {
          return response;
        } else {
          throw new Error(response?.message || "Failed to fetch members");
        }
      } catch (error) {
        console.error("❌ Fetch members error:", error);
        throw error;
      }
    },
    enabled: !!venueId && !!vendorId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    retryDelay: 1000,
  });
};
