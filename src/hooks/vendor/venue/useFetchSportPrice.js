import { useQuery } from "@tanstack/react-query";
import { fetchSportPrice } from "../../../services/vendor/venueinfo/endpointApi";

export const useFetchSportPrice = (payload) => {
    return useQuery({
        queryKey: ["fetchsportprice", payload],
        queryFn: () => fetchSportPrice(payload),
        enabled: !!payload, // Only run the query if payload is provided
        onError: (error) => {
            console.error("Failed to fetch sport price", error);
        },
    });
}