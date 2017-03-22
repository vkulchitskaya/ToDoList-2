import {View,} from './view';
import {TaskCollection,} from './model';
import {Controller,} from './controller';
import {Storage,} from './storage';
import {$on,} from './helpers';

class Application {

    constructor() {
        this.taskCollection = new TaskCollection();
        this.view = new View('#taskTittle','#addButton','#listTask','#clearButton','#testButton');
        this.controller = new Controller(this.view,this.taskCollection);
        this.storage = new Storage();
        this.showCollection();

		// check whether the TaskCollection was changed
        setInterval(() => {

            if (!this.storage.actualVersion()) {
                this.taskCollection.taskCollection = this.storage.loadCollection();
                this.showCollection();
            }
        }, 1000);
    }
    showCollection() {
        this.view._display(this.taskCollection);
    }
}

$on(window, 'load', () => {
    new Application();
});
