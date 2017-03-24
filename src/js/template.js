
export class Template {

    taskList(tasks) {

        return tasks.reduce((a,item) => a + `
            
            <li data-id='${item.id}'>
                <span>${item.name}</span>
                <input type='checkbox'>
                <span>&#215</span>
            </li>`, '');
    }
}
