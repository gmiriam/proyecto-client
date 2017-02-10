import { NgModule }      from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import {TaskEdition} from './task/edition.component';
import {StudentEdition} from './student/edition.component';
import {TeacherEdition} from './teacher/edition.component';
import {AdminEdition} from './admin/edition.component';
import {SubjectEdition} from './subject/edition.component';
import {Deliveries} from './deliveries';
import {Scores} from './scores';

import { UploaderModule }  from './uploader.module';
import { CustomSelectModule } from './customSelect.module';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		UploaderModule,
		CustomSelectModule
	],
	declarations: [
		TaskEdition, StudentEdition, TeacherEdition, AdminEdition, SubjectEdition, Deliveries, Scores
	],
	exports: [ ]
})

export class EditionModule {}
