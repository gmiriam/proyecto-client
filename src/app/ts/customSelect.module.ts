import { CommonModule }   from '@angular/common';
import { NgModule }      from '@angular/core';
import { SelectModule } from 'ng2-select';
import { SingleSelectComponent }  from './singleSelect.component';
import { MultiSelectComponent }  from './multiSelect.component';

@NgModule({
	imports: [
		CommonModule,
		SelectModule
	],
	declarations: [ SingleSelectComponent, MultiSelectComponent ],
	exports: [ SingleSelectComponent, MultiSelectComponent ]
})

export class CustomSelectModule { }
