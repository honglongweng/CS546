/*
 * Matt Telker
 * CS 546
 * Lab 4
 */

const todoItems = require("./todo");
let FirstID, SecondID;

todoItems.createTask("Ponder Dinosaurs", "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?")
        .then((task) => {
            FirstID = task._id;
            console.log(task);

            return todoItems.createTask("Play Pokemon with Twitch TV", "Should we revive helix?");
        })
        .then((task) => {
            SecondID = task._id;

            return todoItems.getAllTasks();
        })
        .then((taskArray) => {
            console.log(taskArray);

            return todoItems.removeTask(FirstID);
        })
        .then(() => {
            
            return todoItems.getAllTasks();
        })
        .then((taskArray) => {
            console.log(taskArray);

            return todoItems.completeTask(SecondID);
        })
        .then((id) => {

            return todoItems.getTask(SecondID);
        })
        .then((id) => {
            console.log(id);

            return todoItems.clearTasks();
        })
        .then((count) => {
            console.log("This should be 1, signifying the one remaining task: " + count);
        });


// let createdTask = todoItems.createTask("Ponder Dinosaurs", "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?");
// let secondTask = todoItems.createTask("Play Pokemon with Twitch TV", "Should we revive helix?");
// let allTasks = todoItems.getAllTasks();
// let completeTask = todoItems.completeTask("41316e49-c696-4582-8664-bef7a4342d29");
// let getTask = todoItems.getTask("41316e49-c696-4582-8664-bef7a4342d29");

// createdTask.then((task) => {
//     let FirstID = task._id;
//     console.log(task);
// }).then(function() {
//     return secondTask
// })

// secondTask.then((task) => {
//     let SecondID = task._id;
// });

// allTasks.then((task) => {
//     console.log(task);
// }); 

// let removeTask = todoItems.removeTask(FirstID);

// removeTask.then(() => {
//     console.log("Removed task with id" + FirstID);
// });
// let tryToGetTask = removeTask.then(() => {
//     return todoItems.getTask("cdf66e53-883c-47f9-afe8-6b6c699cf2b6");
// });

// tryToGetTask.catch((error) => {
//     // Should error out
//     console.error(error);
// });



// getTask.then((task) => {
//     console.log("get task below");
//     console.log(task);
// });

// completeTask.then((task) => { 
//     console.log("completed task below");
//    console.log(task);
// });

/*
removeTask.then((task) => {
    console.log(task);
}); */


// todoItems.clearTasks().then((count) => {
//     console.log(count);
// });