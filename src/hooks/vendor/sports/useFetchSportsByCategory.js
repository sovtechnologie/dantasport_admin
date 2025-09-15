import { useQuery } from "@tanstack/react-query";
import { getSportsListByCategory } from "../../../services/vendor/SportList/endpointApi";

export const useFetchSportsByCategory = (sportsType = 1) => {
    return useQuery({
        queryKey: ['sportsByCategory', sportsType],
        queryFn: () => getSportsListByCategory({ sportsType }),
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 30 * 60 * 1000, // 30 minutes
        enabled: !!sportsType, // Only fetch if sportsType is provided
    });
};
