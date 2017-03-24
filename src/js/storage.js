import {Task, TaskCollection,} from './model';

const COLLECTION = 'collection';
const COLLECTION_VERSION = 'collection_version';

let get = (key) => {
    if (typeof key !== 'string' || localStorage.getItem(key) === null || localStorage.getItem(key) === undefined)	{
        return null;
    }
    return localStorage.getItem(key);
};

let set = (key, value) => {
    if (typeof key !== 'string' || typeof value === 'undefined') {
        return;
    }
    localStorage.setItem(key, value);
};

export class Storage {

    constructor() {
        this.version = 0;
        this.taskCollection = this.loadCollection();
    }

    rewriteCollection() {

        this.version++;
        set(COLLECTION, this.taskCollection.serialize());
        set(COLLECTION_VERSION, this.version);
    }

    actualVersion() {
        return this.version === parseInt(get(COLLECTION_VERSION));
    }

    loadCollection() {

        var result = [];
        var existCollection = get(COLLECTION);

        if (existCollection !== null) {

            result = JSON.parse(existCollection).map((i) => {
                return new Task(i.name, i.id, i.done);
            });
            this.version = parseInt(get(COLLECTION_VERSION));

        } else {

			// initalize collection
            this.version = 1;
            set(COLLECTION, JSON.stringify(result));
            set(COLLECTION_VERSION, this.version);
        }

        return new TaskCollection(result);
    }

    addTask(task) {
        this.taskCollection.addTask(task);
        this.rewriteCollection();
    }

    removeTask(id) {
        this.taskCollection.removeTask(id);
        this.rewriteCollection();
    }

    editTask(id,newName) {
        this.taskCollection.editTask(id, newName);
        this.rewriteCollection();
    }

    setTaskDone(id,done) {
        this.taskCollection.setTaskDone(id, done);
        this.rewriteCollection();
    }
}

