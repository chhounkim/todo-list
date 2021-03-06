import {compareAsc, endOfDay, format} from "date-fns";
import _ from "lodash";

class task {
    constructor(title, description, duedate, project, priority, isComplete) {
        this.title = title;
        this.description = description;
        this.duedate = duedate;
        this.project = project;
        this.priority = priority;
        this.isComplete = isComplete;
    }
}

const addTask = (title, description, duedate, project, priority, isComplete) => {
    let newTask = new task(title, description, duedate, project, priority, isComplete);
    let taskArr = [];
    let getLocalStorage = localStorage.getItem('Todolist Task');
    if (getLocalStorage == null) {
        taskArr = [];
    } else {
        taskArr = JSON.parse(getLocalStorage);
    }
    taskArr.push(newTask);
    saveTask(taskArr);
}

const saveTask = (taskArr) => {
    localStorage.setItem('Todolist Task', JSON.stringify(taskArr));
}

const updateTask = (title, description, duedate, project, priority, isComplete, oldItem) => {
    let currentTask = new task(title, description, duedate, project, priority, isComplete);
    let taskArr = [];
    let getLocalStorage = localStorage.getItem('Todolist Task');
    if (getLocalStorage == null) {
        taskArr = [];
    } else {
        taskArr = JSON.parse(getLocalStorage);
    }
    let index = getTaskIndex(oldItem);
    taskArr.splice(index, 1, currentTask);
    saveTask(taskArr);
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
    if (filter != "Today" && filter != "All"){
        return projectTask(taskArr, filter);
    }
    return taskArr;
}

const getTaskIndex = (oldItem) => {
    let taskArr = [];
    let getLocalStorage = localStorage.getItem('Todolist Task');
    if (getLocalStorage == null) {
        taskArr = [];
    } else {
        taskArr = JSON.parse(getLocalStorage);
    }
    let sIndex;
    taskArr.forEach((task, index) => {
        if (_.isEqual(oldItem, task)) {
            sIndex = index;
            return sIndex;
        }
    })
    return sIndex;
}


const todayTask = (taskArr) => {
    let today = new Date(format(endOfDay(new Date()), "yyyy-MM-dd"));

    return taskArr.filter((e) => {
        let itemDueDate = new Date(format(new Date(e.duedate), "yyyy-MM-dd"));
        return (compareAsc(today, itemDueDate) == 0);
    })
}

const projectTask = (taskArr, projectName) => {
    return taskArr.filter((e) => {
        return e.project === projectName;
    })
}


export {addTask, saveTask, getTask, updateTask};