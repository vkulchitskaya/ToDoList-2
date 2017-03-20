import {Task,} from './model';

const COLLECTION = 'collection';
const COLLECTION_VERSION = 'collection_version';

let get = (key) => {
    if (typeof key !== 'string' || localStorage.getItem(key) == null || localStorage.getItem(key) == undefined)	{
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
    }

    rewriteCollection(taskCollection) {

        this.version++;
        set(COLLECTION, JSON.stringify(taskCollection.taskCollection));
        set(COLLECTION_VERSION, this.version);
    }

    actualVersion() {
        return this.version === parseInt(get(COLLECTION_VERSION));
    }

    loadCollection() {

        var result = [];
        var existCollection = get(COLLECTION);

        if (existCollection != null) {

            result = JSON.parse(existCollection).map((i) => {
                return new Task(i.name, i.id);
            });
            this.version = parseInt(get(COLLECTION_VERSION));

        } else {

			// initalize collection
            this.version = 1;
            set(COLLECTION, JSON.stringify(result));
            set(COLLECTION_VERSION, this.version);
        }

        return result;
    }
}

