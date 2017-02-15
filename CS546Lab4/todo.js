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

    },

    removeTask(id) {

    }
}

module.exports = exportedMethods;