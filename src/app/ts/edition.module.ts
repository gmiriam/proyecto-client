import { NgModule }      from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import {Tasks} from './tasks';
import {Courses} from './courses';
import {Admins} from './admins';
import {Teachers} from './teachers';
import {Students} from './students';
import {Subjects} from './subjects';
import {Deliveries} from './deliveries';
import {Scores} from './scores';

import { UploaderModule }  from './uploader.module';

@NgModule({
  imports: [
	BrowserModule,
    FormsModule,
  	ReactiveFormsModule,
  	UploaderModule
  ],
  declarations: [
  	Tasks, Courses, Admins, Teachers, Students, Subjects, Deliveries, Scores
  ],
  exports: [ ]
})
export class EditionModule {
	apiUrl: string = 'http://localhost:3000/';
}
