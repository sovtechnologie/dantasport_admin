import { useQuery } from "@tanstack/react-query";
import { fetchCustomCityList } from "../../../services/admin/Banners/endpointApi";

export const useFetchCustomCity = () => {
  return useQuery(
    {
      queryKey: ["customCityList"],
      queryFn: () => fetchCustomCityList(),
      onSuccess: (data) => {
        console.log("Custom city list fetched successfully", data);
      },
      onError: (error) => {
        console.error("Error fetching custom city list", error);
      },
    }
  );
}