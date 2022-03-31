import './style.css';
import {endOfDay, format} from 'date-fns';
import {addTask, getTask, addProject, getProjects, getSpecificTask} from './tasks.js'
import {formProjectList, listProject, listTask} from './list'

let currentNav = 'Today';
let editMode = false;
listTask(getTask("Today"));
listProject(getProjects());

let datepicker1 = document.querySelector('#due-date');
let timepicker1 = document.querySelector('#due-time');
let dateToday = format(endOfDay(new Date()), "yyyy-MM-dd");
let timeToday = format(endOfDay(new Date()), "HH:mm");
datepicker1.value = dateToday;
timepicker1.value = timeToday;
console.log(dateToday);



const formModal = document.querySelector('.modal');
const projectModal = document.querySelector('.project-modal');
const newTaskButton = document.querySelector('#addTask');
const newProjectButton = document.querySelector('#addProject');
const addFormButton = document.querySelector('.addButton');
const cancelFormButton = document.querySelector('.cancelButton');

const addProjectButton = document.querySelector('.addProjectButton');
const cancelProjectButton = document.querySelector('.cancelProjectButton');

newTaskButton.addEventListener('click', () => {
    formModal.style.display = 'flex';
    formProjectList(getProjects());
});

newProjectButton.addEventListener('click', () => {
    projectModal.style.display = 'flex';
})

addFormButton.addEventListener('click', () => {
    formModal.style.display = 'none';
    submitTaskForm();
    listTask(getTask(currentNav));
})
cancelFormButton.addEventListener('click', () => {
    formModal.style.display = 'none';
});

addProjectButton.addEventListener('click', () => {
    projectModal.style.display = 'none';
    submitProjectForm();
    listProject(getProjects());
})
cancelProjectButton.addEventListener('click', () => {
    projectModal.style.display = 'none';
});

const sidebarLink = document.querySelectorAll('.task-filter');
sidebarLink.forEach((link) => {
    link.addEventListener('click', (e) => {
        sidebarLink.forEach((innerLink) => {
            innerLink.classList.remove('active');
        })
        link.classList.add('active');
        currentNav = e.target.textContent;
        listTask(getTask(currentNav));
    })
})

const editTaskButtons = document.querySelectorAll('.edit-task');
editTaskButtons.forEach((editBtn) => {
    editBtn.addEventListener('click', (e) => {
        
    })
})

function editButtonPressed(index) {
    editMode = true;
    editForm(getSpecificTask(index));
}


function editForm(task) {
    if (editMode) {
        addFormButton.textContent = 'Update';
        formProjectList(getProjects());
        let dueDate = format(new Date(task.duedate), 'yyyy-MM-dd');
        let dueTime = format(new Date(task.duedate), 'HH:MM');
        document.querySelector('#task-title').value = task.title;
        document.querySelector('#description').value = task.description;
        document.querySelector('#due-date').value = dueDate;
        document.querySelector('#due-time').value = dueTime;
        document.querySelector('#project').value = task.project;
        document.querySelector('#priority').value = task.priority;
        formModal.style.display = 'flex';
    }
}

function submitTaskForm() {
    let taskTitle = document.querySelector('#task-title').value;
    let description = document.querySelector('#description').value;
    let dueDate = document.querySelector('#due-date').value;
    let dueTime = document.querySelector('#due-time').value;
    let project = document.querySelector('#project').value;
    let priority = document.querySelector('#priority').value;
    let datetime = format(new Date(dueDate + " " + dueTime), 'yyyy-MM-dd HH:MM');
    if (editMode) {

    } else {
        addTask(taskTitle, description, datetime, project, priority, false);
    }
    clearFormInput();
}

function clearFormInput() {
    document.querySelector('#task-title').value = "";
    document.querySelector('#description').value = "";
    document.querySelector('#due-date').value = "";
    document.querySelector('#due-time').value = "";
    document.querySelector('#project').value = "";
    document.querySelector('#priority').value = "";
}

function submitProjectForm() {
    let projectName = document.querySelector('#project-name').value;
    addProject(projectName);
}

export {editButtonPressed};