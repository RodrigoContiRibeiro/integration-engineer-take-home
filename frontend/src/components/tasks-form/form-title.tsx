import { Heading } from "@radix-ui/themes";
import React from "react";

type FormTitleProps = React.PropsWithChildren;

export const FormTitle: React.FC<FormTitleProps> = ({ children }) => {
  return (
    <Heading size="5" as="h3">
      {children}
    </Heading>
  );
};
