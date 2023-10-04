//script.js


const addTaskButton = document.querySelector('.add-btn');
const taskInput = document.querySelector('#task-input');
const tasksContainer = document.querySelector('.tasks');
const submitButton = document.querySelector('#task-modal button[type="submit"]');
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

//PLUS BUTTON
document.addEventListener("DOMContentLoaded", function () {

    const addButton = document.getElementById("add-task-button");
    if (addButton) {
        addButton.addEventListener("click", showTaskSelectionPrompt);
    }
});


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

    fetch('/task', {
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

            fetch('/task', {
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
            fetch(`/task/${id}`, {
                method: "DELETE",
            }).then(() => location.reload())

            
        }

        
//VALIDATE FORM
function validateForm(event) {
    const titleInput = document.getElementById('title');
    const titleErrorMessage = document.querySelector('label[for="Title Error Message"]');
    
    if (titleInput.value.trim() === '') {

      titleErrorMessage.textContent = 'Title is required.';
      titleErrorMessage.removeAttribute('hidden');
      event.preventDefault();
    } else {

      titleErrorMessage.setAttribute('hidden', 'true');

      document.getElementById('task-modal').classList.remove('show');
    }
  }
        


//BOOKS

function addBook() {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value; 
    const startedOn = document.querySelector('#startedOn').value;
    const rating = document.querySelector('#rating').value; 
    const readingStatus = document.querySelector('#readingStatus').value; 

    const bookData = {
        title,
        author,
        startedOn,
        rating,
        readingStatus,
    };

    fetch('/books', {
        method: 'POST',
        body: JSON.stringify(bookData),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(() => {
            window.location.reload(); 
        })
        .catch(() => {
            alert('Something went wrong while adding the book.');
        });
}

//DELETE BOOK
function deleteBook(event) {
    const id = event.target.parentNode.attributes.bookid.nodeValue; 
    fetch(`/books/${id}`, {
        method: 'DELETE',
    })
        .then(() => {
            window.location.reload();
        })
        .catch(() => {
            alert('Something went wrong while deleting the book.');
        });
}

//FORM SUBMISSION
submitButton.addEventListener('click', function (event) {
    event.preventDefault(); 

    addBook();
});


//UPDATE BOOK
function updateBook(event) {
    const id = event.target.parentNode.attributes.bookid.nodeValue;
    const title = event.target.parentNode.querySelector('input[type="text"]').value;
    const author = event.target.parentNode.querySelector('input[name="author"]').value; 
    const startedOn = event.target.parentNode.querySelector('input[name="startedOn"]').value; 
    const rating = event.target.parentNode.querySelector('select[name="rating"]').value; 
    const readingStatus = event.target.parentNode.querySelector('select[name="readingStatus"]').value;
    const bookData = {
        title,
        author,
        startedOn,
        rating,
        readingStatus,
    };

    fetch(`/books/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(bookData),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(() => {
            window.location.reload(); 
        })
        .catch(() => {
            alert('Something went wrong while updating the book.');
        });
}

//VALIDATE BOOK
function validateBookForm(event) {
    const titleInput = document.querySelector('#title');
    if (titleInput.value.trim() === '') {
        alert('Title is mandatory.');
        event.preventDefault();
    }
}

submitButton.addEventListener('click', function (event) {
    event.preventDefault(); 
    validateBookForm(event); 
    addBook(); 
});

document.addEventListener('click', function (event) {
    if (event.target && event.target.className === 'x-update') {
        updateBook(event);
    }
});

document.addEventListener('click', function (event) {
    if (event.target && event.target.className === 'x-delete') {
        deleteBook(event);
    }
});
      