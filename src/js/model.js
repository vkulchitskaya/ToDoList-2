

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

    _nextId() {
        return this._taskCollection.reduce((prev, cur) => {
            return (prev.id > cur.id) ? prev : cur;
        }, new Task('', 0, false)).id + 1;
    }

    serialize() {
        return JSON.stringify(this._taskCollection);
    }

    addTask(task) {
        task.id = this._nextId();
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
