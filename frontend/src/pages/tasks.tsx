import React from "react";
import { useTasks } from "../hooks/use-tasks";
import { Box, Flex, Card, Skeleton } from "@radix-ui/themes";
import { FormTitle } from "../components/tasks-form/form-title";
import { TasksForm } from "../components/tasks-form/tasks-form";
import { TaskData } from "../apis/tasksApi";
import { TasksTable } from "../components/tasks-table/tasks-table";
import { PageTitle } from "../components/page-title/page-title";
import PageContainer from "../components/page-container/page-container";

const Tasks: React.FC = () => {
  const { tasks, isTasksLoading, createTask, editTask, deleteTask } =
    useTasks();

  const submitForm = async (formData: TaskData) => {
    // todo type conversion/coercion
    await createTask(formData as TaskData);
  };

  if (isTasksLoading) {
    return (
      <PageContainer>
        <PageTitle>Task Management App</PageTitle>
        <Skeleton height="600px" />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageTitle>Task Management App</PageTitle>
      <Flex gap="6" direction={{ initial: "column", md: "row" }}>
        <Flex
          width="100%"
          maxWidth={{ initial: "100%", md: "300px" }}
          align="start"
        >
          <Box flexGrow="1" position="sticky" top="4">
            <Card size="4">
              <Box pb="3">
                <FormTitle>Create Task</FormTitle>
              </Box>
              <Box>
                <TasksForm submitFn={submitForm} />
              </Box>
            </Card>
          </Box>
        </Flex>
        <Box width="100%">
          <TasksTable tasks={tasks} onDelete={deleteTask} onEdit={editTask} />
        </Box>
      </Flex>
    </PageContainer>
  );
};

export default Tasks;
