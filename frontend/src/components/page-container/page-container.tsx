import { Container } from "@radix-ui/themes";
import React from "react";

export const PageContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <Container size="3" p="6">
      {children}
    </Container>
  );
};

export default PageContainer;
