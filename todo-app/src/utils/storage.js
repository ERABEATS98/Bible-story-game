// Local Storage Management

const STORAGE_KEY = 'todos_app_data';
const VERSION = '1.0';

// Load todos from localStorage
export const loadTodos = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      return parsed.todos || [];
    }
    return [];
  } catch (error) {
    console.error('Error loading todos:', error);
    return [];
  }
};

// Save todos to localStorage
export const saveTodos = (todos) => {
  try {
    const data = {
      version: VERSION,
      todos,
      lastSaved: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving todos:', error);
  }
};

// Clear all todos
export const clearTodos = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing todos:', error);
  }
};

// Export todos as JSON
export const exportTodos = (todos) => {
  const dataStr = JSON.stringify(todos, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
};

// Import todos from JSON
export const importTodos = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const todos = JSON.parse(e.target.result);
        if (Array.isArray(todos)) {
          resolve(todos);
        } else {
          reject(new Error('Invalid todo format'));
        }
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};