import { useMutation } from "@tanstack/react-query";
import { UpdateSport } from "../../../services/admin/Sports/endpointApi";

export const useStatusSport = () =>{
    return useMutation({
        mutationKey: ["sportStatus"],
        mutationFn:(payload) =>{
            if (!payload) {
                throw new Error("Payload is required to change status of sports");
            }
            return UpdateSport(payload);
        },
        onSuccess: (data) => {
            console.log("status change successfully", data);
        },
        onError: (error) => {
            console.error("Error changing status", error);
        },

    })
}

