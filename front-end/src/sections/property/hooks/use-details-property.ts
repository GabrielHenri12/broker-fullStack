import { DetailsPropertyDto } from "@/DTOs/property-dto";
import axios, { endpoints } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const useDetailsProperty = (propertyId: string) => {
  const [selectedImage, setSelectedImage] = useState("");
  const router = useRouter();

  const { isPending, error, data, refetch } = useQuery<DetailsPropertyDto>({
    queryKey: [`propertie/${propertyId}`],
    queryFn: () =>
      axios.get(endpoints.property.details(propertyId)).then((res) => {
        return res.data;
      }),
  });

  const methods = useForm({
    defaultValues: {
      rating: 5,
      comment: "",
    },
  });

  const { reset, handleSubmit } = methods;
  // function
  const onSubmitReview = handleSubmit(async (data) => {
    const result = await axios.post(endpoints.review.create(propertyId), {
      comment: data.comment,
      rating: data.rating,
    });
    reset();
    router.refresh();
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
    methods,
    setSelectedImage,
    refetch,
    onSubmitReview,
  };
};
