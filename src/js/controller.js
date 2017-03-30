import {Task,TaskCollection,} from './model';

export class Controller {
    constructor(view,storage) {
        this.view = view;
        this.storage = storage;

        this.view.bindTaskCreated(this.onTaskCreated.bind(this));
        this.view.bindTaskRemove(this.onTaskRemove.bind(this));
        this.view.bindTaskEdit(this.onTaskEdit.bind(this));
        this.view.bindTaskCheck(this.onTaskCheck.bind(this));
        this.view.bindTaskFilter(this.onTaskFilter.bind(this));
    }

    onTaskCreated(name) {
        this.storage.addTask(new Task(name,0,false));
        this.view.display(this.storage.taskCollection);
    }

    onTaskRemove(id) {
        this.storage.removeTask(id);
        this.view.display(this.storage.taskCollection);
    }

    onTaskEdit(name,id) {
        this.storage.editTask(id,name);
        this.view.display(this.storage.taskCollection);
    }

    onTaskCheck(id,done) {
        this.storage.setTaskDone(id,done);
    }

    onTaskFilter(check) {
        let tasksDone = this.storage.getTaskDone();
        if (check & tasksDone !== []) {
            this.view.display(new TaskCollection(tasksDone));
        } else {
            this.view.display(this.storage.taskCollection);
        }
    }

}

