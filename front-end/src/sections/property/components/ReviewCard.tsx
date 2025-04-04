
import { Box, Flex, Text, Avatar } from "@chakra-ui/react";

import { ReviewDTO } from "@/DTOs/property-dto";
import StarRating from "@/components/ui/star-rating";

interface ReviewCardProps {
  review: ReviewDTO;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const { user, comment, rating, createdAt } = review;

  return (
    <Box mb={6} divideX={"2px"}>
      <Flex align="center" mb={2}>
        <Avatar.Fallback name={user.name} mr={3} />
        <Box>
          <Text fontWeight="medium">{user.name}</Text>
          <Flex align="center">
            <StarRating rating={rating} size={14} showText={false} />
            <Text ml={2} fontSize="xs" color="gray.500">
              {new Date(createdAt).toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
          </Flex>
        </Box>
      </Flex>
      <Text ml={10} fontSize="sm" color="gray.700">{comment}</Text>
    </Box>
  );
};

export default ReviewCard;
