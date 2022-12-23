let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const submitForm = document.getElementById('add-new-task');
const tasksCounter = document.getElementById('tasks-counter');

function addTaskToDom(task){
    const li = document.createElement('li');
        li.innerHTML= `
            <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
            <label for="${task.id}">${task.text}</label>
            <img src="bin.svg" class="delete" data-id="${task.id}" />
    `;

    tasksList.append(li);
}

function renderList () {
   tasksList.innerHTML='';
    for(let i=0; i<tasks.length; i++)
    {
        addTaskToDom(tasks[i]);
    }

    tasksCounter.innerHTML= tasks.length;
}

// function to toggle task
function toggleTask(taskId) {
    const task=tasks.filter(function(task){
        return task.id == taskId
    })

        if(task.length > 0){
        const currentTask= task[0];

        currentTask.done = !currentTask.done;
        renderList();
        showNotification('Task toggled successfully');
        return;
    }

    showNotification('Could not toggle the task');
}

// function to delete task
function deleteTask(taskId) {
        const newTasks=tasks.filter(function(task){
            return task.id !== taskId
        });

    tasks=newTasks;
    renderList();
    showNotification('Task deleted successfully');
}

// function to add task 
function addTask(task) {
    if(task){
        tasks.push(task);
        renderList();
        showNotification('Task added successfully');
        return;
    } 
}

// Function to show notification
function showNotification(text) {
    alert(text);
}

// To collect the input given by user
function handleInputKeypress(e){
    const submitValue = addTaskInput.value;
  
    if(submitValue == ''){
        showNotification('Task text cannot be empty');
        return;
    }
    else if(submitValue){
        const text = submitValue;
      
        const task={
            text,
            id: Date.now().toString(),
            done: false
        }
        addTaskInput.value='';
        addTask(task);
    }
    
}

function handleClickListener(e){
    const target = e.target;
    
    if(target.className == 'delete'){
        const taskId=target.dataset.id;
        deleteTask(taskId);
        return;
    }else if(target.className == 'custom-checkbox'){
        const taskId=target.id;
        toggleTask(taskId);
        return;
    }
}

function initializeApp(){
    submitForm.addEventListener('click',handleInputKeypress);
    document.addEventListener('click',handleClickListener);
}

initializeApp();
