import { CommonModule }   from '@angular/common';
import { NgModule }      from '@angular/core';
import { SelectModule } from 'ng2-select';
import { MultiSelectComponent }  from './multiSelect.component';

@NgModule({
	imports: [
		CommonModule,
		SelectModule
	],
	declarations: [ MultiSelectComponent ],
	exports: [ MultiSelectComponent ]
})

export class MultiSelectModule { }
