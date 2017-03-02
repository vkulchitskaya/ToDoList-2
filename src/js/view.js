import {qs,qt} from './helpers';

export class View{
	
	constructor(idField,idButton,idUl,idButtonClear){
		this.idField=qs(idField);
		this.idButton=qs(idButton);
		this.idUl= qs(idUl);
		this.idButtonClear=qs(idButtonClear);
		self=this;

		this.idButton.onclick = () => {			
			this.onKeyPressed(this._getValue(), this._display.bind(this));
			
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
		_getValue(){
			return this.idField.value;
		}

		_addEdit(tmpText,id){
			var elem = self.idUl;
			var newLi = document.createElement('li');
			var edit = document.createElement("input");
			console.log(tmpText);
			edit.setAttribute('value',tmpText); // не передается  tmpText
			newLi.appendChild(edit);
			elem.appendChild(newLi);
			elem.lastChild.firstChild.focus();
			edit.onblur =() => {
				self.editPressed(edit.value,id,this._display.bind(this));

			}


			}	

		_display(taskCollection){
			var elem = self.idUl;
			while (elem.firstChild) {
    			elem.removeChild(elem.firstChild);
			}
	    	var tasks = taskCollection._getTasks();

 	    	tasks.forEach(function (item) {
				var newLi = document.createElement('li');
				newLi.setAttribute('data-id', item.id);
   				newLi.innerHTML =item.name;

   				newLi.ondblclick = function(){
   					var tmpId = this.getAttribute('data-id') ; // this указывает на newLi 
   					var tmpText = this.firstChild.data; // this указывает на newLi 
   					self._addEdit(tmpText,tmpId); // вызываем метод view, this должно показывать на view
   					this.remove(); // this указывает на newLi 

   				}	

   				var newSpan = document.createElement("span");
   				var txt = document.createTextNode("\u00D7");
   				newSpan.appendChild(txt);
   				newLi.appendChild(newSpan);		
   				self.idUl.appendChild(newLi);  //this указывает на view				

   				newSpan.onclick	=  function	(){
  							var idTask = newLi.getAttribute('data-id');
  							alert('Удаляем задачу под номером...'+idTask);
  							self.onKeyRemovePressed(idTask);//this указывает на view
  						}
  							
		});

		}

 	    }	
    	  