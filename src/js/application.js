import {View,} from './view';
import {TaskCollection,} from './model';
import {Controller,} from './controller';
import {Storage,} from './storage';
import {$on,} from './helpers';

class Application {

    constructor() {

        this.storage = new Storage();
        this.view = new View('#taskTittle','#addButton','#listTask','#clearButton','#testButton');
        this.controller = new Controller(this.view, this.storage);
        this.showCollection();

		// check whether the TaskCollection was changed
        setInterval(() => {

            if (!this.storage.actualVersion()) {
                this.storage.loadCollection();
                this.showCollection();
            }
        }, 1000);
    }
    showCollection() {
        this.view.display(this.storage.taskCollection);
    }
}

$on(window, 'load', () => {
    new Application();
});
