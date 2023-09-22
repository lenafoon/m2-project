//script.js

//PLUS BUTTON
document.addEventListener("DOMContentLoaded", function () {

    const addButton = document.getElementById("add-task-button");
    if (addButton) {
        addButton.addEventListener("click", showTaskSelectionPrompt);
    }
});

const addTaskButton = document.querySelector('.add-btn');
const taskInput = document.querySelector('#task-input');
const tasksContainer = document.querySelector('.tasks');

const categoryTaskCounts = {
    education: 1,
    finances: 1,
    personal: 1,
    home: 1,
    work: 1,
    shopping: 1,
    health: 1,
    challenges: 0,
};

function initializeCategoryTaskCounts() {
    document.querySelectorAll('.category-details').forEach(function (categoryDetail) {
        const categoryName = categoryDetail.querySelector('h1').textContent.trim().toLowerCase();
        const taskCount = categoryDetail.querySelectorAll('.task-wrapper').length;
        categoryTaskCounts[categoryName] = taskCount;
        updateCategoryTaskCount(categoryName);
    });
}
//UPDATE NR OF TASKS IN CATEGORY

function updateCategoryTaskCount(category) {
    const totalTasksSpan = document.querySelector(`.${category} .total-tasks`);
    if (totalTasksSpan) {
        totalTasksSpan.textContent = categoryTaskCounts[category] + ' tasks';
    }
}

function addTaskToCategory(category, taskText) {
    const newTaskElement = document.createElement('div');
    newTaskElement.classList.add('task-wrapper');

    categoryTaskCounts[category]++;
    updateCategoryTaskCount(category);
    updateTotalTaskCount();

}
function deleteTaskFromCategory(category) {
    categoryTaskCounts[category]--;

    updateCategoryTaskCount(category);

}

//UPDATE NR OF TASKS

function updateTotalTaskCount() {
    let totalTasks = 0;

    for (const category in categoryTaskCounts) {
        totalTasks += categoryTaskCounts[category];
    }

    const totalTasksSpan = document.getElementById('total-tasks');

    if (totalTasksSpan) {
        totalTasksSpan.textContent = totalTasks + ' tasks';
    }
}
initializeCategoryTaskCounts();
updateTotalTaskCount();

//EDIT TASK
const editButtons = document.querySelectorAll('.edit img');
editButtons.forEach((editButton) => {
    editButton.addEventListener('click', handleEditTask);
});

function handleEditTask(event) {
    const taskElement = event.target.closest('.task-wrapper');
    const taskTextElement = taskElement.querySelector('.task-text');

    const currentTaskText = taskTextElement.textContent;

    const newTaskText = prompt('Edit task:', currentTaskText);

    if (newTaskText !== null && newTaskText !== currentTaskText) {
        taskTextElement.textContent = newTaskText;
    }
}
