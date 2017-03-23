import {qs,qsa,$on,} from './helpers';

export class View {

    constructor(idField,idButton,idUl,idButtonClear) {
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
        self._clearListTask();
        self._addListTask(taskCollection);
        self._addEventElem();
        if (this.idField!==undefined) {
            this.idField.value='';
        }
    }

    _clearListTask() {
        var elem = this.idUl;
        while (elem.firstChild) {
            elem.removeChild(elem.firstChild);
        }
    }

    _addListTask(taskCollection) {
        var tasks = taskCollection._getTasks();
        var list = tasks.reduce((a,item) =>
        a +`<li data-id='${item.id}'><span>${item.name}</span><input type='checkbox'><span>&#215</span></li>\n`,'');
        self.idUl.innerHTML = list;
    }
    _addEventElem() {
        var liCollection = qsa('li[data-id]');
        for (let i=0; i<liCollection.length; i++) {
            $on(liCollection[i].childNodes[0],'dblclick',self.editTask);
            $on(liCollection[i].childNodes[1],'click',self.checkTask);
            $on(liCollection[i].childNodes[2],'click',self.deleteTask);
        }
    }
    editTask() {
        console.log('Редактирование задачи');
    }
    checkTask() {
        console.log('Выполнение/невыполнение задачи');
    }
    deleteTask() {
        console.log('Удаление задачи');
    }

}

