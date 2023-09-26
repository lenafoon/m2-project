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
    education: 0,
    finances: 0,
    personal: 0,
    home: 0,
    work: 0,
    shopping: 0,
    health: 0,
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


//ANALYTICS

document.addEventListener('DOMContentLoaded', function() {

    initializeCharts();
  });
  
  function initializeCharts() {

    const Chart = require('chart.js');

    const { categories } = require('./categories');

    const { decluttering } = require('/challenges-json/decluttering-challenge');
    
    const categoriesData = categories.map(category => category.name);

    const tasksPerCategory = countTasksPerCategory(categories, decluttering);
    
    createCategoryChart('categoryChart', categoriesData, tasksPerCategory);
    
    const declutteringData = decluttering.map(challenge => challenge.name);

    const completionStatus = decluttering.map(challenge => challenge.completed ? 1 : 0);
    
    createCompletionChart('completionChart', declutteringData, completionStatus);
  }
  

  function countTasksPerCategory(categories, tasks) {

    const tasksPerCategory = new Array(categories.length).fill(0);

    for (const task of tasks) {
      const categoryIndex = categories.findIndex(category => category.id === task.category);

      if (categoryIndex !== -1) {
        tasksPerCategory[categoryIndex]++;
      }
    }
    return tasksPerCategory;
  }
  

  function createCategoryChart(canvasId, labels, data) {

    const ctx = document.getElementById(canvasId).getContext('2d');

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: ['red', 'blue', 'green', 'orange', 'purple', 'pink', 'yellow', 'brown'],
        }],
      },
    });
  }
  

  function createCompletionChart(canvasId, labels, data) {

    const ctx = document.getElementById(canvasId).getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Completion Status',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }],
      },
      
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 1,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });
  }
  