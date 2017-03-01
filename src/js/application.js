import {View} from './view';
import {TaskCollection} from './model';
import {Controller} from './controller';



class Application{
	constructor(){
		this.taskCollection = new TaskCollection();
		this.view = new View('taskTittle','addButton','listTask','clearButton');
		this.controller = new Controller(this.view,this.taskCollection);
		this.view.display(this.taskCollection);
	}

}

window.onload = function(){
var application = new Application();
console.log(application.taskCollection);

}
