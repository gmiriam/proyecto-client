import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {TaskList} from './task/list.component';
import {StudentList} from './student/list.component';

@NgModule({
	imports: [
		BrowserModule
	],
	declarations: [
		TaskList,
		StudentList
	],
	exports: [ ]
})

export class ListModule {}
