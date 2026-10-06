import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/frontend/api";

export type Todo = { id: number, text: string, done: boolean };

export function useTodo() {
  const queryClient = useQueryClient();

  const refresh = () => queryClient.invalidateQueries({ queryKey: ["todos"] });

  const { data: todos = [], isLoading, isError, } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await api.get<Todo[]>("/todos");
      return res.data;
    },
  });

  const addMutation = useMutation({
    mutationFn: (text: string) => api.post<Todo>("/todos", { text }),
    onSuccess: refresh,
  });

  const toggleMutation = useMutation({
    mutationFn: (todo: Todo) =>
      api.patch<Todo>(`/todos/${todo.id}`, { done: !todo.done }),
    onSuccess: refresh,
  });

  const removeMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/todos/${id}`),
    onSuccess: refresh,
  });

  return {
    todos,
    isLoading,
    isError,
    addTodo: (text: string) => addMutation.mutate(text),
    toggleTodo: (id: number) => {
      const todo = todos.find((t) => t.id === id);
      if (todo) toggleMutation.mutate(todo);
    },
    removeTodo: (id: number) => removeMutation.mutate(id),
  };
}