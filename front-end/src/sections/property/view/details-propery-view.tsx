"use client"

import { useBreakpointValue } from "@chakra-ui/react";

type props = {
    id: string
}

export default function DetailsProperyView({ id }: props) {
    const isMobile = useBreakpointValue({ base: true, md: false }) || false;

    return (
        <></>
    )
}