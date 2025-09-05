import { useQuery } from "@tanstack/react-query";
import { fetchVendortoVenueList } from "../../../services/admin/Banners/endpointApi";

export const useFetchVendorVenueList = (vendorId) => {
    return useQuery({
        queryKey: ['vendorVenueList', vendorId],
        queryFn: () => fetchVendortoVenueList({vendorId}),
        enabled: !!vendorId, // only run the query if vendorId is provided
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}