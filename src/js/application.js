import {View,} from './view';
import {TaskCollection,} from './model';
import {Controller,} from './controller';
import {Storage,} from './storage';

class Application {

    constructor() {
        this.taskCollection = new TaskCollection();
        this.view = new View('taskTittle','addButton','listTask','clearButton');
        this.controller = new Controller(this.view,this.taskCollection);
        this.view._display(this.taskCollection); // убрать обращение к приватному методу

		// check whether the TaskCollection was changed
        var periodic = setInterval(() => {

            let c = this.taskCollection;
            if (!c.storage.actualVersion()) {
                c.taskCollection = c.storage.loadCollection();
                this.view._display(this.taskCollection); // убрать обращение к приватному методу
            }
        }, 1000);
    }
}

window.onload = function () {
    var application = new Application();
    console.log(application.taskCollection);
};
