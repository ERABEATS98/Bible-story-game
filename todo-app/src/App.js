import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoStats from './components/TodoStats';
import FilterBar from './components/FilterBar';
import { loadTodos, saveTodos } from './utils/storage';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [sortBy, setSortBy] = useState('date');

  // Load todos from local storage on mount
  useEffect(() => {
    const savedTodos = loadTodos();
    setTodos(savedTodos);
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  // Save todos to local storage whenever they change
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  // Apply dark mode
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Add new todo
  const addTodo = (todoData) => {
    const newTodo = {
      id: Date.now(),
      ...todoData,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos([newTodo, ...todos]);
  };

  // Update todo
  const updateTodo = (id, updates) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, ...updates } : todo));
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Toggle todo completion
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Filter and search todos
  const getFilteredTodos = () => {
    let filtered = todos;

    // Filter by status
    if (filter === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    } else if (filter === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    }

    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter(todo => todo.category === category);
    }

    // Filter by search
    if (search) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(search.toLowerCase()) ||
        todo.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'priority') {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (sortBy === 'dueDate') {
      filtered.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    } else if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return filtered;
  };

  const filteredTodos = getFilteredTodos();
  const categories = ['all', ...new Set(todos.map(t => t.category).filter(Boolean))];

  // Export todos
  const exportTodos = () => {
    const dataStr = JSON.stringify(todos, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  // Import todos
  const importTodos = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedTodos = JSON.parse(e.target.result);
          if (Array.isArray(importedTodos)) {
            setTodos([...todos, ...importedTodos]);
            alert('Todos imported successfully!');
          } else {
            alert('Invalid file format');
          }
        } catch (error) {
          alert('Error importing file: ' + error.message);
        }
      };
      reader.readAsText(file);
    }
  };

  // Clear completed
  const clearCompleted = () => {
    if (window.confirm('Delete all completed todos?')) {
      setTodos(todos.filter(todo => !todo.completed));
    }
  };

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="header-top">
            <h1 className="title">📝 My Tasks</h1>
            <button
              className="dark-mode-toggle"
              onClick={() => setDarkMode(!darkMode)}
              title="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
          <p className="subtitle">Stay organized and productive</p>
        </header>

        {/* Stats */}
        <TodoStats todos={todos} />

        {/* Main content */}
        <div className="main-content">
          {/* Sidebar */}
          <aside className="sidebar">
            <TodoForm onAddTodo={addTodo} categories={categories} />

            {/* Quick Actions */}
            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <button className="action-btn" onClick={exportTodos}>
                📥 Export
              </button>
              <label className="action-btn">
                📤 Import
                <input
                  type="file"
                  accept=".json"
                  onChange={importTodos}
                  style={{ display: 'none' }}
                />
              </label>
              {todos.some(t => t.completed) && (
                <button className="action-btn danger" onClick={clearCompleted}>
                  🗑️ Clear Completed
                </button>
              )}
            </div>
          </aside>

          {/* Main area */}
          <main className="main-area">
            {/* Filter and search */}
            <FilterBar
              filter={filter}
              setFilter={setFilter}
              category={category}
              setCategory={setCategory}
              search={search}
              setSearch={setSearch}
              sortBy={sortBy}
              setSortBy={setSortBy}
              categories={categories}
            />

            {/* Todo list */}
            <TodoList
              todos={filteredTodos}
              onToggle={toggleTodo}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />

            {/* Empty state */}
            {filteredTodos.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">🎯</div>
                <h3>No tasks found</h3>
                <p>
                  {todos.length === 0
                    ? 'Create your first task to get started!'
                    : 'Try adjusting your filters or search.'}
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;