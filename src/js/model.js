import {Storage} from './storage';

export class Task {
  constructor(name,id) {
    this.name = name;
    this.id=id;
  } 
}

export class TaskCollection{

	constructor() {
		self = this;
		this.taskCollection = [];
		this.storage = new Storage();
		this.storage.loadCollection(this);
		var check1 = Number(localStorage.getItem('flag-collection'));
		var checkStorage = setInterval(function(){
			var check2 = Number(localStorage.getItem('flag-collection'));
			if (check1!=check2) {
				console.log('загрузка модели из хранилища');
				//self.storage.loadCollection(self);
				console.log('check1 ', check1);
				console.log('check2 ', check2);
				console.log('синхронизация флагов check1=check2;');
			}


		}, 3000)
	}

	addTask(task,flag){
		//нужна синхронизация с localStorage перед добавлением. Надо брать индекс оттуда
		task.id =this.storage.getId();
		this.taskCollection.push(task);
		if(flag){
		this.storage.rewriteCollection(this);
		}

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