document.addEventListener('DOMContentLoaded', ()=>{
    const todoInput = document.getElementById('todo-input');
    const addTaskBtn = document.getElementById('add-task-btn')
    const todoList = document.getElementById('to-doItems')

    let tasks = JSON.parse(localStorage.getItem('tasks'))|| []

    tasks.forEach((task) => renderTask(task))

    addTaskBtn.addEventListener('click', ()=>{
        const taskText = todoInput.value.trim()
        if(taskText === "") return;
        const newTask = {
            id : Date.now(),
            text: taskText,
            completed: false
        }
        tasks.push(newTask)
        saveTasks();
        todoInput.value = "";
        console.log(tasks)
    })

    function renderTask(task){
        const listItem = document.createElement('li');
        listItem.setAttribute('data-id', task.id);
        listItem.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <button class="delete-btn">Delete</button>
            <button class="toggle-btn">${task.completed ? 'Undo' : 'Complete'}</button>
        `;
        todoList.append(listItem);
        
        console.log(task)
    }

    function saveTasks(){
        localStorage.setItem(`tasks`, JSON.stringify(tasks))
    }
})