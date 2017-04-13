import {qs,qsa,$on,$delegate,} from './helpers';

export class View {

    constructor(template, idField,idButton,idUl,/* idButtonClear, */filter) {
        this.template = template;
        this.idField=qs(idField);
        this.$newTaskButton=qs(idButton);
        this.idUl= qs(idUl);
        /* this.idButtonClear=qs(idButtonClear); */
        this.filter = qs(filter);


        $delegate(this.idUl, 'span.task', 'dblclick', ({target,}) => {
            this._editTask(target);
        });

        $delegate(this.idUl, 'span.checkbox-custom', 'click', ({target,}) => {
            this._checkTask(target);
        });
        $delegate(this.idUl, 'span.close', 'click', ({target,}) => {
            this._deleteTask(target);
        });

        $on(this.filter,'click',()=>{
            self._showTaskDone(this.filter.checked);
        });

        self=this;

        /* $on(this.idButtonClear, 'click', () => {
            localStorage.clear();
            location.reload();
        });*/
    }

    bindTaskCreated(handler) {

        $on(this.$newTaskButton, 'click', () => {
            if (this.idField.value !== '') {
                let strFormat = self._replaceSym(this.idField.value);
                handler(strFormat,this.filter.checked);
            }
        });

        $on(this.idField,'keydown',()=>{
            event = event || window.event;
            if (event.keyCode === 13 & this.idField.value !== '') {
                handler(this.idField.value,this.filter.checked);
            }
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

    bindTaskFilter(handler) {
        this.onTaskFilter = handler;
    }

    _showTaskDone(check) {
        self.onTaskFilter(check);
    }

    _getValue() {
        return this.idField.value;
    }

    display(taskCollection) {
        self.idUl.innerHTML = this.template.taskList(taskCollection._getTasks());
        if (this.idField!==undefined) {
            this.idField.value='';
        }
        if (!self.filter.checked) {
            let doneTask =qsa('.done');
            doneTask.forEach(function (item) {
                item.remove();
            });
            console.log(doneTask);
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
        $on(edit,'keydown',()=>{
            event = event || window.event;
            if (event.keyCode === 13) {
                self.onTaskEdit(edit.value,id);
            }
        });
    }
    _checkTask(target) {
        let li = target.parentNode.parentNode;
        let id = li.getAttribute('data-id');
        let done = false;
        if (li.className ==='done') {
            li.classList.remove('done');
        } else {
            li.classList.add('done');
            done = true;
        }
        if (done & !self.filter.checked) {
            li.remove();
        }
        self.onTaskCheck(id,done);
    }
    _deleteTask(target) {
        console.log(target);
        let id = self._getTaskId(target);
        self.onTaskRemove(id);
    }
    _getTaskId(target) {
        return target.parentNode.getAttribute('data-id');
    }
    _replaceSym(str) {
        str = str.replace(/</g,'&lt;');
        str = str.replace(/>/g,'&gt;');
        return str;
    }


}

