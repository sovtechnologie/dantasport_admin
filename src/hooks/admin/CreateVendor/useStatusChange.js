import { useMutation } from "@tanstack/react-query";
import { VendorStatusChange } from "../../../services/admin/CreateVendor/endpointApi";
import { useQueryClient } from "@tanstack/react-query";


export const useStatusChange = () => {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: VendorStatusChange,
    onSuccess: (data) => {
      console.log("✅ Status updated:", data);
      queryClient.invalidateQueries(['vendorList']); // refetch vendor list
    },
    onError: (error) => {
      console.error("❌ Failed to update status:", error);
    },
  });
};