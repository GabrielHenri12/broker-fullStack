import { Box, Button, Card, CloseButton, Dialog, Flex, IconButton, List, Portal } from "@chakra-ui/react"
import { useReviewProperty } from "../hooks/use-review-property"
import StarRating from "@/components/ui/star-rating"
import { Check, X } from "lucide-react"

export default function ReviewsModal({ id }: { id: string }) {
    const { data, isPending, error, user, aproveReview } = useReviewProperty(id)

    if (user?.role != "ADMIN") {
        return <></>
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button variant="outline" size="sm">
                    Avaliações pendentes
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Avaliações pendentes</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            {data?.map(x => (
                                <Card.Root key={x.id}>
                                    <Card.Body flex={"auto"} flexDirection={"row"} justifyContent={"space-between"}>
                                        <Box>
                                            <StarRating rating={x.rating} />
                                            {x.comment}
                                        </Box>
                                        <Flex gap={4}>
                                            <IconButton variant="outline" bgColor="red.300" onClick={() => aproveReview(x.id, "REJECTED")}>
                                                <X />
                                            </IconButton>
                                            <IconButton variant="outline" bgColor="green.300" onClick={() => aproveReview(x.id, "APPROVED")}>
                                                <Check />
                                            </IconButton>
                                        </Flex>
                                    </Card.Body>
                                </Card.Root>
                            ))}
                        </Dialog.Body>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}
