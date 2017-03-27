
export class Template {

    taskList(tasks) {

        return tasks.reduce((a,item) => a + `
            
            <li data-id='${item.id}'>
                <span>${item.name}</span>
                <input type='checkbox' ${item.done ? 'checked' : ''}>
                <span>&#215</span>
            </li>`, '');
    }
}
