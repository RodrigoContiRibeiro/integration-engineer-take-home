import { useState, useEffect, FormEvent } from "react";
import {
  Box,
  Container,
  IconButton,
  Table,
  Heading,
  Flex,
  Card,
  TextField,
  Button,
} from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";

type TaskData = {
  title: string;
  description: string;
};

type Task = TaskData & {
  id: string;
};

const getTaskDataFromFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
  evt.preventDefault();

  const formData = new FormData(evt.target as HTMLFormElement);
  const taskData = Object.fromEntries(formData.entries());

  return taskData as TaskData;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch("http://localhost:8000/v1/tasks");
    const tasks = await response.json();
    setTasks(tasks);
  };

  const createTask = async (task: TaskData) => {
    const response = await fetch("http://localhost:8000/v1/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const newTask = await response.json();
    setTasks((prev) => {
      return [...prev, newTask];
    });
  };

  const deleteTask = async (id: string) => {
    await fetch(`http://localhost:8000/v1/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const submitForm = (evt: FormEvent<HTMLFormElement>) => {
    const taskData = getTaskDataFromFormSubmit(evt);

    createTask(taskData);
  };

  return (
    <Container size="3">
      <Box pb="9">
        <Heading size="9" as="h1" align="center">
          Task Management App
        </Heading>
      </Box>
      <Flex gap="6">
        <Flex width="100%" maxWidth="300px">
          <Card size="4">
            <Box pb="3">
              <Heading size="5" as="h3">
                Create Task
              </Heading>
            </Box>
            <Box>
              <form onSubmit={submitForm}>
                <Flex direction="column" gap="3">
                  <TextField.Root size="3" placeholder="Title" name="title" />
                  <TextField.Root
                    size="3"
                    placeholder="Description"
                    name="description"
                  />
                  <Button size="3" type="submit">
                    Create
                  </Button>
                </Flex>
              </form>
            </Box>
          </Card>
        </Flex>
        <Box width="100%">
          <Table.Root size="3">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell width="64px" />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tasks.map((task) => (
                <Table.Row key={task.id}>
                  <Table.RowHeaderCell>{task.title}</Table.RowHeaderCell>
                  <Table.Cell>{task.description}</Table.Cell>
                  <Table.Cell width="64px" justify="center">
                    <IconButton color="red" onClick={() => deleteTask(task.id)}>
                      <TrashIcon width={16} height={16} />
                    </IconButton>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      </Flex>
    </Container>
  );
}

export default App;
