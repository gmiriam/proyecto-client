import { NgModule }      from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import {TaskEdition} from './task/edition.component';
import {StudentEdition} from './student/edition.component';
import {TeacherEdition} from './teacher/edition.component';
import {AdminEdition} from './admin/edition.component';
import {SubjectEdition} from './subject/edition.component';
import {DeliveryEdition} from './delivery/edition.component';
import {Scores} from './scores';

import { UploaderModule }  from './uploader.module';
import { CustomSelectModule } from './customSelect.module';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		UploaderModule,
		CustomSelectModule,
		Ng2DatetimePickerModule
	],
	declarations: [
		TaskEdition, StudentEdition, TeacherEdition, AdminEdition, SubjectEdition, DeliveryEdition, Scores
	],
	exports: [ ]
})

export class EditionModule {}
