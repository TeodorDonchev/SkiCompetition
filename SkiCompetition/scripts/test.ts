import * as ko from 'knockout';

import {
    Observable
} from 'knockout';

class TaskViewModel {
    currentTemplate: Observable<string>

    constructor(currentTemplate: string) {

        this.currentTemplate = ko.observable(currentTemplate);
    }

}


ko.applyBindings(new TaskViewModel('test'));