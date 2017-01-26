import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {TaskList} from './task/taskList.component';

@NgModule({
	imports: [
		BrowserModule
	],
	declarations: [
		TaskList
	],
	exports: [ ]
})

export class ListModule {}
