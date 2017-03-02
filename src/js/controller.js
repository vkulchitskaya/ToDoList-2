import {Task} from './model';

export class Controller{
	constructor(view,taskCollection){
		this.view = view;
		this.taskCollection = taskCollection;
		this.view.bindButtonPressed(this.onKeyPressed.bind(this));
		this.view.bindRemovePressed(this.onKeyRemovePressed.bind(this),this.taskCollection);
		this.view.bindEditPressed(this.editPressed.bind(this));

	}
	
	onKeyPressed(name, callback){		
		var task = new Task (name,0);
		this.taskCollection.addTask(task);
		callback(this.taskCollection);
	}
	
	onKeyRemovePressed(id){
		this.taskCollection.removeTask(id);		
		this.view._display(this.taskCollection);
	}

	editPressed(name,id){
		this.taskCollection.editTask(id,name);
		this.view._display(this.taskCollection);
	}

}

