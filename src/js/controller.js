import {Task,} from './model';

export class Controller {
    constructor(view,storage) {
        this.view = view;
        this.storage = storage;

        // TODO: remove in the future: controller don't know about TaskCollection
        this.taskCollection = storage._getTaskCollection();

        this.view.bindTaskCreated(this.onTaskCreated.bind(this));
        this.view.bindTaskRemove(this.onTaskRemove.bind(this));
        this.view.bindTaskEdit(this.onTaskEdit.bind(this));
        this.view.bindTaskCheck(this.onTaskCheck.bind(this));
    }

    onTaskCreated(name, callback) {
        var task = new Task(name,0,false);
        this.storage.addTask(task);
        callback(this.storage.taskCollection);
    }

    onTaskRemove(id, callback) {
        this.taskCollection.removeTask(id);
        callback(this.taskCollection);
    }

    onTaskEdit(name,id, callback) {
        this.taskCollection.editTask(id,name);
        callback(this.taskCollection);
    }

    onTaskCheck(id,done) {
        this.taskCollection.setTaskDone(id,done);
    }

}

