import {View,} from './view';
import {TaskCollection,} from './model';
import {Controller,} from './controller';
import {Storage,} from './storage';
import {$on,} from './helpers';

$on(window, 'load', () => {

    const storage = new Storage();
    const view = new View('#taskTittle','#addButton','#listTask','#clearButton','#testButton');
    const controller = new Controller(view, storage);
    const setView = () => view.display(storage.taskCollection);

    setView();

    // check whether the TaskCollection was changed
    setInterval(() => {

        if (!storage.actualVersion()) {
            storage.loadCollection();
            setView();
        }
    }, 1000);
});
