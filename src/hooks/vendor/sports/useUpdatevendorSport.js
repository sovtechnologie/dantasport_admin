import { useMutation } from "@tanstack/react-query";
import { UpdateSportVenue } from "../../../services/vendor/SportList/endpointApi";

export const useUpdateVendorSport = () => {
  return useMutation({
    mutationFn: (payload) => UpdateSportVenue(payload),
  });
};
