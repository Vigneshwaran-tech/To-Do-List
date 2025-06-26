let taskList = [];

function loadTasks() {
    const saved = localStorage.getItem("tasks");
    if(saved) {
        taskList = JSON.parse(saved);
        renderTasks();
    }
}

function saveTasks() {
    localStorage.setItem("tasks",JSON.stringify(taskList));
}

function addTask(){
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if(taskText !==""){
        taskList.push({text: taskText,done:false});
        saveTasks();
        renderTasks();
        input.value="";
    }
}

function toggleDone(index) {
    taskList[index].done = !taskList[index].done;
    saveTasks();
    renderTasks();
}

function deleteTask(index){
    taskList.splice(index,1);
    saveTasks();
    renderTasks();
}

function renderTasks(){
    const ul = document.getElementById("taskList");
    ul.innerHTML = "";

    taskList.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.done ? "done" : "";
        li.innerHTML = `
            <span onclick="toggleDone(${index})">${task.done ? "✅" : "⭕"} ${task.text}</span>
            <i class="fas fa-trash" onclick="deleteTask(${index})"></i>
        `;
        ul.appendChild(li);
    });
}


window.onload = loadTasks;