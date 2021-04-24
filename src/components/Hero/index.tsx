import React, { ReactNode } from "react";
import { Heading } from "@chakra-ui/layout";
import { chakra, useColorModeValue } from "@chakra-ui/system";

export default function Hero({ children }: { children: ReactNode }) {
  const color = useColorModeValue("gray.900", "gray.200");

  return (
    <chakra.main mt={{ base: 16, sm: 24 }} mx="auto" maxW="7xl" px={4}>
      <chakra.div textAlign="center">
        <Heading
          fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
          letterSpacing="-0.025em"
          fontWeight="extrabold"
          color={color}
        >
          Encuentra tu auto
        </Heading>
        <chakra.div
          mt={{ base: 5, md: 8 }}
          maxW="6xl"
          mx="auto"
          d={{ sm: "flex" }}
          justifyContent={{ sm: "center" }}
        >
          {children}
        </chakra.div>
      </chakra.div>
    </chakra.main>
  );
}
