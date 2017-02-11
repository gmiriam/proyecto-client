import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {TaskView} from './task/view.component';

@NgModule({
	imports: [
		BrowserModule
	],
	declarations: [
		TaskView
	],
	exports: [ ]
})

export class ViewModule {}
