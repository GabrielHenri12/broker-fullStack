"use client"

import { useBreakpointValue } from "@chakra-ui/react";
import { useDetailsProperty } from "../hooks/use-details-property";
import {
    Box,
    Container,
    Heading,
    Text,
    Image,
    SimpleGrid,
    Flex,
    Badge,
    Button,
    VStack,
    HStack,
    Icon,
    Skeleton,
    IconButton
} from "@chakra-ui/react";
import Link from "next/link";
import StarRating from "@/components/ui/star-rating";
import { MapPin } from "lucide-react";
import ReviewCard from "../components/ReviewCard";
import ReviewForm from "../components/ReviewForm";

type props = {
    id: string
}

export default function DetailsProperyView({ id }: props) {
    const isMobile = useBreakpointValue({ base: true, md: false }) || false;
    const { data, isPending, error, selectedImage, setSelectedImage, refetch } = useDetailsProperty(id);

    if (!data || error) {
        return <div>Erro ao carregar os dados</div>
    }

    if (isPending) {
        return (
            <Box bg="gray.50" minH="100vh" py={8}>
                <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
                    <Skeleton height="40px" width="200px" mb={6} />
                    <Skeleton height="400px" borderRadius="lg" mb={6} />
                    <Skeleton height="30px" width="60%" mb={4} />
                    <Skeleton height="20px" width="40%" mb={6} />
                    <Skeleton height="100px" mb={6} />
                    <Skeleton height="200px" mb={6} />
                </Container>
            </Box>
        );
    }

    if (!data) {
        return (
            <Box bg="gray.50" minH="100vh" py={8} textAlign="center">
                <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
                    <Heading as="h2" size="lg" mb={4}>
                        Propriedade não encontrada
                    </Heading>
                    <Text mb={6}>
                        A propriedade que você está procurando não existe ou foi removida.
                    </Text>
                    <Button as={Link} colorScheme="brand" color={"white"}>
                        Voltar para a página inicial
                    </Button>
                </Container>
            </Box>
        );
    }

    const formattedPrice = data ? new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 0,
    }).format(data.price) : "";

    return (
        <Box bg="gray.50" minH="100vh" pb={12}>
            <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
                <Flex align={"center"} pt={6} pb={4}>
                    {/* <Button
                        as={Link}
                        variant="ghost"
                        color="gray.600"
                        _hover={{ bg: "gray.100" }}
                        size={isMobile ? "sm" : "md"}
                    >
                        Voltar
                    </Button> */}
                </Flex>

                <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                    <Box>
                        <Box
                            position="relative"
                            borderRadius="lg"
                            overflow="hidden"
                            boxShadow="md"
                            bg="white"
                        >
                            <Image
                                src={selectedImage}
                                alt={data.name}
                                w="100%"
                                h={{ base: "300px", md: "400px" }}
                                objectFit="cover"
                            />
                        </Box>

                        <SimpleGrid columns={{ base: 3, md: 4 }} gap={2} mt={2}>
                            {data.images.map((img, index) => (
                                <Box
                                    key={index}
                                    borderRadius="md"
                                    overflow="hidden"
                                    border="2px solid"
                                    borderColor={selectedImage === img.url ? "brand.500" : "transparent"}
                                    cursor="pointer"
                                    onClick={() => setSelectedImage(img.url)}
                                >
                                    <Image
                                        src={img.url}
                                        alt={`Imagem ${index + 1}`}
                                        w="100%"
                                        h="60px"
                                        objectFit="cover"
                                    />
                                </Box>
                            ))}
                        </SimpleGrid>
                    </Box>

                    <Box>
                        <Box
                            bg="white"
                            p={6}
                            borderRadius="lg"
                            boxShadow="md"
                            height="fit-content"
                        >
                            <Heading as="h1" size="xl" mb={2}>
                                {data.name}
                            </Heading>
                            <Flex align="center" mb={3}>
                                <MapPin size={16} color="#718096" />
                                <Text ml={1} color="gray.600">
                                    {data.address}
                                </Text>
                            </Flex>
                            <Flex align="center" mb={5}>
                                <StarRating rating={data.rating} size={18} />
                                <Text ml={2} color="gray.600" fontSize="sm">
                                    ({data.reviews.length} avaliações)
                                </Text>
                            </Flex>

                            <Text fontWeight="bold" fontSize="2xl" color="brand.600" mb={4}>
                                {formattedPrice}
                            </Text>
                            <Text color="gray.700" mb={6}>
                                {data.description}
                            </Text>
                        </Box>
                    </Box>
                </SimpleGrid>

                <Box mt={10} bg="white" p={6} borderRadius="lg" boxShadow="md">
                    <Flex align="center" justify="space-between" mb={6}>
                        <Heading as="h2" size="lg">
                            Avaliações
                        </Heading>
                        <Badge colorScheme="yellow" p={2} borderRadius="md">
                            <Flex align="center">
                                {/* <Icon as={StarRating} color="yellow.400" fill="yellow.400" mr={1} /> */}
                                <Text>{data.rating.toFixed(1)}</Text>
                            </Flex>
                        </Badge>
                    </Flex>
                    {data && <ReviewForm propertyId={data.id} onReviewAdded={refetch} />}

                    {data.reviews.length === 0 ? (
                        <Text color="gray.600" textAlign="center" py={4}>
                            Esta propriedade ainda não possui avaliações.
                        </Text>
                    ) : (
                        <VStack align="stretch" gap={0}>
                            {data.reviews.map((review) => (
                                <ReviewCard key={review.id} review={review} />
                                // <div>{review.comment}</div>
                            ))}
                        </VStack>
                    )}
                </Box>
            </Container>
        </Box>
    )
}