import React from "react";
import { useTasks } from "../hooks/use-tasks";
import { Box, Container, Heading, Flex, Card } from "@radix-ui/themes";
import { FormTitle } from "../components/form/form-title";
import { Form, RecordFormData } from "../components/form/form";
import { TaskData } from "../apis/tasksApi";
import { TasksTable } from "../components/tasks-table/tasks-table";

const Tasks: React.FC = () => {
  const { tasks, createTask, deleteTask } = useTasks();

  const submitForm = async (formData: RecordFormData) => {
    // todo type conversion/coercion
    createTask(formData as TaskData);
  };

  return (
    <Container size="3" p="6">
      <Box pb="9">
        <Heading size="9" as="h1" align="center">
          Task Management App
        </Heading>
      </Box>
      <Flex gap="6">
        <Flex width="100%" maxWidth="300px" align="start">
          <Box flexGrow="1" position="sticky" top="4">
            <Card size="4">
              <Box pb="3">
                <FormTitle>Create Task</FormTitle>
              </Box>
              <Box>
                <Form submitFn={submitForm} />
              </Box>
            </Card>
          </Box>
        </Flex>
        <Box width="100%">
          <TasksTable tasks={tasks} onDelete={deleteTask} />
        </Box>
      </Flex>
    </Container>
  );
};

export default Tasks;
