
export class Template {

    taskList(tasks) {

        return tasks.reduce((a,item) => a + `
            
            <li data-id='${item.id}' ${item.done ? 'class=done' : ''}>
                <label>
                    <input class='checkbox' type='checkbox' ${item.done ? 'checked' : ''}>
                    <span class="checkbox-custom"></span>
                </label>
                    <span class='task'>${item.name}</span>
                    <span class='close'>&#215</span>
                
            </li>`, '');
    }
}
