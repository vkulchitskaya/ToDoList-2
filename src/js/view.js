import {qs,qt,} from './helpers';

export class View {

    constructor(idField,idButton,idUl,idButtonClear) {
        this.idField=qs(idField);
        this.idButton=qs(idButton);
        this.idUl= qs(idUl);
        this.idButtonClear=qs(idButtonClear);
        self=this; /* надо избавиться*/

        this.idButton.onclick = () => {
            this.onTaskCreated(this._getValue(), this._display.bind(this));

        };

        this.idButtonClear.onclick= function () {
            localStorage.clear();
            location.reload();
        };

    }

    bindTaskCreated(handler) {
        this.onTaskCreated = handler;
    }

    bindTaskRemove(handler) {
        this.onTaskRemove = handler;
    }

    bindTaskEdit(handler) {
        this.onTaskEdit = handler;
    }

    _getValue() {
        return this.idField.value;
    }

    _addEdit(tmpText,id) {
        var elem = self.idUl;
        var newLi = document.createElement('li');
        var edit = document.createElement('input');
        console.log(tmpText);
        edit.setAttribute('value',tmpText);
        newLi.appendChild(edit);
        elem.appendChild(newLi);
        elem.lastChild.firstChild.focus();
        edit.onblur =() => {
            self.onTaskEdit(edit.value,id,this._display.bind(this));

        };

    }

    _display(taskCollection) {
        self._clearListTask();
        self._addListTask(taskCollection);
        if (this.idField!=undefined) {
            this.idField.value='';
        }
    }

    _clearListTask() {
        var elem = this.idUl;
        while (elem.firstChild) {
            elem.removeChild(elem.firstChild);
        }
    }
    _addCloseSymbol(newLi) {
        var newSpan = document.createElement('span');
        var txt = document.createTextNode('\u00D7');
        newSpan.appendChild(txt);
        newLi.appendChild(newSpan);
        this.idUl.appendChild(newLi);

        newSpan.onclick	= function	() {
            var idTask = newLi.getAttribute('data-id');
            alert('Удаляем задачу под номером...'+idTask);
            self.onTaskRemove(idTask,self._display.bind(this));
        };
    }

    _addListTask(taskCollection) {
        var tasks = taskCollection._getTasks();

        tasks.forEach(function (item) {
            var newLi = document.createElement('li');
            newLi.setAttribute('data-id', item.id);
            newLi.innerHTML =item.name;

            newLi.ondblclick = function () {
                var tmpId = this.getAttribute('data-id');
                var tmpText = this.firstChild.data;
                self._addEdit(tmpText,tmpId);
            };
            self._addCloseSymbol(newLi);
        });

    }


}

