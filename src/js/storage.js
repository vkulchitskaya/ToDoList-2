
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
            var reTaskOperationC; oll = new TaskOperationColl();
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

    clearRemoveOperCol() {
        var taskOper = localStorage.getItem('task-operation');
        var reTaskOper = JSON.parse(taskOper);
        if (reTaskOper.length !=undefined) {
            var idRemove =[]; // номер задач, которые были удалены

            reTaskOper.forEach(function (item) {
                if (item.name =='remove') {
                    idRemove.push(item.idTask);
                }
            });
        // удаляем из истории все записи с idTask,которые встретились в remove
            if (idRemove.length>0) {
                idRemove.forEach(function (i) {
                    reTaskOper = reTaskOper.filter(function (v) {
                        return v.idTask !=i;
                    });
                });
                var commitReTaskOper = JSON.stringify(reTaskOper);
                localStorage.setItem('task-operation',commitReTaskOper);
            }
        }
        // записываем результат в localStorage
    }

    reBuildTask() {
        this.clearRemoveOperCol();
        var taskOper = localStorage.getItem('task-operation');
        var reTaskOper = JSON.parse(taskOper);
        if (reTaskOper.length !=undefined) {
            var UniqTask = []; // массив уникальных номеров задач
            var UniqOper =[]; // массив уникальных операций и задач

            reTaskOper.forEach(function (item) {
                if (UniqTask.indexOf(item.idTask)==-1) {
                    UniqTask.push(item.idTask);
                    var operList = reTaskOper.filter(function (v) {
                        return v.idTask==item.idTask;
                    });
                     // получили массив операций для одной задачи
                    
                    console.log('Список операций operList ');
                    console.log(operList);
                    var oneOper = [];
                    oneOper.push(operList[0]);
                    operList.forEach(function (m) {
                        var boo = (m.idOper>oneOper[0].idOper);
                        console.log('operList.idOper = ',m.idOper);
                        console.log('oneOper[0].idOper = ',oneOper[0].idOper);
                        console.log('operList.idOper>oneOper[0].idOper ',boo);
                        if (m.idOper>oneOper[0].idOper)				{
                            oneOper[0].idOper=m.idOper;
                        }
                    });
                    UniqOper.push(oneOper[0]);
                    console.log('Выбор из списка операций задачу с max(IdOper)');
                    console.log(UniqOper);
                }
            });
            console.log('UniqTask = '+UniqTask); 

            var rebootTaskCollection = [];
            UniqOper.forEach(function (n) {
                var task = new Task(n.nameTask,n.idTask);
                rebootTaskCollection.push(task);
            });
            console.log('Вывод собраной коллекции задачи');
            console.log(rebootTaskCollection);
            
        }
    }


}
