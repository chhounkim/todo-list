class Task {
    constructor(title, description, duedate, priority, isComplete) {
        this.title = title;
        this.description = description;
        this.duedate = duedate;
        this.priority = priority;
        this.isComplete = isComplete;
    }
}

const Task = () => {
    const todayTask = () => {
        let getLocalStorage = localStorage.getItem('Todolist Task');
        if (getLocalStorage == null) {
            taskArr = [];
        } else {
            taskArr = JSON.parse(getLocalStorage);
        }
        

    }

    const addTask = (title, description, duedate, priority, isComplete) => {
        let newTask = new Task(title, description, duedate, priority, isComplete);
        
        let getLocalStorage = localStorage.getItem('Todolist Task');
        if (getLocalStorage == null) {
            taskArr = [];
        } else {
            taskArr = JSON.parse(getLocalStorage);
        }
        taskArr.push(newTask);
        localStorage.setItem('Todolist Task', JSON.stringify(taskArr));
    }
}