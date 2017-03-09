export function qs(id)		{
    return document.getElementById(id);
}

export function qt(tag)		{
    return document.getElementsByTagName(tag);
}
export function testLoad(taskCollection) {
    var existCollection = localStorage.getItem("collection");
    var reCollection;

    if (existCollection!=null || existCollection!=undefined) {
        console.log(existCollection);
        console.log(taskCollection);
        taskCollection.splice(0,0);
        reCollection = JSON.parse(existCollection);
        reCollection.forEach(function (item) { // чтобы не было object-ов
            taskCollection.push(item); // ПРИ ЗАГРУЗКЕ КОЛЛЕКЦИИ НА СТРАНИЦУ ИНДЕКС НЕ ИЗМЕНЯЕМ
        });
    }
}
