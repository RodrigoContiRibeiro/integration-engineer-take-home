import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex } from "@radix-ui/themes";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { TaskData, taskDataSchema } from "../../apis/tasksApi";
import { FormInput } from "./form-input";
import { delay } from "../../utils/delay";

export type FormProps = {
  initialValues?: Partial<TaskData>;
  submitFn: (formData: TaskData) => Promise<void>;
};

const hasFormErrors = (formErrors: FieldErrors<TaskData>) => {
  const errorsCount = Object.keys(formErrors).length;

  const hasErrors = errorsCount > 0;

  return hasErrors;
};

const DEFAULT_INITIAL_VALUES: TaskData = { title: "", description: "" };

export const TasksForm: React.FC<FormProps> = ({
  initialValues = DEFAULT_INITIAL_VALUES,
  submitFn,
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultValues = React.useMemo<TaskData>(() => {
    return {
      title: initialValues.title ?? "",
      description: initialValues.description ?? "",
    };
  }, [initialValues.title, initialValues.description]);

  const {
    reset,
    formState: { isSubmitSuccessful, errors },
    handleSubmit,
    control,
  } = useForm<TaskData>({
    defaultValues,
    resolver: zodResolver(taskDataSchema),
    criteriaMode: "all",
  });

  const [loadingSubmission, setLoadingSubmission] =
    React.useState<boolean>(false);

  const hasErrors = hasFormErrors(errors);

  React.useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues, isSubmitSuccessful]);

  const onSubmit: SubmitHandler<TaskData> = async (taskData) => {
    setLoadingSubmission(true);

    await delay(1000);

    await submitFn(taskData);

    setLoadingSubmission(false);
  };

  const disabledSubmission = hasErrors || loadingSubmission;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="3">
        <FormInput name="title" control={control} />
        <FormInput name="description" control={control} />
        <Button
          size="3"
          type="submit"
          disabled={disabledSubmission}
          loading={loadingSubmission}
        >
          Create
        </Button>
      </Flex>
    </form>
  );
};
