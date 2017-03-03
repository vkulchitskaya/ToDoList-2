import {Task} from './model'

export class Storage{

	rewriteCollection(taskCollection){
		var commitTaskCollection = JSON.stringify(taskCollection.taskCollection);
		localStorage.setItem('collection', commitTaskCollection);
	}

	loadCollection(taskCollection){

		var existCollection = localStorage.getItem("collection");
		if (existCollection!=null || existCollection!=undefined){
			var reCollection = JSON.parse(existCollection);
			reCollection.forEach( function(item){
				var task = new Task(item.name,item.id); //чтобы не было object-ов
		 		taskCollection.addTask(task); 		
			} );
		}
	}		


}

