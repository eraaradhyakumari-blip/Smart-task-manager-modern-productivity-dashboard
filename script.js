const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priorityInput");
const dateInput = document.getElementById("dateInput");
const addTaskBtn = document.getElementById("addTaskBtn");

const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const filterInput = document.getElementById("filterInput");
const sortInput = document.getElementById("sortInput");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const importantTasks = document.getElementById("importantTasks");

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

const emptyState = document.getElementById("emptyState");

const otherView = document.getElementById("otherView");
const dashboardView = document.getElementById("dashboardView");

const otherTitle = document.getElementById("otherTitle");
const otherSubtitle = document.getElementById("otherSubtitle");
const otherTaskList = document.getElementById("otherTaskList");
const otherEmptyState = document.getElementById("otherEmptyState");

const themeBtn = document.getElementById("themeBtn");
const toast = document.getElementById("toast");

let tasks = JSON.parse(localStorage.getItem("smartTasks")) || [];

let currentView = "dashboard";

const quotes = [
    "The secret of getting ahead is getting started.",
    "Small steps every day lead to big results.",
    "Focus on progress, not perfection.",
    "Your future is created by what you do today.",
    "Success starts with a single task.",
    "Stay focused and make it happen."
];

/* DATE */

function getToday() {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

/* SAVE */

function saveTasks() {
    localStorage.setItem("smartTasks", JSON.stringify(tasks));
}

/* TOAST */

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

/* GREETING */

function setGreeting() {

    const hour = new Date().getHours();

    let greeting = "Good Morning!";

    if (hour >= 12 && hour < 18) {
        greeting = "Good Afternoon!";
    }

    if (hour >= 18) {
        greeting = "Good Evening!";
    }

    document.getElementById("greeting").textContent = greeting;
}

/* QUOTE */

function changeQuote() {

    const random =
        Math.floor(Math.random() * quotes.length);

    document.getElementById("quote").textContent =
        quotes[random];
}

/* STATS */

function updateStats() {

    const total = tasks.filter(task => !task.deleted).length;

    const completed = tasks.filter(
        task => !task.deleted && task.completed
    ).length;

    const pending = total - completed;

    const important = tasks.filter(
        task => !task.deleted && task.important
    ).length;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;
    importantTasks.textContent = important;

    const percentage =
        total === 0
            ? 0
            : Math.round((completed / total) * 100);

    progressFill.style.width = percentage + "%";
    progressText.textContent = percentage + "%";
}

/* ESCAPE HTML */

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}

/* DATE DISPLAY */

function formatDate(date) {

    if (!date) {
        return "No due date";
    }

    const d = new Date(date + "T00:00:00");

    return d.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );
}

/* DATE STATUS */

function getDateStatus(date) {

    if (!date) {
        return "";
    }

    const today = getToday();

    if (date < today) {
        return "overdue";
    }

    if (date === today) {
        return "due today";
    }

    return "";
}

/* CREATE TASK HTML */

function createTaskHTML(task) {

    const dateStatus = getDateStatus(task.dueDate);

    return `
        <div class="task ${task.completed ? "completed-task" : ""}">

            <button
                class="check ${task.completed ? "completed" : ""}"
                onclick="toggleTask(${task.id})">

                ${task.completed ? "✓" : ""}

            </button>

            <div class="task-content">

                <div class="task-title">
                    ${escapeHTML(task.title)}
                </div>

                <div class="task-meta">

                    <span class="priority ${task.priority.toLowerCase()}">
                        ${task.priority}
                    </span>

                    <span class="due ${dateStatus}">
                        📅 ${formatDate(task.dueDate)}
                        ${dateStatus ? " • " + dateStatus : ""}
                    </span>

                </div>

            </div>

            <button
                class="star ${task.important ? "active" : ""}"
                onclick="toggleImportant(${task.id})">

                ⭐

            </button>

            <div class="task-actions">

                ${
                    task.deleted
                    ?
                    `
                    <button
                        class="restore-action"
                        onclick="restoreTask(${task.id})">
                        ↩️
                    </button>

                    <button
                        class="delete-action"
                        onclick="permanentDelete(${task.id})">
                        ❌
                    </button>
                    `
                    :
                    `
                    <button
                        onclick="editTask(${task.id})">
                        ✏️
                    </button>

                    <button
                        class="delete-action"
                        onclick="deleteTask(${task.id})">
                        🗑️
                    </button>
                    `
                }

            </div>

        </div>
    `;
}

