import './style.css';

const addTaskBtn = document.querySelector('#addTask');
addTaskBtn.addEventListener('click', () => {
    document.querySelector('.modal').style.display = "flex";
});

const formButtons = document.querySelectorAll('.form-buttons');
formButtons.forEach(formButton, () => {
    formButton.addEventListener('click', () => {
        document.querySelector('.modal').style.display = "none";
    })
})