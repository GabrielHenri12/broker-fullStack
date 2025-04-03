import { ListPropertyDto } from "@/DTOs/property-dto";
import axios, { endpoints } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

export const useListProperty = () => {
  const { isPending, error, data } = useQuery<ListPropertyDto[]>({
    queryKey: ["properties"],
    queryFn: () => axios.get(endpoints.property.list).then((res) => res.data),
  });
  console.log(data)
  return {
    data,
    error,
    isPending,
  };
};
