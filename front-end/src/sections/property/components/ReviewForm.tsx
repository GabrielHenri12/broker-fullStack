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
import { Controller, FormProvider, UseFormReturn } from "react-hook-form";
import { useRouter } from "next/navigation";

interface ReviewFormProps {
  propertyId: string;
  onSubmitReview: (e?: React.BaseSyntheticEvent) => Promise<void>
  form: UseFormReturn<{ rating: number; comment: string; }, any, { rating: number; comment: string; }>
}

const ReviewForm = ({ form, onSubmitReview }: ReviewFormProps) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const router = useRouter();

  const {
    control,
    formState: { errors },
    formState: { isLoading }
  } = form;

  return (
    <FormProvider {...form}>
      <Box
        as="form"
        onSubmit={onSubmitReview}
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
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <Flex>
                {[1, 2, 3, 4, 5].map((value) => (
                  <Box
                    key={value}
                    cursor="pointer"
                    onClick={() => field.onChange(value)}
                    onMouseEnter={() => setHoveredRating(value)}
                    onMouseLeave={() => setHoveredRating(0)}
                    mr={1}
                  >
                    <Star
                      size={24}
                      color="#F6E05E"
                      fill={(hoveredRating || field.value) >= value ? "#F6E05E" : "none"}
                    />
                  </Box>
                ))}
              </Flex>
            )}
          />
        </Box>

        <Box mb={4}>
          <Text fontWeight="medium" mb={2}>Seu comentário</Text>
          <Controller
            name="comment"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                placeholder="Compartilhe sua experiência com esta propriedade..."
                resize="vertical"
                minH="120px"
              />
            )}
            rules={{
              required: "Por favor, insira um comentário",
              minLength: {
                value: 10,
                message: "O comentário deve ter pelo menos 10 caracteres"
              }
            }}
          />
          {form.formState.errors.comment && (
            <Text color="red.500" mt={1}>
              {form.formState.errors.comment.message}
            </Text>
          )}
        </Box>

        <Button type="submit" colorScheme="blue" size="md" loading={isLoading}>
          Enviar avaliação
        </Button>
      </Box>
    </FormProvider>
  );
};

export default ReviewForm;