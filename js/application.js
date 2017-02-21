class Application{
	constructor(){
		this.taskCollection = new TaskCollection();
		this.view = new View('taskTittle','addButton','listTask','clearButton');
		this.controller = new Controller(this.view,this.taskCollection);

	}

}

window.onload = function(){
var application = new Application();
application.view.onKeyDisPressed();
console.log(application.taskCollection);

}
