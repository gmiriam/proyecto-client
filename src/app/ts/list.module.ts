import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {TaskList} from './task/list.component';
import {StudentList} from './student/list.component';
import {TeacherList} from './teacher/list.component';
import {AdminList} from './admin/list.component';
import {SubjectList} from './subject/list.component';

@NgModule({
	imports: [
		BrowserModule
	],
	declarations: [
		TaskList,
		StudentList,
		TeacherList,
		AdminList,
		SubjectList
	],
	exports: [ ]
})

export class ListModule {}
