import {Task} from './model'

export class Storage{
	constructor(){
	}

	rewriteCollection(taskCollection){
		var commitTaskCollection = JSON.stringify(taskCollection.taskCollection);
		var commitIndexCollection = JSON.stringify(taskCollection.index);
		localStorage.setItem('collection', commitTaskCollection);
		localStorage.setItem('collection-index', commitIndexCollection);
	}

	loadCollection(taskCollection){

		var existCollection = localStorage.getItem("collection");
		var existIndex = localStorage.getItem("collection-index");
		if (existCollection!=null || existCollection!=undefined){
			var reCollection = JSON.parse(existCollection);
			var reIndex = JSON.parse(existIndex);
			reCollection.forEach( function(item){
				var oldTask = new Task(item.name,item.id);	
		 		taskCollection.taskCollection.push(oldTask); 		
			} );
		taskCollection.index =reIndex;	
		}
	}		


}

