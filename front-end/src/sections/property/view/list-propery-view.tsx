"use client"

import {
    Box,
    Container,
    Heading,
    SimpleGrid,
    Text,
    Skeleton,
    useBreakpointValue
} from "@chakra-ui/react";
import { useListProperty } from "../hooks/use-list-property"
import PropertyCard from "../components/propery-card";

export default function ListProperyView() {
    const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 }) || 1;

    const { isPending, data, error } = useListProperty();

    if (!data || error) {
        return <div>Erro ao carregar os dados</div>
    }


    return (
        <Box bg="gray.50" minH="100vh" py={8}>
            <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
                <Heading
                    as="h1"
                    mb={2}
                    fontSize={{ base: "2xl", md: "3xl" }}
                    color="brand.700"
                >
                    Propriedades
                </Heading>
                <Text mb={6} color="gray.600">
                    Encontre as melhores propriedades, sítios, chácaras e ranchos
                </Text>

                {isPending &&
                    <SimpleGrid columns={columns} gap={6}>
                        {[...Array(6)].map((_, index) => (
                            <Box key={index} borderRadius="lg" overflow="hidden" bg="white" boxShadow="md">
                                <Skeleton height="200px" />
                                <Box p={4}>
                                    <Skeleton height="24px" width="70%" mb={2} />
                                    <Skeleton height="16px" width="60%" mb={4} />
                                    <Skeleton height="16px" width="40%" mb={2} />
                                    <Skeleton height="24px" width="30%" />
                                </Box>
                            </Box>
                        ))}
                    </SimpleGrid>
                }
                {!isPending && data.length <= 0 &&
                    <Box textAlign="center" py={10}>
                        <Text fontSize="lg" color="gray.600">
                            Nenhuma propriedade encontrada com os critérios selecionados.
                        </Text>
                    </Box>
                }
                {!isPending && data.length > 0 &&
                    <SimpleGrid columns={columns} gap={6}>
                        {data.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </SimpleGrid>
                }
            </Container>
        </Box>
    )
}
