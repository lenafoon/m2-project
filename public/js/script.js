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
    initializeTaskEditing();
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

    
        


function initializeTaskEditing() {
    console.log('Initializing task editing...');
        const editButtons = document.querySelectorAll('.edit');

        editButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const taskWrapper = event.target.closest('.task-wrapper');
                const taskTextElement = taskWrapper.querySelector('.task-text');
                const editInput = taskWrapper.querySelector('.edit-input') ;

                if (taskTextElement.style.display === 'none') {
                    taskTextElement.style.display = 'inline';
                    editInput.style.display = 'none';
                } 
                else {
                    taskTextElement.style.display = 'none';
                    editInput.style.display = 'inline';

                    editInput.addEventListener('blur', () => {
                        const taskId = taskWrapper.dataset.taskId;
                        const updatedText = editInput.value;

                        updateTaskText(taskId, updatedText)
                    .then(() => {
                      
                        taskTextElement.textContent = updatedText;
                    })
                    .catch((error) => {
                        console.error('Error updating task text:', error);
                    });
            });
                }
            });
        });
    }

 function updateTotalTasksCount() {
        const totalTasksElement = document.querySelector('.total-tasks');
        const taskElements = document.querySelectorAll('.task-wrapper');

        totalTasksElement.textContent = taskElements.length;
    }
      window.addEventListener('load', updateTotalTasksCount, initializeTaskEditing);





      //books
      document.addEventListener('DOMContentLoaded', function () {
        apiKey = 'b5f76033c4f3efe676c3ece7202def13c70f907c';

    const apiUrl = 'https://www.googleapis.com/books/v1/volumes';
    
    const searchForm = document.querySelector('#searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const readingList = document.getElementById('readingList');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value;
        searchBooks(searchTerm);
    });

    function searchBooks(query) {
        fetch(`${apiUrl}?q=${query}&key=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                displaySearchResults(data.items);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    function displaySearchResults(books) {
        searchResults.innerHTML = '';
        books.forEach((book) => {
            const bookInfo = book.volumeInfo;
            const bookTitle = bookInfo.title;
            const bookAuthors = bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown';
            const bookThumbnail = bookInfo.imageLinks?.thumbnail || 'No Image';

            const resultItem = document.createElement('div');
            resultItem.classList.add('book-result');
            resultItem.innerHTML = `
                <img src="${bookThumbnail}" alt="${bookTitle}">
                <h3>${bookTitle}</h3>
                <p>Author(s): ${bookAuthors}</p>
                <button onclick="addToReadingList('${bookTitle}', '${bookAuthors}')">Add to Reading List</button>
            `;

            searchResults.appendChild(resultItem);
        });
    }

    function addToReadingList(title, authors) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${title}</strong> by ${authors}
            <button onclick="removeFromReadingList(this)">Remove</button>
        `;

        readingList.appendChild(listItem);
    }

    function removeFromReadingList(button) {
        button.parentElement.remove();
    }

    });