import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Textarea,
  Text
} from "@chakra-ui/react";
import { Star } from "lucide-react";

interface ReviewFormProps {
  propertyId: string;
  onReviewAdded: () => void;
}

const ReviewForm = ({ propertyId, onReviewAdded }: ReviewFormProps) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  // const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      // toast({
      //   title: "Avaliação necessária",
      //   description: "Por favor, selecione uma classificação de estrelas para sua avaliação.",
      //   status: "warning",
      //   duration: 3000,
      //   isClosable: true,
      // });
      return;
    }

    if (comment.trim() === "") {
      // toast({
      //   title: "Comentário necessário",
      //   description: "Por favor, adicione um comentário para sua avaliação.",
      //   status: "warning",
      //   duration: 3000,
      //   isClosable: true,
      // });
      return;
    }

    // In a real app, this would be an API call to save the review
    console.log("Submitting review:", { propertyId, rating, comment });
    
    // Simulate successful submission
    // toast({
    //   title: "Avaliação enviada",
    //   description: "Sua avaliação foi enviada com sucesso.",
    //   status: "success",
    //   duration: 3000,
    //   isClosable: true,
    // });
    
    // Reset form
    setComment("");
    setRating(0);
    
    // Notify parent component to refresh reviews
    onReviewAdded();
  };

  return (
    <Box 
      as="form" 
      onSubmit={handleSubmit} 
      bg="white" 
      p={6} 
      borderRadius="lg" 
      boxShadow="md" 
      mb={8}
    >
      <Heading as="h3" size="md" mb={4}>
        Adicionar avaliação
      </Heading>
      
      <Box mb={4}>
        <Text fontWeight="medium" mb={2}>Sua classificação</Text>
        <Flex>
          {[1, 2, 3, 4, 5].map((value) => (
            <Box 
              key={value}
              cursor="pointer"
              onClick={() => setRating(value)}
              onMouseEnter={() => setHoveredRating(value)}
              onMouseLeave={() => setHoveredRating(0)}
              mr={1}
            >
              <Star 
                size={24} 
                color="#F6E05E"
                fill={(hoveredRating || rating) >= value ? "#F6E05E" : "none"}
              />
            </Box>
          ))}
        </Flex>
      </Box>
      
      <Box mb={4}>
        <Text fontWeight="medium" mb={2}>Seu comentário</Text>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Compartilhe sua experiência com esta propriedade..."
          resize="vertical"
          minH="120px"
        />
      </Box>
      
      <Button type="submit" colorScheme="blue" size="md">
        Enviar avaliação
      </Button>
    </Box>
  );
};

export default ReviewForm;