import {qs,qsa,$on,} from './helpers';

export class View {

    constructor(template, idField,idButton,idUl,idButtonClear) {
        this.template = template;
        this.idField=qs(idField);
        this.$newTaskButton=qs(idButton);
        this.idUl= qs(idUl);
        this.idButtonClear=qs(idButtonClear);

        self=this;

        $on(this.idButtonClear, 'click', () => {
            localStorage.clear();
            location.reload();
        });
    }

    bindTaskCreated(handler) {

        $on(this.$newTaskButton, 'click', () => {
            handler(this.idField.value);
        });
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
        edit.setAttribute('value',tmpText);
        newLi.appendChild(edit);
        elem.appendChild(newLi);
        elem.lastChild.firstChild.focus();
        edit.onblur =() => {
            self.onTaskEdit(edit.value,id);
        };

    }

    display(taskCollection) {
        self.idUl.innerHTML = this.template.taskList(taskCollection._getTasks());
        self._addEventElem();
        if (this.idField!==undefined) {
            this.idField.value='';
        }
    }

    _addEventElem() {
        var liColl = qsa('li[data-id]');

        for (let i=0; i<liColl.length; i++) {
            $on(liColl[i].childNodes[0],'dblclick',self.editTask);
            $on(liColl[i].childNodes[2],'click',self._checkTask);
            $on(liColl[i].childNodes[3],'click',self._deleteTask);
        }
    }
    editTask() {
        console.log('Редактирование задачи');
    }
    _checkTask(event) {
        let currLi = self._getCurrentNode(event);
        let id = currLi.getAttribute('data-id');
        let done = currLi.childNodes[1].checked;
        self.onTaskCheck(id,done);
    }
    _deleteTask() {
        let currLi = self._getCurrentNode(event);
        let id = currLi.getAttribute('data-id');
        self.onTaskRemove(id);
    }
    _getCurrentNode(event) {
        event = event || window.event;
        return event.target.parentNode;
    }


}

