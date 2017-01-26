import { NgModule }      from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import {TaskEdition} from './task/taskEdition.component';
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
  	TaskEdition, Admins, Teachers, Students, Subjects, Deliveries, Scores
  ],
  exports: [ ]
})

export class EditionModule {}
