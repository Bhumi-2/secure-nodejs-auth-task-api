// Adjust this if your backend runs on a different host/port
const API_BASE = "http://localhost:5001/api/v1";

const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const taskForm = document.getElementById("task-form");
const refreshTasksBtn = document.getElementById("refresh-tasks");
const tokenDisplay = document.getElementById("token-display");
const messages = document.getElementById("messages");
const tasksList = document.getElementById("tasks-list");
const taskSubmitBtn = document.getElementById("task-submit-btn");
const taskCancelEditBtn = document.getElementById("task-cancel-edit");

let editingTaskId = null; // null = create mode, id = edit mode

function getToken() {
  return localStorage.getItem("jwt_token");
}

function setToken(token) {
  if (token) {
    localStorage.setItem("jwt_token", token);
    tokenDisplay.textContent = token;
  } else {
    localStorage.removeItem("jwt_token");
    tokenDisplay.textContent = "(not logged in)";
  }
}

function logMessage(msg) {
  const current = messages.textContent;
  messages.textContent = `[${new Date().toLocaleTimeString()}] ${msg}\n` + current;
}

async function apiRequest(path, options = {}) {
  const token = getToken();
  const headers = options.headers || {};
  if (!headers["Content-Type"] && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = {};
  }

  if (!res.ok) {
    const msg = data.message || `Request failed with status ${res.status}`;
    logMessage(` ${msg}`);
    throw new Error(msg);
  }

  return data;
}

// Initial token display
setToken(getToken());

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("register-name").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value.trim();
  const role = document.getElementById("register-role").value;

  try {
    const data = await apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, role })
    });
    logMessage(`✅ Registered user: ${data.user.email}`);
    registerForm.reset();
  } catch (err) {
    console.error(err);
  }
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  try {
    const data = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    setToken(data.token);
    logMessage("✅ Login successful");
    loginForm.reset();
    await loadTasks();
  } catch (err) {
    console.error(err);
  }
});

function enterCreateMode() {
  editingTaskId = null;
  taskSubmitBtn.textContent = "Create Task";
  taskCancelEditBtn.style.display = "none";
  taskForm.reset();
}

function enterEditMode(task) {
  editingTaskId = task._id;
  document.getElementById("task-title").value = task.title || "";
  document.getElementById("task-description").value = task.description || "";
  taskSubmitBtn.textContent = "Update Task";
  taskCancelEditBtn.style.display = "inline-block";
}

taskCancelEditBtn.addEventListener("click", () => {
  enterCreateMode();
  logMessage("ℹ️ Edit cancelled");
});

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("task-title").value.trim();
  const description = document.getElementById("task-description").value.trim();

  try {
    if (!editingTaskId) {
      // CREATE
      await apiRequest("/tasks", {
        method: "POST",
        body: JSON.stringify({ title, description })
      });
      logMessage("✅ Task created");
    } else {
      // UPDATE
      await apiRequest(`/tasks/${editingTaskId}`, {
        method: "PUT",
        body: JSON.stringify({ title, description })
      });
      logMessage("✅ Task updated");
    }

    enterCreateMode();
    await loadTasks();
  } catch (err) {
    console.error(err);
  }
});

refreshTasksBtn.addEventListener("click", async () => {
  await loadTasks();
});

async function loadTasks() {
  try {
    const data = await apiRequest("/tasks", {
      method: "GET"
    });
    renderTasks(data.tasks || []);
    logMessage("ℹ️ Tasks refreshed");
  } catch (err) {
    console.error(err);
  }
}

function renderTasks(tasks) {
  tasksList.innerHTML = "";
  if (!tasks.length) {
    tasksList.textContent = "No tasks yet.";
    return;
  }

  tasks.forEach((task) => {
    const div = document.createElement("div");
    div.className = "task";

    const span = document.createElement("span");
    span.textContent = `${task.title} – ${task.status || "pending"}`;

    const buttonsContainer = document.createElement("div");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      enterEditMode(task);
      logMessage(`✏️ Editing task: ${task.title}`);
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", async () => {
      try {
        await apiRequest(`/tasks/${task._id}`, { method: "DELETE" });
        logMessage(`Deleted task: ${task.title}`);
        if (editingTaskId === task._id) {
          enterCreateMode();
        }
        await loadTasks();
      } catch (err) {
        console.error(err);
      }
    });

    buttonsContainer.appendChild(editBtn);
    buttonsContainer.appendChild(delBtn);

    div.appendChild(span);
    div.appendChild(buttonsContainer);
    tasksList.appendChild(div);
  });
}

// try loading tasks on initial load if logged in
if (getToken()) {
  loadTasks();
}
