
import { Box, Flex, Text, Avatar, Card } from "@chakra-ui/react";

import { ReviewDTO } from "@/DTOs/property-dto";
import StarRating from "@/components/ui/star-rating";

interface ReviewCardProps {
  review: ReviewDTO;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const { user, comment, rating, createdAt } = review;

  return (
    <Card.Root mb={6}>
      <Card.Body>
        <Flex align="center" mb={2}>
          <Avatar.Root mr={3}>
            <Avatar.Fallback name={user.name} />
          </Avatar.Root>
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
      </Card.Body>
    </Card.Root>
  );
};

export default ReviewCard;
