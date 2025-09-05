import { useMutation,useQueryClient } from "@tanstack/react-query";
import { UpdateStatus } from "../../../services/admin/CreateVenue/endpointApi";

export const useUpdateVenue = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:["UpdateVenueDetails"],
        mutationFn:(payload)=>{
            if(!payload){
                 throw new Error("Payload is required to update details of a venue");
            }
            return UpdateStatus(payload);
        },
         onSuccess: (data) => {
            console.log("Venue update details  successfully", data);
            queryClient.invalidateQueries(["VenueList"]);
        },
        onError: (error) => {
            console.error("Error updateing venue Details", error);
        },
    })
}