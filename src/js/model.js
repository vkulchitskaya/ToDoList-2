import {Storage,} from './storage';

export class Task {
    constructor(name,id,done) {
        this.name = name;
        this.id = id;
        this.done = done;
    }
}

export class TaskCollection {

    constructor() {
        this.taskCollection = [];
    }

    addTask(task) {
        var maxIdTask = 0;
        if (this.taskCollection !== []) {
            this.taskCollection.forEach(function (item) {
                if (item.id>maxIdTask) {
                    maxIdTask=item.id;
                }
            });
            maxIdTask++;
            task.id = maxIdTask;
        }		else {
            task.id =1;
        }
        this.taskCollection.push(task);
    }

    removeTask(id) {
        this.taskCollection = this.taskCollection.filter(function (v) {
            return	v.id !== parseInt(id);
        });
    }

    editTask(id,newName) {
        this.taskCollection.forEach(function (item) {
            if (item.id === parseInt(id)) {
                item.name=newName;
            }
        });
    }

    setTaskDone(id,done) {
        this.taskCollection.forEach(function (item) {
            if (item.id === Number(id)) {
                item.done=done;
            }
        });
    }

    _getTasks() {
        return this.taskCollection;
    }
}
