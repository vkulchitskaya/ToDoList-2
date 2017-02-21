class Task {
  constructor(name,id) {
    this.name = name;
    this.id=id;
  } 
}

class TaskCollection{

	constructor() {
		this.taskCollection = [];
		this.index =1000;
		self=this;
		var existCollection = localStorage.getItem("collection");
		var existIndex = localStorage.getItem("collection-index");
		if (existCollection!=null || existCollection!=undefined){
			var reCollection = JSON.parse(existCollection);
			var reIndex = JSON.parse(existIndex);
			reCollection.forEach( function(item){
				var oldTask = new Task(item.name,item.id);	
		 		self.taskCollection.push(oldTask);
		 		self.index =reIndex;
			} );
		}
	
	}
	addTask(task){
		this.taskCollection.push(task);

	}

	removeTask(task) {
		this.removeTaskByName(task.name);
	}
	removeTaskById(id) {	
		this.taskCollection = this.taskCollection.filter(function(v){return	v.id !=id});
	}
	getTasks() {
		return this.taskCollection;
	}

	rewrite(){
		var commitTaskCollection = JSON.stringify(this.taskCollection);
		var commitIndexCollection = JSON.stringify(this.index);
		localStorage.setItem('collection', commitTaskCollection);
		localStorage.setItem('collection-index', commitIndexCollection);
	}
	incIndex(){
		this.index++;
	}
}