import React, { useState } from 'react';
import './TodoItem.css';

function TodoItem({
  todo,
  onToggle,
  onUpdate,
  onDelete,
  isEditing,
  onEditChange,
}) {
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);
  const [editedPriority, setEditedPriority] = useState(todo.priority);
  const [editedDueDate, setEditedDueDate] = useState(todo.dueDate);

  const handleSaveEdit = () => {
    if (editedTitle.trim()) {
      onUpdate(todo.id, {
        title: editedTitle.trim(),
        description: editedDescription.trim(),
        priority: editedPriority,
        dueDate: editedDueDate,
      });
      onEditChange(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedTitle(todo.title);
    setEditedDescription(todo.description);
    setEditedPriority(todo.priority);
    setEditedDueDate(todo.dueDate);
    onEditChange(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const isOverdue =
    todo.dueDate &&
    !todo.completed &&
    new Date(todo.dueDate) < new Date() &&
    new Date(todo.dueDate).toDateString() !== new Date().toDateString();

  const getPriorityEmoji = (priority) => {
    switch (priority) {
      case 'high':
        return '🔴';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return '⚪';
    }
  };

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <div className="edit-form">
          <input
            type="text"
            className="edit-title"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            maxLength={100}
          />
          <textarea
            className="edit-description"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            maxLength={500}
            placeholder="Add description..."
          />
          <div className="edit-meta">
            <div className="edit-priority">
              <label>Priority:</label>
              <select
                value={editedPriority}
                onChange={(e) => setEditedPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="edit-date">
              <label>Due Date:</label>
              <input
                type="date"
                value={editedDueDate}
                onChange={(e) => setEditedDueDate(e.target.value)}
              />
            </div>
          </div>
          <div className="edit-actions">
            <button className="save-btn" onClick={handleSaveEdit}>
              ✓ Save
            </button>
            <button className="cancel-btn" onClick={handleCancelEdit}>
              ✕ Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label="Mark task as complete"
        />
        <div className="todo-text">
          <h3 className="todo-title">
            {getPriorityEmoji(todo.priority)} {todo.title}
          </h3>
          {todo.description && (
            <p className="todo-description">{todo.description}</p>
          )}
          <div className="todo-meta">
            {todo.category && (
              <span className="meta-badge category">{todo.category}</span>
            )}
            {todo.dueDate && (
              <span className={`meta-badge date ${isOverdue ? 'overdue' : ''}`}>
                📅 {formatDate(todo.dueDate)}
              </span>
            )}
            {todo.priority !== 'medium' && (
              <span className={`meta-badge priority ${todo.priority}`}>
                {todo.priority.toUpperCase()}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="todo-actions">
        <button
          className="edit-btn"
          onClick={() => onEditChange(true)}
          title="Edit task"
        >
          ✏️
        </button>
        <button
          className="delete-btn"
          onClick={() => {
            if (window.confirm('Delete this task?')) {
              onDelete(todo.id);
            }
          }}
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TodoItem;