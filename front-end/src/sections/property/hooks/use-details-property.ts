import { DetailsPropertyDto } from "@/DTOs/property-dto";
import axios, { endpoints } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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

  const methods = useForm();
  const { handleSubmit } = methods;
  // function
  const createReview = handleSubmit(async data => {
    
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
