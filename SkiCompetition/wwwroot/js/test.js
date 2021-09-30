"use strict";
var TaskViewModel = /** @class */ (function () {
    function TaskViewModel(currentTemplate) {
        this.currentTemplate = ko.observable(currentTemplate);
    }
    return TaskViewModel;
}());
ko.applyBindings(new TaskViewModel('test'));
//# sourceMappingURL=test.js.map