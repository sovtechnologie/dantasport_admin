import { useQuery } from "@tanstack/react-query";
import { FetchSingleVendorDetails } from "../../../services/admin/CreateVendor/endpointApi";

export const useFetchSingleVendor = (id) => {
    return useQuery({
        queryKey: ["singleVendorDetails", id], // unique cache key
        queryFn: () => FetchSingleVendorDetails(id),
        enabled: !!id, // only run if vendorId is provided
    });
}