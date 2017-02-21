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

		addEdit(tmpText,id){
			var elem = this.idUl;
			var edit = document.createElement("input");
			alert(edit);
			edit.setAttribute('value', tmpText);
			this.appendChild(edit);
			self.idUl.appendChild(edit);
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
   				newLi.ondblclick = function(){
   					var tmpId = this.getAttribute('data-id');
   					var tmpText = this.textContent;
   					this.remove(); 				
   				}	

   				var newSpan = document.createElement("span");
   				var txt = document.createTextNode("\u00D7");
   				newSpan.appendChild(txt);
   				newLi.appendChild(newSpan);		
   				self.idUl.appendChild(newLi);   				

   				newSpan.onclick	=  function	(){
  							var idTask = newLi.getAttribute('data-id');
  							alert('Удаляем задачу под номером...'+idTask);
  							self.onKeyRemovePressed(idTask);
  						}
  							
		});

		}

 	    }	
    	  