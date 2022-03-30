import './style.css';
import {format} from 'date-fns';
import {addTask, todayTask} from './tasks.js'
import {listTask} from './list'

let currentNav = 'Today';

const formModal = document.querySelector('.modal');

const addTaskBtn = document.querySelector('#addTask');
addTaskBtn.addEventListener('click', () => {
    formModal.style.display = 'flex';
});

const addFormButton = document.querySelector('.addButton');
addFormButton.addEventListener('click', () => {
    formModal.style.display = 'none';
    submitForm();
})

const cancelFormButton = document.querySelector('.cancelButton');
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
    })
})

listTask(todayTask());

function submitForm() {
    let taskTitle = document.querySelector('#task-title').value;
    let description = document.querySelector('#description').value;
    let dueDate = document.querySelector('#due-date').value;
    let dueTime = document.querySelector('#due-time').value;
    let priority = document.querySelector('#priority').value;
    let datetime = format(new Date(dueDate + " " + dueTime), 'yyyy-MM-dd HH:MM');
    addTask(taskTitle, description, datetime, priority, false);
}
