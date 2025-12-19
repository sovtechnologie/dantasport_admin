import { useQuery } from "@tanstack/react-query";
import { fetchsList } from "../../../services/admin/Sports/endpointApi";

export const useFetchSports = () => {
  return useQuery({
    queryKey: ["admin-sports-list"],
    queryFn: fetchsList,
  });
};
