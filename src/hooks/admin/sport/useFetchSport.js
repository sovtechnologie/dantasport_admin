import { useQuery } from "@tanstack/react-query";
import { fetchSportsList } from "../../../services/admin/Sports/endpointApi";

export const useFetchSports = () => {
    return useQuery({
        queryKey: ["SportsList"],
        queryFn: () => {
           return fetchSportsList();
        },
    });
};