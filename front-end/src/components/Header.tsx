"use client"

import { useAuthContext } from '@/auth/hooks'
import { Box, Button, Container, Drawer, Flex, IconButton, Portal, useDisclosure } from '@chakra-ui/react'
import { LogIn, Menu, MenuIcon, X } from 'lucide-react'
import React from 'react'

export default function Header() {
    const { open, onOpen, onClose } = useDisclosure();
    const { user, logout } = useAuthContext();

    return (
        <Box
            as="header"
            bg="brand.500"
            color="white"
            boxShadow="md"
            position="sticky"
            top={0}
            zIndex={10}
        >
            <Container maxW="container.xl">
                <Flex py={4} align="center" justify="space-between">
                    <a href="/">
                        <Box fontWeight="bold" color="green.400" fontSize="xl">
                            Propriedades
                        </Box>
                    </a>

                    {/* Mobile Menu */}
                    <Flex display={{ base: "flex", md: "none" }} align="center">
                        <Drawer.Root >
                            <Drawer.Trigger asChild>
                                <IconButton>
                                    <Menu />
                                </IconButton>
                            </Drawer.Trigger>
                            <Portal>
                                <Drawer.Backdrop />
                                <Drawer.Positioner>
                                    <Drawer.Content>
                                        <Drawer.CloseTrigger asChild>
                                            <IconButton>
                                                <X />
                                            </IconButton>
                                        </Drawer.CloseTrigger>
                                        <Drawer.Header>
                                            <Drawer.Title>Propriedades</Drawer.Title>
                                        </Drawer.Header>
                                        <Drawer.Body />
                                        <Drawer.Footer >
                                            <Flex direction="column" gap={4}>
                                                {user &&
                                                    <Button
                                                        onClick={logout}
                                                        variant="outline"
                                                        bg={"red.600"}
                                                        mr={4}
                                                        color="white"
                                                        _hover={{ bg: "red.300" }}
                                                    >
                                                        Sair
                                                    </Button>
                                                }
                                                {!user &&
                                                    <Button
                                                        asChild
                                                        colorScheme="whiteAlpha"
                                                    >
                                                        <a href="/auth/login">
                                                            Entrar <LogIn />
                                                        </a>
                                                    </Button>
                                                }
                                            </Flex>
                                        </Drawer.Footer>
                                    </Drawer.Content>
                                </Drawer.Positioner>
                            </Portal>
                        </Drawer.Root>
                    </Flex>

                    {/* Desktop Menu */}
                    <Flex display={{ base: "none", md: "flex" }} align="center">
                        {user &&
                            <Button
                                onClick={logout}
                                variant="outline"
                                bg={"red.600"}
                                mr={4}
                                color="white"
                                _hover={{ bg: "red.300" }}
                            >
                                Sair
                            </Button>
                        }
                        {!user &&
                            <Button
                                asChild
                                colorScheme="whiteAlpha"
                            >
                                <a href="/auth/login">
                                    Entrar <LogIn />
                                </a>
                            </Button>
                        }
                    </Flex>
                </Flex>
            </Container>
        </Box >
    )
}
