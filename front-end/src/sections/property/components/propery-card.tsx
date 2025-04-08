
import { Box, Image, Heading, Text, Flex, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { MapPin } from "lucide-react";
import { ListPropertyDto } from "@/DTOs/property-dto";
import Link from "next/link";
import StarRating from "@/components/ui/star-rating";

interface PropertyCardProps {
    property: ListPropertyDto;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
    const { id, name, price, images, rating, address } = property;
    const image = images[0].url;
    const formattedPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 0,
    }).format(+price);

    return (
        <LinkBox
            as="article"
            borderRadius="lg"
            overflow="hidden"
            bg="white"
            boxShadow="md"
            transition="all 0.2s"
            _hover={{ transform: "translateY(-4px)", boxShadow: "lg" }}
        >
            <Box position="relative">
                <Image
                    src={image}
                    alt={name}
                    height="200px"
                    width="100%"
                    objectFit="cover"
                />
            </Box>

            <Box p={4}>
                <Flex justify="space-between" align="start" mb={2}>
                    <Box>
                        <LinkOverlay as={Link} href={`/property/${id}`}>
                            <Heading as="h3" size="md" mb={1}>
                                {name}
                            </Heading>
                        </LinkOverlay>
                        <Flex align="center" mb={2}>
                            <MapPin size={14} color="#718096" />
                            <Text ml={1} color="gray.600" fontSize="sm">
                                {address}
                            </Text>
                        </Flex>
                    </Box>
                </Flex>

                <Flex justify="space-between" align="center">
                    <StarRating rating={rating} />
                    <Text fontWeight="bold" fontSize="lg" color="brand.600">
                        {formattedPrice}
                    </Text>
                </Flex>
            </Box>
        </LinkBox>
    );
};

export default PropertyCard;
