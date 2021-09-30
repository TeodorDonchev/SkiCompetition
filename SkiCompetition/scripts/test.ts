import * as ko from 'knockout';

public class TaskViewModel {
    currentTemplate: KnockoutObservable<string>;

    constructor(currentTemplate: string) {

        this.currentTemplate = ko.observable(currentTemplate);
    }

}


//ko.applyBindings(new TaskViewModel('test'));