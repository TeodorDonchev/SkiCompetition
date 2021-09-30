"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var TaskViewModel = /** @class */ (function () {
    function TaskViewModel(currentTemplate) {
        this.currentTemplate = ko.observable(currentTemplate);
    }
    return TaskViewModel;
}());
ko.applyBindings(new TaskViewModel('test'));
//# sourceMappingURL=test.js.map