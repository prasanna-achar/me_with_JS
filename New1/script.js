document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const todoList = document.getElementById('to-doItems');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render tasks from localStorage on page load
    tasks.forEach(task => renderTask(task));

    // Add new task
    addTaskBtn.addEventListener('click', () => {
        const taskText = todoInput.value.trim();
        if (taskText === "") return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(newTask);
        saveTasks();
        renderTask(newTask);
        todoInput.value = "";
    });

    // Render a task
    function renderTask(task) {
        const listItem = document.createElement('li');
        listItem.setAttribute('data-id', task.id);
        listItem.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <div>
                <button class="delete-btn">Delete</button>
                <button class="toggle-btn">${task.completed ? 'Undo' : 'Complete'}</button>
            </div>
        `;
        todoList.appendChild(listItem);
    }

    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Handle delete and toggle actions using event delegation
    todoList.addEventListener('click', (e) => {
        const parentLi = e.target.closest('li');
        const taskId = parseInt(parentLi.getAttribute('data-id'));

        if (e.target.classList.contains('delete-btn')) {
            tasks = tasks.filter(task => task.id !== taskId);
            saveTasks();
            parentLi.remove();
        } else if (e.target.classList.contains('toggle-btn')) {
            const task = tasks.find(task => task.id === taskId);
            task.completed = !task.completed;
            saveTasks();
            parentLi.querySelector('span').classList.toggle('completed');
            e.target.textContent = task.completed ? 'Undo' : 'Complete';
        }
    });
});
