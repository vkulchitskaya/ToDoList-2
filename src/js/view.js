import {qs,qt} from './helpers';

export class View{
	
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

		bindEditPressed (handler){
			this.editPressed = handler;
		}

		bindButtonPressed (handler){
			this.onKeyPressed = handler;
		}

		bindRemovePressed (handler){
			this.onKeyRemovePressed = handler;
		}
		getValue(){
			return this.idField.value;
		}

		_addEdit(tmpText,id){
			var elem = this.idUl;
			var newLi = document.createElement('li');
			var edit = document.createElement("input");
			edit.setAttribute('value', tmpText);
			newLi.appendChild(edit);
			elem.appendChild(newLi);
			console.log(elem.lastChild.firstChild);
			elem.lastChild.firstChild.focus();

			edit.onblur = function(){
				self.editPressed(this.value,id);		

			}


			}	

		display(taskCollection){
			var elem = this.idUl;
			while (elem.firstChild) {
    			elem.removeChild(elem.firstChild);
			}
	    	var tasks = taskCollection._getTasks();

	    	self = this
 	    	tasks.forEach(function (item) {
				var newLi = document.createElement('li');
				newLi.setAttribute('data-id', item.id);
				console.log(newLi);
   				newLi.innerHTML =item.name;
   				newLi.ondblclick = function(){
   					var tmpId = this.getAttribute('data-id');
   					var tmpText = this.firstChild.data;
   					self._addEdit(tmpText,tmpId);
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
    	  