/* DASHBOARD TASKS */

function getDashboardTasks() {

    let result = tasks.filter(
        task => !task.deleted
    );

    const search = searchInput.value
        .toLowerCase()
        .trim();

    const filter = filterInput.value;
    const sort = sortInput.value;

    if (search) {
        result = result.filter(task =>
            task.title.toLowerCase().includes(search)
        );
    }

    if (filter !== "all") {
        result = result.filter(
            task => task.priority === filter
        );
    }

    if (sort === "latest") {

        result.sort(
            (a, b) => b.createdAt - a.createdAt
        );

    } else if (sort === "oldest") {

        result.sort(
            (a, b) => a.createdAt - b.createdAt
        );

    } else if (sort === "priority") {

        const values = {
            High: 3,
            Medium: 2,
            Low: 1
        };

        result.sort(
            (a, b) =>
                values[b.priority] -
                values[a.priority]
        );
    }

    return result;
}

/* DISPLAY DASHBOARD */

function displayDashboardTasks() {

    const result = getDashboardTasks();

    taskList.innerHTML = result
        .map(createTaskHTML)
        .join("");

    emptyState.style.display =
        result.length === 0
            ? "block"
            : "none";
}

/* OTHER VIEWS */

function displayOtherTasks() {

    let result = [];

    if (currentView === "all") {

        result = tasks.filter(
            task => !task.deleted
        );

        otherTitle.textContent = "All Tasks";
        otherSubtitle.textContent =
            "View all your active tasks";

    }

    else if (currentView === "today") {

        result = tasks.filter(
            task =>
                !task.deleted &&
                task.dueDate === getToday()
        );

        otherTitle.textContent = "Today's Tasks";
        otherSubtitle.textContent =
            "Tasks scheduled for today";

    }

    else if (currentView === "important") {

        result = tasks.filter(
            task =>
                !task.deleted &&
                task.important
        );

        otherTitle.textContent = "Important Tasks";
        otherSubtitle.textContent =
            "Your most important tasks";

    }

    else if (currentView === "completed") {

        result = tasks.filter(
            task =>
                !task.deleted &&
                task.completed
        );

        otherTitle.textContent = "Completed Tasks";
        otherSubtitle.textContent =
            "Tasks you have successfully completed";

    }

    else if (currentView === "trash") {

        result = tasks.filter(
            task => task.deleted
        );

        otherTitle.textContent = "Trash";
        otherSubtitle.textContent =
            "Restore or permanently delete tasks";
    }

    otherTaskList.innerHTML =
        result.map(createTaskHTML).join("");

    otherEmptyState.style.display =
        result.length === 0
            ? "block"
            : "none";
}

/* DISPLAY */

function displayTasks() {

    updateStats();

    if (currentView === "dashboard") {

        displayDashboardTasks();

    } else {

        displayOtherTasks();
    }
}

/* ADD TASK */

function addTask() {

    const title = taskInput.value.trim();

    if (!title) {

        showToast("⚠️ Please enter a task");

        taskInput.focus();

        return;
    }

    const newTask = {

        id: Date.now(),

        title: title,

        priority: priorityInput.value,

        dueDate: dateInput.value,

        completed: false,

        important: false,

        deleted: false,

        createdAt: Date.now()
    };

    tasks.push(newTask);

    saveTasks();

    taskInput.value = "";
    dateInput.value = "";
    priorityInput.value = "Medium";

    displayTasks();

    showToast("✅ Task added successfully!");
}

