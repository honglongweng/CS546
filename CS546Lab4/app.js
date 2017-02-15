const todoItems = require("./todo");

let createdTask = todoItems.createTask("My First Task", "This is the first thing I need to do today");
let allTasks = todoItems.getAllTasks();

createdTask.then((task) => {
    console.log(task);
});

allTasks.then((tasks) => {
    console.log(tasks);
}); 

