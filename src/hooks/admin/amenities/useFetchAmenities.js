import { useQuery } from "@tanstack/react-query";
import { fetchAmenitieslist } from "../../../services/admin/Amenities/endpointApi";


export const useFetchAmenities = () =>{
    return useQuery({
           queryKey: ["AmenitiesList"],
           queryFn: () => {
              return fetchAmenitieslist();
           },
       });
}