import { useQuery } from "@tanstack/react-query";
import { fetchVendorVenueList, fetchActiveAmenities, addGym, fetchGymList, fetchGymDetails, updateGym, deleteGym } from "../../../services/vendor/venueinfo/endpointApi";
import { useMutation } from "@tanstack/react-query";

export const useFetchVendorVenueList = () => {
    return useQuery({
        queryKey: ['vendorVenues'],
        queryFn: () => fetchVendorVenueList(),
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 30 * 60 * 1000, // 30 minutes
    });
}

export const useFetchActiveAmenities = () => {
    return useQuery({
        queryKey: ['vendorActiveAmenities'],
        queryFn: () => fetchActiveAmenities(),
        staleTime: 5 * 60 * 1000,
        cacheTime: 30 * 60 * 1000,
    });
}

export const useAddGym = () => {
    return useMutation({
        mutationFn: (formData) => addGym(formData)
    });
}

export const useFetchGymList = (vendorId) => {
    return useQuery({
        queryKey: ['vendorGymList', vendorId],
        queryFn: () => fetchGymList({ vendorId }),
        enabled: !!vendorId,
        staleTime: 60 * 1000,
    });
}

export const useFetchGymDetails = (gymId) => {
    return useQuery({
        queryKey: ['vendorGymDetails', gymId],
        queryFn: () => fetchGymDetails(gymId),
        enabled: !!gymId,
        staleTime: 60 * 1000,
    });
}

export const useUpdateGym = () => {
    return useMutation({
        mutationFn: ({ gymId, formData }) => updateGym({ gymId, formData })
    });
}

export const useDeleteGym = () => {
    return useMutation({
        mutationFn: ({ gymId, isDelete }) => deleteGym({ gymId, isDelete })
    });
}