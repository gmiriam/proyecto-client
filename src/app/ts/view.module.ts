import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {SubjectView} from './subject/view.component';
import {TaskView} from './task/view.component';
import {DeliveryView} from './delivery/view.component';
import {AdminView} from './admin/view.component';
import {TeacherView} from './teacher/view.component';
import {StudentView} from './student/view.component';

@NgModule({
	imports: [
		BrowserModule
	],
	declarations: [
		SubjectView,
		TaskView,
		DeliveryView,
		AdminView,
		TeacherView,
		StudentView
	],
	exports: [ ]
})

export class ViewModule {}
