import { Box, Heading } from "@radix-ui/themes";

export const PageTitle: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box pb="9">
      <Heading size={{ initial: "8", md: "9" }} as="h1" align="center">
        {children}
      </Heading>
    </Box>
  );
};
