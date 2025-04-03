"use client"

import type { IconButtonProps, SpanProps } from "@chakra-ui/react"
import { IconButton, Skeleton, Span } from "@chakra-ui/react"
import { ThemeProvider, useTheme } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import * as React from "react"
import { LuMoon, LuSun } from "react-icons/lu"

export interface ColorModeProviderProps extends ThemeProviderProps { }

export function ColorModeProvider(props: ColorModeProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      disableTransitionOnChange
      enableSystem={true} // Adicionado para melhor suporte
      {...props}
    />
  )
}

export type ColorMode = "light" | "dark" | "system"

export interface UseColorModeReturn {
  colorMode: ColorMode
  setColorMode: (colorMode: ColorMode) => void
  toggleColorMode: () => void
  isMounted: boolean // Novo campo para verificar se está no client
}

export function useColorMode(): UseColorModeReturn {
  const [mounted, setMounted] = React.useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleColorMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return {
    colorMode: (mounted ? resolvedTheme : 'light') as ColorMode,
    setColorMode: setTheme,
    toggleColorMode,
    isMounted: mounted
  }
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode, isMounted } = useColorMode()
  if (!isMounted) return light // Retorna light como fallback SSR
  return colorMode === "dark" ? dark : light
}

export function ColorModeIcon() {
  const { colorMode, isMounted } = useColorMode()
  if (!isMounted) return <Skeleton boxSize="5" /> // Fallback para SSR
  return colorMode === "dark" ? <LuMoon /> : <LuSun />
}

interface ColorModeButtonProps extends Omit<IconButtonProps, "aria-label"> { }

export const ColorModeButton = React.forwardRef<
  HTMLButtonElement,
  ColorModeButtonProps
>(function ColorModeButton(props, ref) {
  const { toggleColorMode, isMounted } = useColorMode()

  if (!isMounted) {
    return <Skeleton boxSize="8" /> // Fallback consistente para SSR
  }

  return (
    <IconButton
      onClick={toggleColorMode}
      variant="ghost"
      aria-label="Toggle color mode"
      size="sm"
      ref={ref}
      {...props}
      css={{
        _icon: {
          width: "5",
          height: "5",
        },
      }}
    >
      <ColorModeIcon />
    </IconButton>
  )
})

// Os componentes LightMode e DarkMode permanecem iguais
export const LightMode = React.forwardRef<HTMLSpanElement, SpanProps>(
  function LightMode(props, ref) {
    return (
      <Span
        color="fg"
        display="contents"
        className="chakra-theme light"
        colorPalette="gray"
        colorScheme="light"
        ref={ref}
        {...props}
      />
    )
  },
)

export const DarkMode = React.forwardRef<HTMLSpanElement, SpanProps>(
  function DarkMode(props, ref) {
    return (
      <Span
        color="fg"
        display="contents"
        className="chakra-theme dark"
        colorPalette="gray"
        colorScheme="dark"
        ref={ref}
        {...props}
      />
    )
  },
)