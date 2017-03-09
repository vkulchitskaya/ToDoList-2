import {View,} from "./view";
import {TaskCollection,} from "./model";
import {Controller,} from "./controller";


class Application {
    constructor() {
        this.taskCollection = new TaskCollection();
        this.view = new View("taskTittle","addButton","listTask","clearButton");
        this.controller = new Controller(this.view,this.taskCollection);
        this.view._display(this.taskCollection); // убрать обращение к приватному методу
    }

}

window.onload = function () {
    //localStorage.clear();
    var application = new Application();
    console.log(application.taskCollection);

};
