class View{
	
	constructor(idField,idButton,idUl,idButtonClear){
		this.idField=qs(idField);
		this.idButton=qs(idButton);
		this.idUl= qs(idUl);
		this.idButtonClear=qs(idButtonClear);
		self=this;
		this.idButton.onclick = function (){			
			self.onKeyPressed();
		}
		this.idButtonClear.onclick= function (){
			localStorage.clear();
			location.reload();


		}
	
		}

		bindButtonPressed (handler){
			this.onKeyPressed = handler;
		}
		bindDisPressed (handler){
			this.onKeyDisPressed = handler;
		}
		bindRemovePressed (handler){
			this.onKeyRemovePressed = handler;
		}
		getValue(){
			return this.idField.value;
		}
		display(taskCollection){
			var elem = this.idUl;
			while (elem.firstChild) {
    			elem.removeChild(elem.firstChild);
			}
	    	var tasks = taskCollection.getTasks();

	    	self = this
 	    	tasks.forEach(function (item) {
				var newLi = document.createElement('li');
				newLi.setAttribute('data-id', item.id);
				console.log(newLi);
   				newLi.innerHTML =item.name;
   				/*newLi.dbclick = function(){
   					var tmpId = this.getAttribute('data-id');
   					var tmpText = this.textContent;
   					var edit = document.createElement("input");
   					edit.setAttribute('value', tmpText);
   					this.appendChild(edit);
   				}*/		
   				self.idUl.appendChild(newLi);

		});

				var nodeList = document.getElementsByTagName("li");
				console.log(nodeList);
				for (var i = 0; i < nodeList.length; i++) {
  						var newSpan = document.createElement("span");
  						var txt = document.createTextNode("\u00D7");
  						newSpan.appendChild(txt);
  						newSpan.onclick	=  function	(){
  							var parentLi = this.parentElement;
  							var idTask = parentLi.getAttribute('data-id');
  							alert('Удаляем задачу под номером...'+idTask);
  							self.onKeyRemovePressed(idTask);
  						}
  						nodeList[i].appendChild(newSpan);
				}

		}

 	    }	
    	  