
import React, { useState } from 'react';

const TodoItem = ({ todo, toggleTodo, deleteTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing) {
      editTodo(todo.id, editText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <li className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200 mb-2">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="h-5 w-5 text-purple-600 rounded focus:ring-purple-500"
        />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="ml-3 p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        ) : (
          <span className={`ml-3 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {todo.text}
          </span>
        )}
      </div>
      <div className="flex space-x-2">
        <button
          onClick={handleEdit}
          className="text-purple-600 hover:text-purple-800"
        >
          ✏️
        </button>
        <button
          onClick={() => deleteTodo(todo.id)}
          className="text-purple-600 hover:text-purple-800"
        >
          🗑️
        </button>
      </div>
    </li>
  );
};

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [showFinished, setShowFinished] = useState(false);

  const addTodo = () => {
    if (input.trim() === '') return;
    setTodos([
      ...todos,
      { id: Date.now(), text: input, completed: false },
    ]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const filteredTodos = showFinished
    ? todos
    : todos.filter((todo) => !todo.completed);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-200 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          iTask - Manage your todos at one place
        </h1>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Add a Todo</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your todo"
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            />
            <button
              onClick={addTodo}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
            >
              Save
            </button>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={showFinished}
            onChange={() => setShowFinished(!showFinished)}
            className="h-5 w-5 text-purple-600 rounded focus:ring-purple-500"
          />
          <span className="ml-2 text-gray-700">Show Finished</span>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Your Todos</h2>
          {filteredTodos.length === 0 ? (
            <p className="text-gray-500">No todos to display.</p>
          ) : (
            <ul className="space-y-2">
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
