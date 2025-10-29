import React from "react";

function TodoItem({ todo, toggleComplete, deleteTodo }) {
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <span onClick={toggleComplete}>{todo.text}</span>
      <button onClick={deleteTodo}>Удалить</button>
    </li>
  );
}

export default TodoItem;
