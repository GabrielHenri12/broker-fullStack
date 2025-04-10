import { useAuthContext } from "@/auth/hooks";
import { PendingReviewDto } from "@/DTOs/review-dto";
import axiosInstance, { endpoints } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useReviewProperty = (propertyId: string) => {
  const { user, authenticated } = useAuthContext();

  const router = useRouter();

  const { isPending, error, data, refetch } = useQuery<PendingReviewDto[]>({
    queryKey: [`propertie/review/${propertyId}`],
    queryFn: () => {
      if (!authenticated || user?.role != "ADMIN") return [];
      const reviews = axiosInstance
        .get(endpoints.review.pending(propertyId))
        .then((res) => {
          return res.data;
        });
      return reviews;
    },
  });

  const aproveReview = async (
    reviewId: string,
    status: "APPROVED" | "REJECTED"
  ) => {
    await axiosInstance.patch(endpoints.review.approve(propertyId, reviewId), {
      status,
    });
    refetch();
    router.refresh();
  };

  return {
    isPending,
    error,
    data,
    user,
    aproveReview,
  };
};
