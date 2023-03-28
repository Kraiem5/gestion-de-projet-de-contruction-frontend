import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
    selector     : 'forms-layouts',
    templateUrl  : './layouts.component.html',
    encapsulation: ViewEncapsulation.None
})
export class FormsLayoutsComponent
{
    formFieldHelpers: string[] = [''];
    minDate:Date
    selectedBeginDate: Date;
    selectedEndDate: Date;
    /**
     * Constructor
     */
    constructor(private _formBuilder: FormBuilder)
    {
        this.minDate= new Date
        this.selectedBeginDate = new Date();
        this.selectedEndDate = new Date();
    }

    getFormFieldHelpersAsString(): string
    {
        return this.formFieldHelpers.join(' ');
    }
    onDateSelect(selectedDate: Date) {
        if (selectedDate < this.minDate) {
          this.minDate = selectedDate;
        }
      }
      onBeginDateSelect(event: MatDatepickerInputEvent<Date>) {
        this.selectedBeginDate = event.value;
        this.selectedEndDate = this.selectedBeginDate;
      }
}
