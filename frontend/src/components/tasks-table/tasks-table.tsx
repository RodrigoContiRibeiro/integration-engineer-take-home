import React from "react";
import { Flex, Table as RadixTable } from "@radix-ui/themes";
import { Task, TaskData, TaskId } from "../../apis/tasksApi";
import { DeleteTaskButton } from "./delete-task-button";
import { EditTask } from "./edit-task";

type TasksTableProps = {
  tasks: Task[];
  onDelete: (taskId: TaskId) => Promise<void>;
  onEdit: (taskId: TaskId, task: TaskData) => Promise<void>;
};

export const TasksTable: React.FC<TasksTableProps> = ({
  tasks,
  onDelete,
  onEdit,
}) => {
  return (
    <RadixTable.Root size={{ initial: "1", xs: "2", sm: "3" }}>
      <RadixTable.Header>
        <RadixTable.Row>
          <RadixTable.ColumnHeaderCell>Title</RadixTable.ColumnHeaderCell>
          <RadixTable.ColumnHeaderCell>Description</RadixTable.ColumnHeaderCell>
          <RadixTable.ColumnHeaderCell width="104px" />
        </RadixTable.Row>
      </RadixTable.Header>
      <RadixTable.Body>
        {tasks.map((task) => {
          const onClickDelete = async () => {
            await onDelete(task.id);
          };

          const onEditSubmit = async (newTask: TaskData) => {
            await onEdit(task.id, newTask);
          };

          return (
            <RadixTable.Row key={task.id}>
              <RadixTable.RowHeaderCell>{task.title}</RadixTable.RowHeaderCell>
              <RadixTable.Cell>{task.description}</RadixTable.Cell>
              <RadixTable.Cell width="64px" justify="center">
                <Flex gap="2">
                  <EditTask task={task} onSubmit={onEditSubmit} />
                  <DeleteTaskButton onClick={onClickDelete} />
                </Flex>
              </RadixTable.Cell>
            </RadixTable.Row>
          );
        })}
      </RadixTable.Body>
    </RadixTable.Root>
  );
};
