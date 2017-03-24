

export class Task {
    constructor(name, id, done) {
        this.name = name;
        this.id = id;
        this.done = done;
    }
}

export class TaskCollection {

    constructor(tasks = []) {
        this._taskCollection = tasks;
    }

    serialize() {
        return JSON.stringify(this._taskCollection);
    }

    addTask(task) {

        let maxIdTask = 0;
        if (this._taskCollection !== []) {
            this._taskCollection.forEach(function (item) {
                if (item.id>maxIdTask) {
                    maxIdTask=item.id;
                }
            });
            maxIdTask++;
            task.id = maxIdTask;
        }		else {
            task.id =1;
        }
        this._taskCollection.push(task);
    }

    removeTask(id) {
        this._taskCollection = this._taskCollection.filter(function (v) {
            return	v.id !== parseInt(id);
        });
    }

    editTask(id,newName) {
        this._taskCollection.forEach(function (item) {
            if (item.id === parseInt(id)) {
                item.name=newName;
            }
        });
    }

    setTaskDone(id,done) {
        this._taskCollection.forEach(function (item) {
            if (item.id === Number(id)) {
                item.done=done;
            }
        });
    }

    _getTasks() {
        return this._taskCollection;
    }
}
