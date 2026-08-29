# 🚀 Smart Task Manager

> **A modern, responsive productivity dashboard built with HTML5, CSS3, and JavaScript.**

Smart Task Manager is a feature-rich task management web application designed to help users organize daily activities, prioritize important work, track productivity, and manage completed and deleted tasks through a clean and modern dashboard.

---

## ✨ Features

### 📊 Productivity Dashboard

* Total tasks counter
* Completed tasks counter
* Pending tasks counter
* Important tasks counter
* Dynamic productivity percentage
* Animated productivity progress bar

### 📝 Task Management

* Add new tasks
* Edit existing tasks
* Mark tasks as completed
* Mark tasks as important ⭐
* Move tasks to Trash
* Restore deleted tasks
* Permanently delete tasks

### 🎯 Task Organization

* High, Medium, and Low priority
* Due-date management
* Today's Tasks view
* Important Tasks view
* Completed Tasks view
* All Tasks view
* Trash management

### 🔍 Search & Sorting

* Search tasks instantly
* Filter tasks by priority
* Sort by:

  * Latest
  * Oldest
  * Priority

### 🎨 Modern UI/UX

* Clean productivity dashboard
* Dark Mode / Light Mode
* Responsive design
* Smooth animations
* Interactive buttons and cards
* Toast notifications
* Motivational quotes
* Mobile-friendly interface

### 💾 Data Persistence

Tasks are stored using **Browser LocalStorage**, so your tasks remain available even after refreshing or reopening the browser.

---

## 🛠️ Technologies Used

| Technology       | Purpose                                 |
| ---------------- | --------------------------------------- |
| HTML5            | Website structure                       |
| CSS3             | Styling, animations & responsive design |
| JavaScript       | Application logic & interactivity       |
| DOM Manipulation | Dynamic UI updates                      |
| LocalStorage     | Persistent task storage                 |
| JSON             | Task data management                    |

---

## 📂 Project Structure

```text
Smart-Task-Manager/
│
├── index.html       # Main application structure
├── style.css        # UI styling and responsive design
├── script.js        # Application logic
└── README.md        # Project documentation
```

---

## ⚙️ How It Works

```text
        User
         │
         ▼
   Add / Edit Task
         │
         ▼
   JavaScript Logic
         │
         ▼
   Task Data Object
         │
         ▼
     LocalStorage
         │
         ▼
   Dynamic Dashboard
         │
         ▼
 Statistics + Task List
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/smart-task-manager.git
```

### 2. Open the project

```bash
cd smart-task-manager
```

### 3. Run the application

Open:

```text
index.html
```

in your web browser.

You can also use the **Live Server** extension in VS Code for a better development experience.

---

## 📱 Responsive Design

The application is designed to work across:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📲 Tablet

The layout automatically adjusts according to the screen size.

---

## 🧠 JavaScript Concepts Demonstrated

This project demonstrates practical implementation of:

* Variables and functions
* Arrays and objects
* Array methods
* Event listeners
* DOM manipulation
* Conditional rendering
* Template literals
* LocalStorage
* JSON parsing/stringification
* Search and filtering
* Sorting algorithms
* CRUD operations
* Dynamic UI updates
* Date handling

---

## 🔐 Data Storage

The project uses browser **LocalStorage** to save task information.

Example task structure:

```javascript
{
    id: 123456789,
    title: "Complete Portfolio Website",
    priority: "High",
    dueDate: "2026-08-30",
    completed: false,
    important: true,
    deleted: false
}
```

No external database or backend server is required.

---

## 🎯 Use Cases

Smart Task Manager can be used by:

* Students managing assignments
* Developers managing coding tasks
* Professionals organizing daily work
* Freelancers tracking projects
* Anyone looking for a simple productivity tool

---

## 🌟 Key Highlights

### Productivity Tracking

The dashboard automatically calculates:

```text
Productivity =
Completed Tasks / Total Tasks × 100
```

### Priority Management

Tasks can be categorized into:

🔴 **High**
🟡 **Medium**
🟢 **Low**

### Smart Due Dates

The application identifies:

* Overdue tasks
* Tasks due today
* Future tasks
* Tasks without deadlines

---

## 🔮 Future Enhancements

Possible improvements include:

* 🔐 User authentication
* ☁️ Cloud database integration
* 🔔 Browser notifications
* 📧 Email reminders
* 📅 Calendar integration
* 📊 Advanced productivity charts
* 👥 Team task sharing
* 🔄 Drag-and-drop task management
* 🌐 Backend API integration
* 🤖 AI-powered task suggestions

---

## 📸 Project Preview

Add screenshots of your application here:

```text
screenshots/
│
├── dashboard.png
├── dark-mode.png
├── task-management.png
└── mobile-view.png
```

Example:

```markdown
![Dashboard](screenshots/dashboard.png)
```

---

## 💡 What I Learned

While building this project, I gained practical experience in:

* Creating responsive web interfaces
* Managing application state with JavaScript
* Working with browser LocalStorage
* Implementing CRUD functionality
* Handling user events
* Building reusable UI components
* Creating search, filter, and sorting functionality
* Designing user-friendly interfaces

---

## 👩‍💻 Author

### Aaradhya Kumari

**B.Tech Computer Science Engineering Student**

Interested in:

* Web Development
* JavaScript
* Java
* Python
* AI/ML
* Software Development

---

## ⭐ Support

If you found this project useful, consider giving the repository a ⭐.

Your feedback and suggestions are always welcome!

---

### 📌 Project Summary

**Smart Task Manager** is more than a basic To-Do application. It combines **task management, productivity tracking, priority organization, search, filtering, sorting, LocalStorage, responsive UI, and dark mode** into a single modern web application.

**Built with ❤️ using HTML, CSS & JavaScript.**
