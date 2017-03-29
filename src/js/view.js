import {qs,qsa,$on,$delegate,} from './helpers';

export class View {

    constructor(template, idField,idButton,idUl,idButtonClear,filter) {
        this.template = template;
        this.idField=qs(idField);
        this.$newTaskButton=qs(idButton);
        this.idUl= qs(idUl);
        this.idButtonClear=qs(idButtonClear);
        this.filter = qs(filter);

        $delegate(this.idUl, 'span.task', 'dblclick', ({target,}) => {     // no-comma-dangle
            this._editTask(target);
        });

        $delegate(this.idUl, 'input.check', 'click', ({target,}) => {
            this._checkTask(target);
        });
        $delegate(this.idUl, 'span.close', 'click', ({target,}) => {
            this._deleteTask(target);
        });

        /* не понимаю, почему при нажатии на checkbox не вызыватеся console.log(); */
        $delegate(this.filter, 'input.showDone', 'click', ({target,}) => {
            console.log(this.filter);
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

    /* bindTaskFilter(handler) {
        this.onTaskFilter = handler;
    }*/

    _getValue() {
        return this.idField.value;
    }

    display(taskCollection) {
        self.idUl.innerHTML = this.template.taskList(taskCollection._getTasks());
        if (this.idField!==undefined) {
            this.idField.value='';
        }
    }

    _editTask(target) {
        target.innerHTML = `<input class='edit' value='${target.textContent}'>`;
        let edit = qs('input.edit');
        let id = self._getTaskId(target);
        edit.focus();
        edit.onblur =() => {
            self.onTaskEdit(edit.value,id);
        };
    }
    _checkTask(target) {
        let id = self._getTaskId(target);
        let done = target.checked;
        self.onTaskCheck(id,done);
    }
    _deleteTask(target) {
        let id = self._getTaskId(target);
        self.onTaskRemove(id);
    }
    _getCurrentNode(event) {
        event = event || window.event;
        return event.target.parentNode;
    }
    _getTaskId(target) {
        return target.parentNode.getAttribute('data-id');
    }

    /* _showTaskDone(event) {
        console.log('я тут');
       if (self.filter.checked) {
            self.display(self.onTaskFilter);
        }
    }*/


}

