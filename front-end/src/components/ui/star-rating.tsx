import { HStack, Icon, Text } from "@chakra-ui/react";
import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
  rating: number;
  showText?: boolean;
  size?: number;
}

const StarRating = ({ rating, showText = true, size = 16 }: StarRatingProps) => {
  // Garantir que o rating esteja entre 0 e 5
  const clampedRating = Math.min(5, Math.max(0, rating));
  const fullStars = Math.floor(clampedRating);
  const hasHalfStar = clampedRating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <HStack gap={1} align="center">
      {/* Estrelas cheias */}
      {[...Array(fullStars)].map((_, i) => (
        <Icon 
          key={`full-${i}`}
          as={Star}
          color="yellow.400"
          fill="yellow.400"
          boxSize={`${size}px`}
        />
      ))}
      
      {/* Meia estrela */}
      {hasHalfStar && (
        <Icon
          key="half"
          as={StarHalf}
          color="yellow.400"
          fill="yellow.400"
          boxSize={`${size}px`}
        />
      )}
      
      {/* Estrelas vazias */}
      {[...Array(emptyStars)].map((_, i) => (
        <Icon
          key={`empty-${i}`}
          as={Star}
          color="gray.300"
          boxSize={`${size}px`}
        />
      ))}
      
      {/* Texto de avaliação */}
      {showText && (
        <Text ml={1} fontSize="sm" color="gray.600">
          ({clampedRating.toFixed(1)})
        </Text>
      )}
    </HStack>
  );
};

export default StarRating;