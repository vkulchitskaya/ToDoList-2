import {Task,} from './model';

export class Controller {
    constructor(view,taskCollection) {
        this.view = view;
        this.taskCollection = taskCollection;
        this.view.bindTaskCreated(this.onTaskCreated.bind(this));
        this.view.bindTaskRemove(this.onTaskRemove.bind(this));
        this.view.bindTaskEdit(this.onTaskEdit.bind(this));

    }

    onTaskCreated(name, callback) {
        var task = new Task(name,0);
        this.taskCollection.addTask(task);
        callback(this.taskCollection);
        this.view.idField.value='';

    }

    onTaskRemove(id, callback) {
        this.taskCollection.removeTask(id);
        callback(this.taskCollection);
    }

    onTaskEdit(name,id, callback) {
        this.taskCollection.editTask(id,name);
        callback(this.taskCollection);
    }

}

