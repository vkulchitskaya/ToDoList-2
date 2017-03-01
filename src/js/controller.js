import {Task} from './model';

export class Controller{
	constructor(view,taskCollection){
		this.view = view;
		this.taskCollection = taskCollection;
		this.view.bindButtonPressed(this.onKeyPressed.bind(this));
		this.view.bindRemovePressed(this.onKeyRemovePressed.bind(this),this.taskCollection);
		this.view.bindEditPressed(this.editPressed.bind(this));

	}
	
	onKeyPressed(){
		var name = this.view.getValue();
		var task = new Task (name,0);
		this.taskCollection.addTask(task);
		this.view.display(this.taskCollection);

	}
	
	onKeyRemovePressed(id){
		this.taskCollection.removeTask(id);		
		this.view.display(this.taskCollection);
	}

	editPressed(name,id){
		this.taskCollection.editTask(id,name);
		this.view.display(this.taskCollection);
	}

}

