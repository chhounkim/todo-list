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

export {getProjects, addProject};