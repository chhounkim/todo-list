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

const getTask = (filter) => {
    let taskArr = [];
    let getLocalStorage = localStorage.getItem('Todolist Task');
    if (getLocalStorage == null) {
        taskArr = [];
    } else {
        taskArr = JSON.parse(getLocalStorage);
    }

    if (filter === "Today") {
        return todayTask(taskArr);
    }
    if (filter === "All") {
        return taskArr;
    }

    return taskArr;
}

const todayTask = (taskArr) => {
    let today = new Date(format(endOfDay(new Date()), "yyyy-MM-dd"));

    return taskArr.filter((e) => {
        let itemDueDate = new Date(format(new Date(e.duedate), "yyyy-MM-dd"));
        return (compareAsc(today, itemDueDate) == 0);
    })
}




export {addTask, saveTask, getTask};