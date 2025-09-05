import { useQuery } from "@tanstack/react-query";
import { fetchVendorList } from "../../../services/admin/CreateVendor/endpointApi";

export const useFetchVendorList = () => {
    return useQuery({
        queryKey: ["VendorList"],
        queryFn: () => {
            return fetchVendorList();
        },
    })
}