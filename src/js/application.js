import {View,} from './view';
import {TaskCollection,} from './model';
import {Controller,} from './controller';
import {Storage,} from './storage';
import {$on,} from './helpers'

class Application {

    constructor() {
        this.taskCollection = new TaskCollection();
        this.view = new View('#taskTittle','#addButton','#listTask','#clearButton','#testButton');
        this.controller = new Controller(this.view,this.taskCollection);
        this.showCollection();

		// check whether the TaskCollection was changed
        var periodic = setInterval(() => {

            let c = this.taskCollection;
            if (!c.storage.actualVersion()) {
                c.taskCollection = c.storage.loadCollection();
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
