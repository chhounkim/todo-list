import {compareAsc, endOfDay, format, isEqual } from "date-fns";

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
    if (filter != "Today" && filter != "All"){
        return projectTask(taskArr, filter);
    }
    return taskArr;
}

const getSpecificTask = (index) => {
    let taskArr = [];
    let getLocalStorage = localStorage.getItem('Todolist Task');
    if (getLocalStorage == null) {
        taskArr = [];
    } else {
        taskArr = JSON.parse(getLocalStorage);
    }
    return taskArr[index];
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

const getProjects = () => {
    let projectArr = [];
    let getLocalStorage = localStorage.getItem('Todolist Project');
    if (getLocalStorage == null) {
        projectArr = ['Reminder'];
        localStorage.setItem('Todolist Project', JSON.stringify(projectArr));
    } else {
        projectArr = JSON.parse(getLocalStorage);
    }
    return projectArr;
}

const addProject = (project) => {
    let projectArr = [];
    let getLocalStorage = localStorage.getItem("Todolist Project");
    if (getLocalStorage == null) {
        projectArr = [];
    } else {
        projectArr = JSON.parse(getLocalStorage);
    }
    projectArr.push(project);
    localStorage.setItem("Todolist Project", JSON.stringify(projectArr));
}


export {addTask, saveTask, getTask, getProjects, addProject, getSpecificTask};