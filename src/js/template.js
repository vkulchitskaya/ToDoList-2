
export class Template {

    taskList(tasks) {

        return tasks.reduce((a,item) => a + `
            
            <li data-id='${item.id}' ${item.done ? 'class=checked' : ''}>
                <span class='task'>${item.name}</span>
                <input class='check' type='checkbox' ${item.done ? 'checked' : ''}>
                <span class='close'>&#215</span>
            </li>`, '');
    }
}
