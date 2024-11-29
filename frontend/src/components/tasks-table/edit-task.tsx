import React from "react";
import { Dialog, Flex, IconButton } from "@radix-ui/themes";
import { Pencil2Icon, Cross1Icon } from "@radix-ui/react-icons";
import { TasksForm } from "../tasks-form/tasks-form";
import { Task, TaskData } from "../../apis/tasksApi";

export type EditTaskProps = {
  task: Task;
  onSubmit: (task: TaskData) => Promise<void>;
};
export const EditTask: React.FC<EditTaskProps> = ({ task, onSubmit }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton color="grass">
          <Pencil2Icon width={16} height={16} />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Content>
        <Flex justify="end">
          <Dialog.Close>
            <IconButton variant="soft" color="gray">
              <Cross1Icon width={16} height={16} />
            </IconButton>
          </Dialog.Close>
        </Flex>
        <Dialog.Title>Edit Task</Dialog.Title>
        <Dialog.Description>Make changes to this task.</Dialog.Description>
        <TasksForm initialValues={task} submitFn={onSubmit} />
      </Dialog.Content>
    </Dialog.Root>
  );
};
