import {compareAsc, endOfDay, format, isEqual } from "date-fns";

class task {
    constructor(title, description, duedate, priority, isComplete) {
        this.title = title;
        this.description = description;
        this.duedate = duedate;
        this.priority = priority;
        this.isComplete = isComplete;
    }
}
const todayTask = () => {
    let listArr = [];
    let todayArr = [];
    let getLocalStorage = localStorage.getItem('Todolist Task');
    if (getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
    }
    let today = new Date(format(endOfDay(new Date()), "yyyy-MM-dd"));

    todayArr = listArr.filter((e) => {
        let itemDueDate = new Date(format(new Date(e.duedate), "yyyy-MM-dd"));
        return (compareAsc(today, itemDueDate) == 0);
    })
    return todayArr;
}

const addTask = (title, description, duedate, priority, isComplete) => {
    let newTask = new task(title, description, duedate, priority, isComplete);
    let listArr = [];
    console.log(newTask);
    let getLocalStorage = localStorage.getItem('Todolist Task');
    if (getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(newTask);
    localStorage.setItem('Todolist Task', JSON.stringify(listArr));
}

const saveTask = (taskArr) => {
    localStorage.setItem('Todolist Task', JSON.stringify(taskArr));
}

export {addTask, todayTask, saveTask};