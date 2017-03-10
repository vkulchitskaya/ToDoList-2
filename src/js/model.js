import {Storage,} from "./storage";


export class Task {
    constructor(name,id) {
        this.name = name;
        this.id=id;
    }
}

export class TaskCollection {

    constructor() {
        this.storage = new Storage();
        this.storage.version = 0;
        this.taskCollection = [];
        this.storage.loadCollection(this);
        this.storage.equalVersion();
    }

    addTask(task,flag) {
		// нужна синхронизация с localStorage перед добавлением. Надо брать индекс оттуда
        if (flag) {
            task.id =this.storage.getId();
            this.storage.incVersionLocal();
            this.storage.incVersionGlobal();
        }
        this.taskCollection.push(task);
		// this.storage.addTaskStorage(task);
        this.storage.rewriteCollection(this);
        

    }

    removeTask(id) {
        this.taskCollection = this.taskCollection.filter(function (v) {
            return	v.id !==id;
        });
		// this.storage.removeTaskStorage(id);
        this.storage.rewriteCollection(this);
    }

    editTask(id,newName) {
        this.taskCollection.forEach(function (item) {
            if (item.id===id) {
                item.name=newName;
            }
        });
        this.storage.rewriteCollection(this);
    }

    _getTasks() {
        return this.taskCollection;
    }
}
