import {Task,} from './model';

export class Controller {
    constructor(view,storage) {
        this.view = view;
        this.storage = storage;

        this.view.bindTaskCreated(this.onTaskCreated.bind(this));
        this.view.bindTaskRemove(this.onTaskRemove.bind(this));
        this.view.bindTaskEdit(this.onTaskEdit.bind(this));
        this.view.bindTaskCheck(this.onTaskCheck.bind(this));
    }

    onTaskCreated(name, callback) {
        this.storage.addTask(new Task(name,0,false));
        callback(this.storage.taskCollection);
    }

    onTaskRemove(id, callback) {
        this.storage.removeTask(id);
        callback(this.storage.taskCollection);
    }

    onTaskEdit(name,id, callback) {
        this.storage.editTask(id,name);
        callback(this.storage.taskCollection);
    }

    onTaskCheck(id,done) {
        this.storage.setTaskDone(id,done);
    }

}

