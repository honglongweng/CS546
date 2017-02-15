const todoItems = require("./todo");

//let createdTask = todoItems.createTask("My First Task", "This is the first thing I need to do today");
let allTasks = todoItems.getAllTasks();
//let removeTask = todoItems.removeTask("cdf66e53-883c-47f9-afe8-6b6c699cf2b6");
let completeTask = todoItems.completeTask("41316e49-c696-4582-8664-bef7a4342d29");
/*createdTask.then((task) => {
    console.log(task);
});*/

// let tryToGetTask = removeTask.then(() => {
//     return todoItems.getTask("cdf66e53-883c-47f9-afe8-6b6c699cf2b6");
// });

// tryToGetTask.catch((error) => {
//     // Should error out
//     console.error(error);
// });

completeTask.then((task) => { 
   console.log(task);
});

/*
removeTask.then((task) => {
    console.log(task);
}); */
allTasks.then((task) => {
    console.log(task);
}); 