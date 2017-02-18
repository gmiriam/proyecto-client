import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {SubjectView} from './subject/view.component';
import {TaskView} from './task/view.component';
import {DeliveryView} from './delivery/view.component';

@NgModule({
	imports: [
		BrowserModule
	],
	declarations: [
		SubjectView,
		TaskView,
		DeliveryView
	],
	exports: [ ]
})

export class ViewModule {}
