import { CompetitionsDialogVM } from "../ViewModels/Competition";

interface KnockoutBindingHandlers {
    datePicker: DatePicker;
}

export default class DatePicker implements KnockoutBindingHandler {

    init(element, valueAccessor, allBindingsAccessor, viewModel) {
        // Register change callbacks to update the model
        // if the control changes.       
        ko.utils.registerEventHandler(element, "change", function () {
            var value = valueAccessor();
            value(element.valueAsDate);
        });
    }
    // Update the control whenever the view model changes
    update(element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = valueAccessor();
        element.valueAsDate = value();
    }

}

ko.bindingHandlers.datePicker = new DatePicker();