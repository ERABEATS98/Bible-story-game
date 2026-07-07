import React, { useState } from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList({ todos, onToggle, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null);

  return (
    <div className="todo-list">
      {todos.length > 0 ? (
        <div className="todo-items">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onUpdate={onUpdate}
              onDelete={onDelete}
              isEditing={editingId === todo.id}
              onEditChange={(isEditing) => setEditingId(isEditing ? todo.id : null)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default TodoList;