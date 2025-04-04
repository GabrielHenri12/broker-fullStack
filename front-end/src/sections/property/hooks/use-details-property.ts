import { DetailsPropertyDto, ListPropertyDto } from "@/DTOs/property-dto";
import axios, { endpoints } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useDetailsProperty = (propertyId: string) => {
  // States
  const [selectedImage, setSelectedImage] = useState("");

  const { isPending, error, data, refetch } = useQuery<DetailsPropertyDto>({
    queryKey: [`propertie/${propertyId}`],
    queryFn: () =>
      axios.get(endpoints.property.details(propertyId)).then((res) => {
        return res.data;
      }),
  });

  

  useEffect(() => {
    if (data && data.images.length > 0) {
      setSelectedImage(data.images[0].url);
    }
  }, [data]);

  return {
    data,
    error,
    isPending,
    selectedImage,
    setSelectedImage,
    refetch,
  };
};
