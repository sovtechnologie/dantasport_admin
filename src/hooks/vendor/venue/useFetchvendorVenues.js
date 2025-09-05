import { useQuery } from "@tanstack/react-query";
import { fetchVendorVenueList } from "../../../services/vendor/venueinfo/endpointApi";

export const useFetchVendorVenueList = () => {
    return useQuery({
        queryKey: ['vendorVenues'],
        queryFn: () => fetchVendorVenueList(),
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 30 * 60 * 1000, // 30 minutes
    });
}