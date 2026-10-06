import { useState } from "react";
import { useTodo } from "@/lib/frontend/hooks";
import { ActionIcon, Button, Checkbox, TextInput, Title } from "@mantine/core";

export default function TodoPage() {
  const { todos, isLoading, isError, addTodo, toggleTodo, removeTodo } = useTodo();
  const [text, setText] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    addTodo(trimmed);
    setText("");
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="h-fit w-2/3 rounded-lg border">
        <div className="p-4 border-b">
          <Title order={2} className="mb-3">
            My todos
          </Title>
          <form onSubmit={handleSubmit} className="flex flex-row gap-2">
            <TextInput
              className="flex-1"
              placeholder="What needs to be done?"
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
            />
            <Button type="submit">Add</Button>
          </form>
        </div>

        <div className="h-96 p-4 flex flex-col gap-2 overflow-y-scroll">
          {isLoading && <p className="text-center">Loading...</p>}

          {isError && (
            <p className="text-center text-red-500">Could not load todos.</p>
          )}

          {!isLoading && !isError && todos.length === 0 && (
            <p className="text-gray-500 text-center">Nothing to do yet</p>
          )}

          {todos.map((todo) => (
            <div
              key={todo.id}
              className="w-full border rounded-lg flex flex-row items-center justify-between p-4"
            >
              <Checkbox
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
                label={todo.text}
                classNames={{
                  label: todo.done ? "line-through text-gray-400" : "",
                }}
              />
              <ActionIcon
                color="red"
                variant="light"
                aria-label="Delete todo"
                onClick={() => removeTodo(todo.id)}
              >
                ✕
              </ActionIcon>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}