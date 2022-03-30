import { saveTask } from "./tasks";

let todolist = document.querySelector('.list');

const listTask = (listArr) => {
    while (todolist.firstChild) {
        todolist.removeChild(todolist.firstChild);
    }

    listArr.forEach((item, index) => {
        let listItem = document.createElement('li');
        listItem.classList.add('list-item');
    
        let leftSide = document.createElement('div');
        leftSide.classList.add('left-item');
    
        let rightSide = document.createElement('div');
        rightSide.classList.add('right-item');

        let checkbox = document.createElement('input');
        checkbox.value = index;
        checkbox.type = 'checkbox';
        checkbox.checked = item.isComplete;
        checkbox.addEventListener('change', () => {
            listArr[index].isComplete = !listArr[index].isComplete;
            saveTask(listArr);
            listTask(listArr);
        })

        let taskTitle = document.createElement('span');
        taskTitle.textContent = item.title;

        if (item.isComplete) {
            taskTitle.classList.add('taskComplete');
        } else {
            taskTitle.classList.remove('taskComplete');
        }

        let editButton = document.createElement('a');
        editButton.href = '#';
        editButton.innerHTML = '<i class="fa-solid fa-edit"></i>';

        let trashButton = document.createElement('a');
        trashButton.href = '#';
        trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        trashButton.addEventListener('click', () => {
            listArr.splice(index, 1);
            saveTask(listArr);
            listTask(listArr);
        })

        let priority = item.priority.toLowerCase() + "-priority";
        listItem.classList.add(priority);

        leftSide.appendChild(checkbox);
        leftSide.appendChild(taskTitle);
        rightSide.appendChild(editButton);
        rightSide.appendChild(trashButton);

        listItem.appendChild(leftSide);
        listItem.appendChild(rightSide);

        todolist.appendChild(listItem);
    })
    
}

export {listTask};