const mongoCollections = require("./mongoCollections");
const todoItems = mongoCollections.todoItems;
const uuidV4 = require('uuid/v4');


let exportedMethods = {
    getTask(id) {
        if (!id) 
            return Promise.reject("You must provide an id to search for");
        
        return todoItems().then((todoCollection) => {
            return todoCollection.findOne({_id: id});
        });
    },


    createTask(title, description) {
        if (!title)
            return Promise.reject("You must provide a title for your task.");


        return todoItems().then((todoCollection) => {
            let todoItem = {
                _id: uuidV4(),
                title: title,
                description: description,
                complete: false,
                completedAt: null
            };


            return todoCollection
                .insertOne(todoItem)
                .then((newInsertInformation) => {
                    return newInsertInformation.insertedId;
                })
                .then((newId) => {
                    return this.getTask(newId);
                });
        });
    },

    getAllTasks() {
        return todoItems().then((todoCollections) => {
            return todoCollections.find().toArray();
        });
    },

    completeTask(taskId) {
        if (!taskId) 
            return Promise.reject("You must provide an id to complete");
        
        return todoItems().then((todoCollection) => {
            let date = Date();
            return todoCollection.update(
                { _id: taskId },
                { $set: 
                    {
                        complete: true,
                        completedAt: date
                    }
                }
            );
        });
    },

    removeTask(id) {
        if (!id) 
            return Promise.reject("You must provide an id to search for");
        
        return todoItems().then((todoCollection) => {
            return todoCollection
                .removeOne({_id: id})
                .then((deletionInfo) => {
                    if (deletionInfo.deletedCount === 0) {
                        return Promise.reject(`Could not delete task with id of ${id}`);
                    }
                });
        });
    }
}

module.exports = exportedMethods;