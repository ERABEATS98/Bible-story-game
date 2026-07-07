# 📝 Todo List Application

A feature-rich, modern todo list application with local storage functionality. Built with React and styled with CSS, this app helps you stay organized and productive.

## ✨ Features

### Core Features
- ✅ **Add/Edit/Delete Tasks** - Manage your tasks easily
- ✅ **Local Storage** - All data saved in your browser (no server needed)
- ✅ **Mark Complete** - Track completed tasks with visual feedback
- ✅ **Search & Filter** - Find tasks by title or description
- ✅ **Task Categories** - Organize tasks by category
- ✅ **Priority Levels** - Set priority (High/Medium/Low)
- ✅ **Due Dates** - Add deadlines to tasks
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile

### Advanced Features
- 🌙 **Dark Mode** - Easy on the eyes with dark theme
- 📊 **Statistics** - View progress and task metrics
- 📥 **Export Tasks** - Download your tasks as JSON
- 📤 **Import Tasks** - Load tasks from JSON file
- 🔄 **Advanced Sorting** - Sort by date, priority, or due date
- 🗑️ **Bulk Actions** - Clear all completed tasks

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository** (if on GitHub)
```bash
git clone https://github.com/ERABEATS98/Bible-story-game.git
cd Bible-story-game/todo-app
```

2. **Or create on Replit**
   - Go to https://replit.com
   - Click "Create" → "New Replit"
   - Select "React" template
   - Copy the files from this project

3. **Install dependencies**
```bash
npm install
```

4. **Start the development server**
```bash
npm start
```

5. **Open in browser**
   - Navigate to `http://localhost:3000`
   - App opens automatically

## 🎮 How to Use

### Adding a Task
1. Enter task title in the "Task Title" field
2. (Optional) Add description
3. (Optional) Click "More Options" to set:
   - Priority level
   - Due date
   - Category
4. Click "➕ Add Task"

### Managing Tasks
- **Check off** - Click checkbox to mark complete/incomplete
- **Edit** - Click ✏️ to modify task details
- **Delete** - Click 🗑️ to remove task
- **Search** - Use search bar to find specific tasks

### Filtering & Sorting
- **Filter** - View all, active, or completed tasks
- **Sort** - By date added, priority, or due date
- **Category** - Filter by task category

### Other Features
- **Dark Mode** - Toggle 🌙/☀️ in top right
- **Export** - Download tasks as JSON backup
- **Import** - Load tasks from previously exported file
- **Clear Completed** - Delete all finished tasks at once

## 💾 Local Storage

All your tasks are automatically saved to your browser's local storage. This means:
- ✅ Data persists between sessions
- ✅ No server needed - everything is local
- ✅ Privacy - your data never leaves your computer
- ✅ Offline - works without internet connection

**Note:** Clearing browser data will delete all tasks. Use Export to backup!

## 🎨 Customization

### Colors
Edit `src/App.css` to change the color scheme:
```css
/* Primary gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Dark mode gradient */
background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
```

### Theme
Modify color variables in component CSS files to match your brand.

## 📱 Responsive Design

- **Desktop** (1024px+) - Full layout with sidebar
- **Tablet** (768px-1024px) - Optimized grid
- **Mobile** (< 768px) - Single column layout

## 🐛 Troubleshooting

### Tasks not saving?
- Check browser storage quota
- Try clearing cache and reloading
- Ensure cookies/storage is enabled in browser

### App not loading?
- Clear browser cache
- Run `npm install` again
- Try different browser

### Export/Import not working?
- Ensure JSON file is valid
- Try exporting first to see correct format
- Check browser console for errors

## 📝 Project Structure

```
todo-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── TodoForm.js
│   │   ├── TodoList.js
│   │   ├── TodoItem.js
│   │   ├── FilterBar.js
│   │   └── TodoStats.js
│   ├── utils/
│   │   └── storage.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🔮 Future Enhancements

- 📱 Mobile app version (React Native)
- ☁️ Cloud sync (Firebase/Supabase)
- 🔔 Notifications & reminders
- 📊 Advanced analytics
- 🎯 Goal tracking
- 👥 Collaboration features
- 📅 Calendar view
- ⏰ Time tracking

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📞 Support

Having issues? 
- Check the [Troubleshooting](#-troubleshooting) section
- Review browser console for errors
- Clear cache and try again

---

**Made with ❤️ for productivity enthusiasts**

🌟 If you like this app, please star the repository!
