import { chakra } from "@chakra-ui/system";
import React, { ReactNode } from "react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <chakra.div minH="100vh">
      <ColorModeSwitcher />
      <chakra.div py={10}>{children}</chakra.div>
    </chakra.div>
  );
}
