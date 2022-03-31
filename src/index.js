import './style.css';
import {format} from 'date-fns';
import {addTask, getTask, getSpecificTask, updateTask} from './tasks.js';
import {getProjects, addProject} from './project';
import {formProjectList, listProject, listTask} from './list'


let currentNav = 'Today';
let editMode = false;
let currentlyEdited = 0;

listTask(getTask("Today"));
listProject(getProjects());

const formModal = document.querySelector('.modal');
const projectModal = document.querySelector('.project-modal');
const newTaskButton = document.querySelector('#addTask');
const newProjectButton = document.querySelector('#addProject');
const addFormButton = document.querySelector('.addButton');
const cancelFormButton = document.querySelector('.cancelButton');

const addProjectButton = document.querySelector('.addProjectButton');
const cancelProjectButton = document.querySelector('.cancelProjectButton');

// Task Form
newTaskButton.addEventListener('click', () => {
    addFormButton.textContent = 'Add';
    editMode = false;
    formModal.style.display = 'flex';
    clearFormInput();
    formProjectList(getProjects());
    sidebarSwitching();
});

addFormButton.addEventListener('click', () => {
    formModal.style.display = 'none';
    if (editMode) {
        submitTaskForm(currentlyEdited);
    } else {
        submitTaskForm();
    }
    listTask(getTask(currentNav));
})
cancelFormButton.addEventListener('click', () => {
    formModal.style.display = 'none';
});

// Project Form
newProjectButton.addEventListener('click', () => {
    projectModal.style.display = 'flex';
})

addProjectButton.addEventListener('click', () => {
    projectModal.style.display = 'none';
    submitProjectForm();
    listProject(getProjects());
    listTask(getTask(currentNav));
    document.querySelector('#project-name').value = "";
    location.reload();
})
cancelProjectButton.addEventListener('click', () => {
    projectModal.style.display = 'none';
    document.querySelector('#project-name').value = "";
});

// Sidebar
const sidebarLink = document.querySelectorAll('.task-filter');
sidebarLink.forEach((link) => {
    link.addEventListener('click', (e) => {
        sidebarLink.forEach((innerLink) => {
            innerLink.classList.remove('active');
        })
        link.classList.add('active');
        currentNav = e.target.textContent;
        activeNav = link;
        listTask(getTask(currentNav));
    })
})

function setCurrentNav(input) {
    currentNav = input;
}

// Function for Edit button event
function editButtonPressed(index) {
    editMode = true;
    currentlyEdited = index;
    editForm(getSpecificTask(index, index));
}

// Fill form when task is edited
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

// Add Task or Update Task
function submitTaskForm(index) {
    let taskTitle = document.querySelector('#task-title').value;
    let description = document.querySelector('#description').value;
    let dueDate = document.querySelector('#due-date').value;
    let dueTime = document.querySelector('#due-time').value;
    let project = document.querySelector('#project').value;
    let priority = document.querySelector('#priority').value;
    let datetime = format(new Date(dueDate + " " + dueTime), 'yyyy-MM-dd HH:MM');
    if (editMode) {
        updateTask(taskTitle, description, datetime, project, priority, false, index);
    } else {
        addTask(taskTitle, description, datetime, project, priority, false);
    }
    clearFormInput();
    editMode = false;
}

// Clear form after form submission
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

export {editButtonPressed, setCurrentNav};