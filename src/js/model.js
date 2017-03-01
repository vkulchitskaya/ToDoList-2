import {Storage} from './storage';

export class Task {
  constructor(name,id) {
    this.name = name;
    this.id=id;
  } 
}

export class TaskCollection{

	constructor() {
		this.taskCollection = [];
		this.index =1000;
		this.storage = new Storage();
		this.storage.loadCollection(this);
	}

	addTask(task){
		this.index++;
		task.id =this.index;
		this.taskCollection.push(task);
		this.storage.rewriteCollection(this);

	}

	removeTask(id) {	
		this.taskCollection = this.taskCollection.filter(function(v){return	v.id !=id});
		this.storage.rewriteCollection(this);
	}

	editTask(id,newName){
		this.taskCollection.forEach(function(item){
			if (item.id==id) {
				item.name=newName;
			}
		});
		this.storage.rewriteCollection(this);
	}

	_getTasks() {
		return this.taskCollection;
	}
}