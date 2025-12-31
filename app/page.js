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
      body: JSON.stringify({ id: todo.id, completed: !todo.completed }),
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
              <span onClick={() => toggleTodo(todo)}>{todo.text}</span>
              <button className="delete" onClick={() => deleteTodo(todo.id)}>
                ❌
              </button>
            </li>
          ))}
        </ul>
      </main>

      <style>{`
        * {
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
          background: #f0f7f7;
          margin: 0;
          padding: 0;
        }

        .container {
          max-width: 480px;
          margin: 80px auto;
          background: #ffffff;
          padding: 40px 30px;
          border-radius: 20px;
          box-shadow: 0 15px 30px rgba(0,0,0,0.08);
          transition: all 0.3s ease-in-out;
        }

        .container:hover {
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        }

        h1 {
          text-align: center;
          margin-bottom: 30px;
          font-size: 28px;
          color: #00bfa5;
        }

        .input-group {
          display: flex;
          gap: 12px;
          margin-bottom: 25px;
        }

        input {
          flex: 1;
          padding: 14px 16px;
          border-radius: 12px;
          border: 1px solid #b2dfdb;
          font-size: 15px;
          transition: 0.3s;
        }

        input:focus {
          outline: none;
          border-color: #00bfa5;
          box-shadow: 0 0 8px rgba(0,191,165,0.2);
        }

        button {
          padding: 14px 20px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(90deg, #00bfa5, #1de9b6);
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }

        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(29,233,182,0.3);
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
          padding: 14px 16px;
          border-radius: 14px;
          margin-bottom: 12px;
          background: #e0f2f1;
          transition: 0.3s;
        }

        li:hover {
          background: #b2dfdb;
        }

        li span {
          cursor: pointer;
          font-size: 16px;
          transition: color 0.3s, transform 0.2s;
        }

        li span:hover {
          color: #00796b;
          transform: scale(1.02);
        }

        li.done span {
          text-decoration: line-through;
          color: #999;
        }

        .delete {
          background: transparent;
          border: none;
          font-size: 18px;
          cursor: pointer;
          transition: 0.2s;
        }

        .delete:hover {
          color: #ff6b6b;
          transform: scale(1.2);
        }

        @media (max-width: 500px) {
          .container {
            margin: 40px 20px;
            padding: 30px 20px;
          }
        