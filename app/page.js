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
    <>
      <main className="container">
        <h1>📝 Mongo Notes</h1>

        <div className="input-group">
          <input
            placeholder="Add a new todo..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={addTodo}>Add</button>
        </div>

        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? "done" : ""}>
              <span onClick={() => toggleTodo(todo)}>
                {todo.text}
              </span>
              <button
                className="delete"
                onClick={() => deleteTodo(todo.id)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </main>

      <style>{`
        * {
          box-sizing: border-box;
          font-family: Arial, Helvetica, sans-serif;
        }

        body {
          background: #f4f6f8;
        }

        .container {
          max-width: 500px;
          margin: 60px auto;
          background: #ffffff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }

        h1 {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }

        .input-group {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }

        input {
          flex: 1;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 14px;
        }

        input:focus {
          outline: none;
          border-color: #4f46e5;
        }

        button {
          padding: 12px 16px;
          border: none;
          border-radius: 8px;
          background: #4f46e5;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.2s;
        }

        button:hover {
          background: #4338ca;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 10px;
          background: #f9fafb;
          transition: background 0.2s;
        }

        li:hover {
          background: #eef2ff;
        }

        li span {
          cursor: pointer;
          color: #333;
        }

        li.done span {
          text-decoration: line-through;
          color: #999;
        }

        .delete {
          background: transparent;
          border: none;
          font-size: 16px;
          cursor: pointer;
        }

        .delete:hover {
          transform: scale(1.1);
        }
      `}</style>
    </>
  );
}
