import { useMutation } from "@tanstack/react-query";
import { UpdatePriceSlot } from "../../../services/vendor/SportList/endpointApi";

export const useUpdatePriceSlot = () => {
  return useMutation({
    mutationFn: (payload) => UpdatePriceSlot(payload),
  });
};
