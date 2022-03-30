import './style.css';
import {format} from 'date-fns';
import {addTask, todayTask, getTask} from './tasks.js'
import {listTask} from './list'

let currentNav = 'Today';

const formModal = document.querySelector('.modal');
const addTaskBtn = document.querySelector('#addTask');
const addFormButton = document.querySelector('.addButton');
const cancelFormButton = document.querySelector('.cancelButton');

addTaskBtn.addEventListener('click', () => {
    formModal.style.display = 'flex';
});
addFormButton.addEventListener('click', () => {
    formModal.style.display = 'none';
    submitForm();
    listTask(getTask(currentNav));
})
cancelFormButton.addEventListener('click', () => {
    formModal.style.display = 'none';
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

listTask(getTask("Today"));

function submitForm() {
    let taskTitle = document.querySelector('#task-title').value;
    let description = document.querySelector('#description').value;
    let dueDate = document.querySelector('#due-date').value;
    let dueTime = document.querySelector('#due-time').value;
    let priority = document.querySelector('#priority').value;
    let datetime = format(new Date(dueDate + " " + dueTime), 'yyyy-MM-dd HH:MM');
    addTask(taskTitle, description, datetime, priority, false);
}
