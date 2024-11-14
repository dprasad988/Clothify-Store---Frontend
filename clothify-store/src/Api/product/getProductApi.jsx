import axios from 'axios';
import { useQuery } from "@tanstack/react-query";

export const GetProductApi = async () => {
  const response = await axios.get('/admin/get-products');
  return response.data;
};

export const useGetProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: GetProductApi,
        staleTime: 1000 * 60 * 5,      // Cache data for 5 minutes before it goes stale
        cacheTime: 1000 * 60 * 10,     // Keep inactive cache for 10 minutes before garbage collection
        retry: 1,                      // Retry failed requests once
        refetchOnWindowFocus: false,   // Avoid refetching when the window regains focus
        refetchOnMount: false,         // Avoid refetching when component remounts
        refetchInterval: 1000 * 60 * 2,// Automatically refetch every 2 minutes
        onSuccess: (data) => console.log("Products fetched successfully:", data),
        onError: (error) => console.error("Failed to fetch products:", error),
    });
};