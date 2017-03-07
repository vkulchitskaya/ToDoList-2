
import {Task} from './model'

export class Storage{

	rewriteCollection(taskCollection){
		
		/*КОЛЛЕКЦИЯ*/
		var commitTaskCollection = JSON.stringify(taskCollection.taskCollection); //на каждой странице у меня свой taskCollection от этого и затирает
		localStorage.setItem('collection', commitTaskCollection);
		
		/*ИНДЕКС*/
		var flagCollection = localStorage.getItem('flag-collection');
		flagCollection++; // ПРИ ВНЕСЕНИИ КАКИХ-ЛИБО ИЗМЕНЕНИЙ УВЕЛИЧИВАЕМ ИНДЕКС	
		localStorage.setItem('flag-collection', flagCollection); 
	}

	loadCollection(taskCollection,index){

		var existCollection = localStorage.getItem('collection');

		if (existCollection!=null || existCollection!=undefined){
			var flagCollection = localStorage.getItem('flag-collection');
			var reflagCollection = JSON.parse(flagCollection);
			index = reflagCollection;

			var reCollection = JSON.parse(existCollection);
			reCollection.forEach( function(item){
				var task = new Task(item.name,item.id); //чтобы не было object-ов
		 		taskCollection.addTask(task,false); //ПРИ ЗАГРУЗКЕ КОЛЛЕКЦИИ НА СТРАНИЦУ ИНДЕКС НЕ ИЗМЕНЯЕМ		
			} );
		}

		else {
			localStorage.setItem('flag-collection', 0);
		}
	}
 //Id выдает последнее, но задачи перезатирает в двух сессиях
	getId(){
		var existCollection = localStorage.getItem("collection");
		var maxId = 0;
		if (existCollection!=null || existCollection!=undefined){
			var reCollection = JSON.parse(existCollection);
			reCollection.forEach(function(item){
				if (item.id>maxId) {
					maxId=item.id;
				} 
			});
			
		}
		maxId++
		return maxId;
	}





}		

/*кроме самой коллекции храним еще один объект - номер

1) вкладка стартуерт и вместе с коллекцией читает этот номер - пусть 1
2) раз в секунду она перечитывает этот номер
3) если он все еще 1 - значит все ок
4) если оно стало больше 1   - значит другая вкладка уже переписала коллекцию и нам надо ее перечитать
*/
