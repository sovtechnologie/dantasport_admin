import { useMutation,useQueryClient } from "@tanstack/react-query";
import { UpdateStatus } from "../../../services/admin/CreateVenue/endpointApi";

export const useUpdateVenueStatus = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey:["VenueStatusChange"],
        mutationFn:(payload)=>{
            if(!payload){
                 throw new Error("Payload is required to update status a venue");
            }
            return UpdateStatus(payload);
        },
         onSuccess: (data) => {
            console.log("Venue update status changed successfully", data);
            queryClient.invalidateQueries(["VenueList"]);
        },
        onError: (error) => {
            console.error("Error changing venue status", error);
        },
    })
}