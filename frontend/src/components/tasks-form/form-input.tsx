import type { FieldPath, Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { TaskData } from "../../apis/tasksApi";
import { Box, TextField, Text, Flex } from "@radix-ui/themes";
import { capitalize } from "../../utils/capitalize";

export type FormInputProps = {
  name: FieldPath<TaskData>;
  control: Control<TaskData>;
};

export const FormInput: React.FC<FormInputProps> = ({ name, control }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const hasError = !!fieldState.error;
        const errorMessage = fieldState.error?.message ?? "";

        return (
          <Box>
            <TextField.Root
              {...field}
              size="3"
              placeholder={capitalize(field.name)}
              color={hasError ? "crimson" : undefined}
            />
            {hasError ? (
              <Flex>
                <Text color="crimson" size="2">
                  {errorMessage}
                </Text>
              </Flex>
            ) : null}
          </Box>
        );
      }}
    />
  );
};
