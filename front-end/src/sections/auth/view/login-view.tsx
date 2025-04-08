"use client"
// ----------------------------------------------------------------------
import React from 'react'
import {
    Box,
    Button,
    Field,
    Stack,
    Heading,
    Input,
} from '@chakra-ui/react'
import { useLogin } from '../hooks/use-login'
import { FormProvider } from 'react-hook-form'

export default function LoginView() {
    const { onSubmit, isLoading, methods, errors } = useLogin()

    return (
        <FormProvider {...methods}>
            <Box
                maxW="sm"
                mx="auto"
                mt="20"
                p="8"
                borderWidth="1px"
                borderRadius="xl"
                boxShadow="md"
            >
                <Heading mb="6" size="lg" textAlign="center">
                    Login
                </Heading>
                <form onSubmit={onSubmit} noValidate autoComplete="off">
                    <Stack gap="4">
                        <Field.Root invalid={!!errors.email} required>
                            <Field.Label>Email</Field.Label>
                            <Input
                                type="email"
                                placeholder="Digite seu email"
                                {...methods.register('email', {
                                    required: 'O email é obrigatório',
                                })}
                            />
                            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                        </Field.Root>
                        <Field.Root invalid={!!errors.password} required>
                            <Field.Label>Senha</Field.Label>
                            <Input
                                type="password"
                                placeholder="Digite sua senha"
                                {...methods.register('password', {
                                    required: 'A senha é obrigatória',
                                })}
                            />
                            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
                        </Field.Root>
                        <Button
                            type="submit"
                            colorScheme="blue"
                            loading={isLoading}
                            loadingText="Entrando..."
                        >
                            Entrar
                        </Button>
                    </Stack>
                </form>
            </Box>
        </FormProvider>
    )
}
