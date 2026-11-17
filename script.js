const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const priority = document.getElementById("priority");
const dueDate = document.getElementById("dueDate");
const search = document.getElementById("search");

let tasks = JSON.parse(
    localStorage.getItem("tasks")
) || [];

function saveTasks(){
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function updateStats(){

    const completed =
        tasks.filter(
            task => task.completed
        ).length;

    document.getElementById("total")
        .textContent =
        `Total: ${tasks.length}`;

    document.getElementById("completed")
        .textContent =
        `Completed: ${completed}`;

    document.getElementById("pending")
        .textContent =
        `Pending: ${tasks.length - completed}`;
}

function renderTasks(){

    taskList.innerHTML = "";

    tasks.forEach(task=>{

        const li =
            document.createElement("li");

        li.classList.add(
            task.priority.toLowerCase()
        );

        if(task.completed){
            li.classList.add(
                "completed-task"
            );
        }

        li.innerHTML = `
            <div class="task-row">

            <div>
                <strong>${task.text}</strong>
                <br>
                ${task.priority}
                |
                📅 ${task.date}
            </div>

            <div class="buttons">

            <button
                class="complete"
                onclick="toggleComplete(${task.id})">
                ✓
            </button>

            <button
                class="edit"
                onclick="editTask(${task.id})">
                Edit
            </button>

            <button
                class="delete"
                onclick="deleteTask(${task.id})">
                Delete
            </button>

            </div>

            </div>
        `;

        taskList.appendChild(li);
    });

    updateStats();
}

function addTask(){

    const text =
        taskInput.value.trim();

    if(text === "") return;

    tasks.push({
        id: Date.now(),
        text,
        priority: priority.value,
        date: dueDate.value,
        completed:false
    });

    saveTasks();
    renderTasks();

    taskInput.value="";
    dueDate.value="";
}

function deleteTask(id){

    tasks = tasks.filter(
        task => task.id !== id
    );

    saveTasks();
    renderTasks();
}

function toggleComplete(id){

    const task =
        tasks.find(
            task => task.id === id
        );

    task.completed =
        !task.completed;

    saveTasks();
    renderTasks();
}

function editTask(id){

    const task =
        tasks.find(
            task => task.id === id
        );

    const updated =
        prompt(
            "Edit Task",
            task.text
        );

    if(updated){

        task.text = updated;

        saveTasks();
        renderTasks();
    }
}

search.addEventListener(
    "input",
    () => {

        const value =
            search.value.toLowerCase();

        document
        .querySelectorAll("li")
        .forEach(li=>{

            li.style.display =
                li.innerText
                .toLowerCase()
                .includes(value)
                ? "block"
                : "none";
        });
    }
);

addBtn.addEventListener(
    "click",
    addTask
);

taskInput.addEventListener(
    "keydown",
    e => {

        if(e.key === "Enter"){
            addTask();
        }
    }
);

renderTasks();