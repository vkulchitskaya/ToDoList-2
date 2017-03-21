import {qs,$on,} from './helpers';

export class View {

    constructor(idField,idButton,idUl,idButtonClear,testButton) {
        this.idField=qs(idField);
        this.idButton=qs(idButton);
        this.idUl= qs(idUl);
        this.idButtonClear=qs(idButtonClear);
        /* ***************** */
        this.testButton = qs(testButton);
        this.testButton.onclick = function () {
            self._showCheckTask();
        };
        /* *********************** */

        self=this;

        $on(this.idButton, 'click', () => {
            this.onTaskCreated(this._getValue(), this._display.bind(this));
        });

        $on(this.idButtonClear, 'click', () => {
            localStorage.clear();
            location.reload();
        });
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

    bindTaskCheck(handler) {
        this.onTaskCheck = handler;
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
    _addCloseSymbol(checkbox,newLi) {
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
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = item.done;

            checkbox.onclick = function () {
                var idTask = Number(this.parentNode.getAttribute('data-id'));
                var done = this.checked;
                self.onTaskCheck(idTask,done);
            };
            newLi.innerHTML =item.name;
            newLi.appendChild(checkbox);

            newLi.ondblclick = function () {
                var tmpId = this.getAttribute('data-id');
                var tmpText = this.firstChild.data;
                self._addEdit(tmpText,tmpId);
            };
            self._addCloseSymbol(checkbox,newLi);
        });

    }

    _addCheckTask(newLi) {
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        newLi.appendChild(checkbox);
    }
}

