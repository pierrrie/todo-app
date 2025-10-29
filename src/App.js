import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    // Получаем сохранённые задачи из localStorage при первом рендере
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [input, setInput] = useState("");

  // Сохраняем задачи в localStorage при каждом изменении todos
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() !== "") {
      setTodos([...todos, { text: input, completed: false }]);
      setInput("");
    }
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <h1>Список дел</h1>
      <div className="todo-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Введите задачу"
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
        />
        <button onClick={addTodo}>Добавить</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            toggleComplete={() => toggleComplete(index)}
            deleteTodo={() => deleteTodo(index)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
