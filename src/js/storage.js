
import {Task,} from './model';

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
                });
            }
        } else {
            var commitTaskCollection = JSON.stringify(taskCollection);
            localStorage.setItem('collection', commitTaskCollection);
            localStorage.setItem('version-global', 0);
        }
    }
 // Id выдает последнее, но задачи перезатирает в двух сессиях
    getId() {
        var existCollection = localStorage.getItem('collection');
        var reCollection = JSON.parse(existCollection);
        var maxId = 0;
        if (existCollection!=null && reCollection!=undefined) {
            reCollection = JSON.parse(existCollection);
            if (reCollection.length!=0 && reCollection.length!=undefined) {
                reCollection.forEach(function (item) {
                    if (item.id>maxId) {
                        maxId=item.id;
                    }
                });
            }
        }

        maxId++;
        return maxId;
    }

    removeTaskStorage(id) {
        var existCollection = localStorage.getItem('collection');
        var reCollection = JSON.parse(existCollection);
        reCollection = reCollection.filter(function (v) {
            return v.id !=id;
        });
        localStorage.setItem('collection', reCollection);


    }

    addTaskStorage(task) {
        var existCollection = localStorage.getItem('collection');
        var reCollection = JSON.parse(existCollection);
        if (existCollection!=null || existCollection!=undefined) {
            reCollection = JSON.parse(existCollection);
        }
        console.log(reCollection);
        reCollection.push(task);
        localStorage.setItem('collection', reCollection);

    }


}

