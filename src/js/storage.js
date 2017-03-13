
import {Task,} from './model';

class TaskOperation {
    constructor(name,idTask,nameTask) {
        var index = Number(localStorage.getItem('operation-index'));
        index++;
        localStorage.setItem('operation-index', index);
        this.idOper = index;
        this.name = name;
        this.idTask = idTask;
        this.nameTask = nameTask;
    }
}

class TaskOperationColl {
    constructor() {
        this.taskOperationColl = [];
    }
    addOper(taskOperation) {
        this.taskOperationColl.push(taskOperation);
    }

}


export class Storage {
    constructor() {
        this.version;
    }
    rewriteCollection(taskCollection,operation,task) {
        var commitTaskCollection = JSON.stringify(taskCollection.taskCollection);
        localStorage.setItem('collection', commitTaskCollection);
    }

    incVersionGlobal() {
        var versionStorage = localStorage.getItem('version-global');
        var versionGlobal = JSON.parse(versionStorage);
        versionGlobal = Number(versionGlobal);
        versionGlobal++;
        localStorage.setItem('version-global', versionGlobal);
        console.log('глобальная версия - ' + versionGlobal);
    }
    incVersionLocal() {
        this.version++;
        console.log('локальная версия - ' + this.version);
    }

    equalVersion() {
        var versionGlobal = localStorage.getItem('version-global');
        if (versionGlobal!=null && versionGlobal!=undefined) {
            this.version = Number(versionGlobal);
        }

    }

    loadCollection(taskCollection,versionLocal) {

        var existCollection = localStorage.getItem('collection');
        var version = localStorage.getItem('version-global');
        var reCollection = JSON.parse(existCollection);
        if (existCollection!=null && existCollection!=undefined && reCollection!=undefined) {
            if (reCollection.length!=0 && reCollection.length!=undefined) {
                reCollection.forEach(function (item) {
                    var task = new Task(item.name,item.id); // чтобы не было object-ов
                    taskCollection.addTask(task,false);
                    var test1 = localStorage.getItem('task-operation');
                    console.log(test1);
                });
            }
        } else {
            var commitTaskCollection = JSON.stringify(taskCollection);
            var taskOperationColl = new TaskOperationColl();
            var commitTaskOperationColl = JSON.stringify(taskOperationColl);
            localStorage.setItem('collection', commitTaskCollection);
            localStorage.setItem('version-global', 0);
            localStorage.setItem('operation-index', 0);
            localStorage.setItem('task-index', 0);
            localStorage.setItem('task-operation',commitTaskOperationColl);
        }
    }

    getGlobalId() {
        var taskId = localStorage.getItem('task-index');
        taskId = Number(taskId);
        taskId++;
        localStorage.setItem('task-index', taskId);
        return taskId;
    }

    addTaskToOperColl(name,idTask,nameTask) {
        var rec = new TaskOperation(name,idTask,nameTask);
        var taskOperationColl = localStorage.getItem('task-operation');
        try {
            var reTaskOperationColl = JSON.parse(taskOperationColl);
        } catch (e) {
            var reTaskOperationColl = new TaskOperationColl();
        }
        var arrTaskOperationColl =Array.from(reTaskOperationColl);
        arrTaskOperationColl.push(rec);
        var commitArray = JSON.stringify(arrTaskOperationColl);
        localStorage.setItem('task-operation',commitArray);
        this.showOperColl();
        this.reBuildTask();
    }

    showOperColl() {
        var taskOperTest = localStorage.getItem('task-operation');
        var reTaskOperTest = JSON.parse(taskOperTest);
        console.log('Коллекция операций');
        console.log(reTaskOperTest);
    }

    reBuildTask() {
        var taskOperTest = localStorage.getItem('task-operation');
        var reTaskOperTest = JSON.parse(taskOperTest);
        var RemoveId = reTaskOperTest.filter(function (item) {
            return	item.name == 'remove';
        });
        console.log(RemoveId);
        var testArr;

        RemoveId.forEach(function (item) {
            reTaskOperTest = reTaskOperTest.filter(function(v){
                return v.idTask !=item.idTask;
            })
        });
        // осталась таблица с операций add и edit
        console.log(reTaskOperTest);

    }


}
