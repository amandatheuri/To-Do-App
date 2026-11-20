const inputBox = document.getElementById("input-box");
const listBox = document.getElementById("container");

function addTask() {
    if (inputBox.value.trim() === "") {
        alert("You must write something!");
        return;
    }

    const li = document.createElement("li");

    // 1. Wrap the task text 
    const taskSpan = document.createElement("span");
    taskSpan.className = "task-text";
    taskSpan.textContent = inputBox.value.trim();

    // 2. Create the Edit button
    const editBtn = document.createElement("span");
    editBtn.className = "edit-btn";
    editBtn.innerHTML = "&#9998;"; 

    // 3. Create the Delete button
    const deleteBtn = document.createElement("span");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = "\u00d7"; 

    li.appendChild(taskSpan);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    listBox.appendChild(li);

    inputBox.value = "";
    saveData();
}

// Listen for Check, Edit, and Delete clicks
listBox.addEventListener("click", function(e) {
    // Toggle marked state when clicking the row or task text
    if (e.target.tagName === "LI" || e.target.classList.contains("task-text")) {
        const li = e.target.closest("li");
        // Don't cross out while typing
        if (li.querySelector(".task-text").isContentEditable) return; 
        li.classList.toggle("marked");
        saveData();
    } 
    // Edit task when clicking the button
    else if (e.target.classList.contains("edit-btn")) {
        const li = e.target.parentElement;
        const taskSpan = li.querySelector(".task-text");

        taskSpan.contentEditable = true;
        taskSpan.focus();

        // Save when pressing Enter
        taskSpan.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                taskSpan.contentEditable = false;
                saveData();
            }
        });

        // Save when clicking away
        taskSpan.addEventListener("blur", function() {
            taskSpan.contentEditable = false;
            saveData();
        }, { once: true });
    } 
    // Delete task when clicking the x button
    else if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();
        saveData();
    }
});

function saveData() {
    localStorage.setItem("data", listBox.innerHTML);
}

function showTask() {
    listBox.innerHTML = localStorage.getItem("data") || "";
}
showTask();

inputBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});