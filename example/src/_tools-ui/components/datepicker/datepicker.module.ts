import { NgModule } from '@angular/core';
import { DatepickerComponent } from './/datepicker.component';
import { DropdownModule } from './../dropdown/dropdown.module';
import { ButtonModule } from './../button/button.module';
import { CommonModule } from '../../commons/common.module';
import { TimepickerComponent } from './timepicker.component';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        DropdownModule,
    ],
    declarations: [
        DatepickerComponent,
        TimepickerComponent,
    ],
    exports: [
        // CommonModule,
        DatepickerComponent,
        TimepickerComponent,
    ]
})
export class DatePickerModule { }
