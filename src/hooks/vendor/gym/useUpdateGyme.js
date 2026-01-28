import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { updateGyme } from "../../../services/vendor/gym/endpointApi";

export const useUpdateGyme = () => {
    return useMutation({
        mutationFn: ({ gymId, formData }) => updateGyme({ gymId, formData })
    });
}   