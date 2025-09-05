import { useQuery } from "@tanstack/react-query";
import { fetchVenueList } from "../../../services/admin/CreateVenue/endpointApi";

export const useFetchVenueList = () => {
    return useQuery({
        queryKey: ["VenueList"],
        queryFn: () => {
            return fetchVenueList();
        },
    })
}