import {Task} from './model';

export class Controller{
	constructor(view,taskCollection){
		this.view = view;
		this.taskCollection = taskCollection;
		this.view.bindButtonPressed(this.onKeyPressed.bind(this));
		this.view.bindDisplayList(this.displayList.bind(this));
		this.view.bindRemovePressed(this.onKeyRemovePressed.bind(this));
		this.view.bindEditPressed(this.editPressed.bind(this));
	}


	
	onKeyPressed(){
		this.taskCollection.incIndex();
		var name = this.view.getValue();
		var id = this.taskCollection.index;
		console.log(id);
		var task = new Task (name,id);
		this.taskCollection.addTask(task);
		this.taskCollection.rewrite();
		this.view.displayList();
		
	}

	
	displayList(){
		this.view.display(this.taskCollection);	

	}

	onKeyRemovePressed(id){
		this.taskCollection.removeTaskById(id);
		this.taskCollection.rewrite();			
		this.view.display(this.taskCollection);	

	}

	editPressed(name,id){
		this.taskCollection.editTask(id,name);
		this.taskCollection.rewrite();
		this.view.display(this.taskCollection);
			
	}

}

