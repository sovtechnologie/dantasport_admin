import { useQuery } from "@tanstack/react-query";
import { fetchSportVenueList } from "../../../services/vendor/SportList/endpointApi";


export const useFetchVenueSport = (payload) => {
    return useQuery({
        queryKey: ['sportVenueList', payload],
        queryFn: () => fetchSportVenueList(payload),
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });
}