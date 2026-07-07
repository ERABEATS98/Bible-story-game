import React from 'react';
import './TodoStats.css';

function TodoStats({ todos }) {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const active = total - completed;
  const highPriority = todos.filter((t) => t.priority === 'high' && !t.completed).length;

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-icon">📊</div>
        <div className="stat-content">
          <div className="stat-value">{total}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">🔄</div>
        <div className="stat-content">
          <div className="stat-value">{active}</div>
          <div className="stat-label">Active</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">✓</div>
        <div className="stat-content">
          <div className="stat-value">{completed}</div>
          <div className="stat-label">Completed</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">🎯</div>
        <div className="stat-content">
          <div className="stat-value">{completionRate}%</div>
          <div className="stat-label">Progress</div>
        </div>
      </div>

      {highPriority > 0 && (
        <div className="stat-card urgent">
          <div className="stat-icon">🔴</div>
          <div className="stat-content">
            <div className="stat-value">{highPriority}</div>
            <div className="stat-label">High Priority</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoStats;