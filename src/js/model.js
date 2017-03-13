import {Storage,TaskOperation,TaskOperationColl} from "./storage";


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
		// если flag true, то генерируем новый ID
        if (flag) {
            task.id = this.storage.getGlobalId();
            this.storage.incVersionLocal();
            this.storage.incVersionGlobal();
            this.storage.addTaskToOperColl('add',task.id);
        }
        this.taskCollection.push(task);
        
        this.storage.rewriteCollection(this);
    }

    removeTask(id) {
        console.log('здесь от view передалось id');
        console.log(id);
        this.taskCollection = this.taskCollection.filter(function (v) {
            return	v.id !=id;
        });
        console.log(this.taskCollection);
        this.storage.incVersionLocal();
        this.storage.incVersionGlobal();
        this.storage.addTaskToOperColl('remove',Number(id));
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
