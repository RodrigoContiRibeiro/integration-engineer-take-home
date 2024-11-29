import { Button, Flex, TextField } from "@radix-ui/themes";
import React from "react";

type Field = {
  name: string;
  placeholder: string;
};

const formFields: Field[] = [
  {
    name: "title",
    placeholder: "Title",
  },
  {
    name: "description",
    placeholder: "Description",
  },
] as const;

export type RecordFormData = Record<string, FormDataEntryValue>;

const getFormDataFromSubmit = (
  evt: React.FormEvent<HTMLFormElement>
): RecordFormData => {
  evt.preventDefault();

  const formData = new FormData(evt.target as HTMLFormElement);
  const formDataRecord = Object.fromEntries(formData.entries());

  return formDataRecord;
};

export type FormProps = {
  submitFn: (
    formData: RecordFormData,
    evt: React.FormEvent<HTMLFormElement>
  ) => void;
};

export const Form: React.FC<FormProps> = ({ submitFn }) => {
  const submitForm = (submitEvt: React.FormEvent<HTMLFormElement>) => {
    const formData = getFormDataFromSubmit(submitEvt);

    submitFn(formData, submitEvt);
  };

  return (
    <form onSubmit={submitForm}>
      <Flex direction="column" gap="3">
        {formFields.map((field) => {
          return (
            <TextField.Root
              key={field.name}
              size="3"
              name={field.name}
              placeholder={field.placeholder}
            />
          );
        })}
        <Button size="3" type="submit">
          Create
        </Button>
      </Flex>
    </form>
  );
};
