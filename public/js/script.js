//script.js

//PLUS BUTTON
document.addEventListener("DOMContentLoaded", function () {

    const addButton = document.getElementById("add-task-button");
    if (addButton) {
        addButton.addEventListener("click", showTaskSelectionPrompt);
    }
});

const submitButton = document.querySelector('#task-modal button[type="submit"]');

submitButton.addEventListener('click', function (event) {
    event.preventDefault(); 

    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const dueDate = document.querySelector('#due-date').value;
    const priority = document.querySelector('#priority').value;
    const category = document.querySelector('#category').value;
    const taskData = {
        title,
        description,
        dueDate,
        priority,
        category,
    };

    fetch('http://localhost:3000/task', {
        method: 'POST',
        body: JSON.stringify(taskData),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(() => {
            window.location.reload(); 
        })
        .catch(() => {
            alert('Something went wrong :-(');
        });
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

function createTask() {
            const taskEl = document.querySelector('#task-input')
            const task = taskEl.value

            const payload = {
                title: task,
                description: task,
                dueDate: new Date(),
                priority: "medium",
                category: "{{metadata.name}}"
            }

            fetch('http://localhost:3000/task', {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                window.location.reload()
            }).catch(() => {
                alert("Something went wrong :-(")
            })
        }


function deleteTask(event) {
            const id = event.target.parentNode.attributes.taskid.nodeValue
            fetch(`http://localhost:3000/task/${id}`, {
                method: "DELETE",
            }).then(() => location.reload())

            
        }


const taskCheckboxes = document.querySelectorAll('.task-wrapper input[type="checkbox"]');

taskCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', handleTaskCheckboxClick);
});


