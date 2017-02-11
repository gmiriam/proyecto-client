import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { LandingComponent } from './landing.component';

@NgModule({
	// module dependencies
	imports: [
		BrowserModule,
		HttpModule
	],
	// components and directives
	declarations: [
		LandingComponent
	],
	exports: [
		LandingComponent
	],
	// root component
	bootstrap: [ LandingComponent ]
})

export class AppUnloggedModule { }
