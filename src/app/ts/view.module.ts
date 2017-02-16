import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {TaskView} from './task/view.component';
import {DeliveryView} from './delivery/view.component';

@NgModule({
	imports: [
		BrowserModule
	],
	declarations: [
		TaskView,
		DeliveryView
	],
	exports: [ ]
})

export class ViewModule {}
