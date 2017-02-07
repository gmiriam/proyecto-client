import { NgModule }      from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import {TaskEdition} from './task/edition.component';
import {StudentEdition} from './student/edition.component';
import {Admins} from './admins';
import {Teachers} from './teachers';
import {Subjects} from './subjects';
import {Deliveries} from './deliveries';
import {Scores} from './scores';

import { UploaderModule }  from './uploader.module';
import { MultiSelectModule } from './multiSelect.module';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		UploaderModule,
		MultiSelectModule
	],
	declarations: [
		TaskEdition, StudentEdition, Admins, Teachers, Subjects, Deliveries, Scores
	],
	exports: [ ]
})

export class EditionModule {}
