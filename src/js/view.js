import {qs,qsa,$on,$delegate,} from './helpers';

export class View {

    constructor(template, idField,idButton,idUl,idButtonClear) {
        this.template = template;
        this.idField=qs(idField);
        this.$newTaskButton=qs(idButton);
        this.idUl= qs(idUl);
        this.idButtonClear=qs(idButtonClear);

        $delegate(this.idUl, 'li span', 'dblclick', ({target,}) => {     // no-comma-dangle
            this.editTask(target);
        });
        $delegate(this.idUl, 'input[type="checkbox"]', 'click', ({target,}) => {     // no-comma-dangle
            this._checkTask(target);
        });

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
        console.log(taskCollection);
        self.idUl.innerHTML = this.template.taskList(taskCollection._getTasks());
        // self._addEventElem();
        if (this.idField!==undefined) {
            this.idField.value='';
        }
    }

    // _addEventElem() {
    //    var liColl = qsa('li[data-id]');
    //
    //    for (let i=0; i<liColl.length; i++) {
    //        $on(liColl[i].childNodes[0],'dblclick',self.editTask);
    //        $on(liColl[i].childNodes[2],'click',self._checkTask);
    //        $on(liColl[i].childNodes[3],'click',self._deleteTask);
    //    }
    // }

    editTask(target) {
        console.log('Редактирование задачи');
        console.log(target);
    }

    _checkTask(target) {
        let id = target.parentNode.getAttribute('data-id');
        let done = target.checked;
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

