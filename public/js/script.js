//PLUS BUTTON
document.addEventListener("DOMContentLoaded", function () {

    const addButton = document.getElementById("add-task-button");
    if (addButton) {
        addButton.addEventListener("click", showTaskSelectionPrompt);
    }
});

const taskInput = document.querySelector('#task-input');




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
    updateTotalTaskCount();
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


//ADD NEW TASK

const addTask = () => {
    const newTaskText = taskInput.value;

    if (newTaskText.trim() !== '') {

        const newTaskElement = document.createElement('div');
        newTaskElement.classList.add('task-wrapper');

        const newTaskLabel = document.createElement('label');
        newTaskLabel.classList.add('task');

        const newTaskCheckbox = document.createElement('input');
        newTaskCheckbox.setAttribute('type', 'checkbox');
        newTaskCheckbox.setAttribute('name', '');
        newTaskCheckbox.setAttribute('id', 'task');

        const newTaskCheckboxSpan = document.createElement('span');
        newTaskCheckboxSpan.classList.add('checkbox');

        const newTaskCheckboxImg = document.createElement('img');
        newTaskCheckboxImg.setAttribute('src', '/images/icons8-check-64.png');
        newTaskCheckboxImg.setAttribute('alt', '');

        newTaskCheckboxSpan.appendChild(newTaskCheckboxImg);
        newTaskLabel.appendChild(newTaskCheckbox);
        newTaskLabel.appendChild(newTaskCheckboxSpan);

        const deleteButton = document.createElement('div');
        deleteButton.classList.add('delete');
        const deleteIcon = document.createElement('img');
        deleteIcon.setAttribute('src', '/images/icons8-trash-64.png');
        deleteIcon.setAttribute('alt', 'Delete');
        deleteButton.appendChild(deleteIcon);

        const newTaskTextElement = document.createElement('p');
        newTaskTextElement.classList.add('task-text');
        newTaskTextElement.textContent = newTaskText;

        newTaskElement.appendChild(newTaskLabel);
        newTaskElement.appendChild(newTaskTextElement);
        newTaskElement.appendChild(deleteButton);

        tasksContainer.appendChild(newTaskElement);

        taskInput.value = '';

        newTaskCheckbox.addEventListener('change', function () {
            if (this.checked) {
                newTaskTextElement.style.textDecoration = 'line-through';
            } else {
                newTaskTextElement.style.textDecoration = 'none';
            }
        });
        updateTaskCount();

    }

}

// tasksContainer.addEventListener('click', function (event) {
//     const deleteButton = event.target.closest('.delete');
//     if (deleteButton) {
//         const taskElement = deleteButton.parentElement;
//         tasksContainer.removeChild(taskElement);

//         updateTaskCount();
//     }
// });




//DELETE TASK


const tasksContainer = document.querySelectorAll('.tasks')

tasksContainer.forEach(taskContainer => {

    taskContainer.addEventListener('click', function (event) {
        const deleteButton = event.target.closest('.delete');
        if (deleteButton) {

            const taskId = taskContainer.getAttribute('task-id')

            fetch(`/task/${taskId}`, {
                method: "DELETE"
            }).then(response => {
                if (response.status == 200)
                {

                    taskContainer.parentElement.removeChild(taskContainer)

                }
                else {
                    throw new Error(`Something went wrong.`)
                }
            })



        }
    });
})

const checkTask = () => {



}
