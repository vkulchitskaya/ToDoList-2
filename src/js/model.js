import {Storage,TaskOperation,TaskOperationColl,} from './storage';


export class Task {
    constructor(name,id) {
        this.name = name;
        this.id=id;
    }
}

export class TaskCollection {

    constructor() {
        this.taskCollection = [];
        this.storage = new Storage();
        this.storage.version = 0;
        this.storage.loadCollection(this);
        this.storage.equalVersion();
        this.storage.showOperColl();
        // здесь сравниваем код каждую секунду
        var timerId = setInterval(function () {
            console.log('проверка версий (сихронизация в случае отличий)');
        }, 1000);
    }

    addTask(task,flag) {
		// если flag true, то генерируем новый ID
        if (flag) {
            task.id = this.storage.getGlobalId();
            this.storage.incVersionLocal();
            this.storage.incVersionGlobal();
            this.storage.addTaskToOperColl('add',task.id,task.name);
        }
        this.taskCollection.push(task);
        // this.storage.rewriteCollection(this);  // функция пересобирания модели????
        // по-хорошему, надо пересобирать каждую секунду, а не после выполнения операции
        // а еще лучше пересобирать, только когда глобальная версия оказывается больше локальной, но
        // проверять эти версии каждую секунду
    }

    removeTask(id) {
        console.log('здесь от view передалось id');
        console.log(id);
        this.taskCollection = this.taskCollection.filter(function (v) {
            return	v.id !=id;
        });
        this.storage.incVersionLocal();
        this.storage.incVersionGlobal();
        this.storage.addTaskToOperColl('remove',Number(id),'');
        // this.storage.rewriteCollection(this); скоро удалю
    }

    editTask(id,newName) {
        this.taskCollection.forEach(function (item) {
            if (item.id==id) {
                item.name=newName;

            }
        });
        this.storage.incVersionLocal();
        this.storage.incVersionGlobal();
        this.storage.addTaskToOperColl('edit',Number(id),newName);
        // this.storage.rewriteCollection(this); скоро удалю
    }

    _getTasks() {
        return this.taskCollection;
    }
}
