import { useQuery } from "@tanstack/react-query";
import { GetAllVendor } from "../../../services/admin/CreateVenue/endpointApi";

export const useGetAllVendor = () => {
    return useQuery({
        queryKey: ["GetVendors"],
        queryFn: () => {
            return GetAllVendor();
        }
    })
}