/* COMPLETE */

function toggleTask(id) {

    const task = tasks.find(
        task => task.id === id
    );

    if (!task) {
        return;
    }

    task.completed = !task.completed;

    saveTasks();

    displayTasks();

    showToast(
        task.completed
            ? "🎉 Task completed!"
            : "↩️ Task marked as pending"
    );
}

/* IMPORTANT */

function toggleImportant(id) {

    const task = tasks.find(
        task => task.id === id
    );

    if (!task) {
        return;
    }

    task.important = !task.important;

    saveTasks();

    displayTasks();

    showToast(
        task.important
            ? "⭐ Added to important"
            : "☆ Removed from important"
    );
}

/* EDIT */

function editTask(id) {

    const task = tasks.find(
        task => task.id === id
    );

    if (!task) {
        return;
    }

    const newTitle = prompt(
        "Edit your task:",
        task.title
    );

    if (newTitle === null) {
        return;
    }

    if (!newTitle.trim()) {

        showToast("⚠️ Task cannot be empty");

        return;
    }

    task.title = newTitle.trim();

    saveTasks();

    displayTasks();

    showToast("✏️ Task updated!");
}

/* DELETE TO TRASH */

function deleteTask(id) {

    const task = tasks.find(
        task => task.id === id
    );

    if (!task) {
        return;
    }

    task.deleted = true;

    saveTasks();

    displayTasks();

    showToast("🗑️ Task moved to trash");
}

/* RESTORE */

function restoreTask(id) {

    const task = tasks.find(
        task => task.id === id
    );

    if (!task) {
        return;
    }

    task.deleted = false;

    saveTasks();

    displayTasks();

    showToast("↩️ Task restored");
}

/* PERMANENT DELETE */

function permanentDelete(id) {

    const confirmDelete = confirm(
        "Permanently delete this task?"
    );

    if (!confirmDelete) {
        return;
    }

    tasks = tasks.filter(
        task => task.id !== id
    );

    saveTasks();

    displayTasks();

    showToast("❌ Task permanently deleted");
}

/* NAVIGATION */

document.querySelectorAll(".nav-item")
    .forEach(button => {

        button.addEventListener(
            "click",
            function() {

                document
                    .querySelectorAll(".nav-item")
                    .forEach(item =>
                        item.classList.remove("active")
                    );

                this.classList.add("active");

                currentView =
                    this.dataset.view;

                if (currentView === "dashboard") {

                    dashboardView.classList.remove("hidden");
                    otherView.classList.add("hidden");

                    document.getElementById(
                        "pageTitle"
                    ).textContent = "My Dashboard";

                } else {

                    dashboardView.classList.add("hidden");
                    otherView.classList.remove("hidden");

                    document.getElementById(
                        "pageTitle"
                    ).textContent = "Task Manager";
                }

                displayTasks();
            }
        );
    });

/* SEARCH */

searchInput.addEventListener(
    "input",
    displayDashboardTasks
);

/* FILTER */

filterInput.addEventListener(
    "change",
    displayDashboardTasks
);

/* SORT */

sortInput.addEventListener(
    "change",
    displayDashboardTasks
);

/* ADD */

addTaskBtn.addEventListener(
    "click",
    addTask
);

/* ENTER */

taskInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            addTask();
        }
    }
);

/* THEME */

themeBtn.addEventListener(
    "click",
    function() {

        document.body.classList.toggle("dark");

        const dark =
            document.body.classList.contains("dark");

        themeBtn.textContent =
            dark ? "☀️" : "🌙";

        localStorage.setItem(
            "smartTheme",
            dark ? "dark" : "light"
        );
    }
);

/* LOAD THEME */

if (
    localStorage.getItem("smartTheme") === "dark"
) {

    document.body.classList.add("dark");

    themeBtn.textContent = "☀️";
}

/* INITIALIZE */

setGreeting();
changeQuote();
displayTasks();