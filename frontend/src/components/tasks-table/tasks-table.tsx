import React from "react";
import { Table as RadixTable } from "@radix-ui/themes";
import { Task } from "../../apis/tasksApi";
import { DeleteTaskButton } from "./delete-task-button";

type TasksTableProps = {
  tasks: Task[];
  onDelete: (taskId: string) => void;
};

export const TasksTable: React.FC<TasksTableProps> = ({ tasks, onDelete }) => {
  return (
    <RadixTable.Root size="3">
      <RadixTable.Header>
        <RadixTable.Row>
          <RadixTable.ColumnHeaderCell>Title</RadixTable.ColumnHeaderCell>
          <RadixTable.ColumnHeaderCell>Description</RadixTable.ColumnHeaderCell>
          <RadixTable.ColumnHeaderCell width="64px" />
        </RadixTable.Row>
      </RadixTable.Header>
      <RadixTable.Body>
        {tasks.map((task) => {
          const onClickDelete = () => {
            onDelete(task.id);
          };

          return (
            <RadixTable.Row key={task.id}>
              <RadixTable.RowHeaderCell>{task.title}</RadixTable.RowHeaderCell>
              <RadixTable.Cell>{task.description}</RadixTable.Cell>
              <RadixTable.Cell width="64px" justify="center">
                <DeleteTaskButton onClick={onClickDelete} />
              </RadixTable.Cell>
            </RadixTable.Row>
          );
        })}
      </RadixTable.Body>
    </RadixTable.Root>
  );
};
