"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  async function fetchTodos() {
    const res = await fetch("/api/todos");
    setTodos(await res.json());
  }

  async function addTodo() {
    if (!text.trim()) return;

    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    setText("");
    fetchTodos();
  }

  async function toggleTodo(todo) {
    await fetch("/api/todos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: todo.id,
        completed: !todo.completed,
      }),
    });

    fetchTodos();
  }

  async function deleteTodo(id) {
    await fetch("/api/todos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    fetchTodos();
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1>Mongo Notes (Todo)</h1>

      <input
        placeholder="New todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              onClick={() => toggleTodo(todo)}
              style={{
                cursor: "pointer",
                textDecoration: todo.completed
                  ? "line-through"
                  : "none",
              }}
            >
              {todo.text}
            </span>

            <button onClick={() => deleteTodo(todo.id)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
