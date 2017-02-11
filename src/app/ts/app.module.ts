import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppLoggedModule } from './appLogged.module';
import { AppUnloggedModule } from './appUnlogged.module';

import { AppComponent } from './app.component';
import { navbarComponent } from './bars/navbar.component';

@NgModule({
	// module dependencies
	imports: [
		BrowserModule,
		AppUnloggedModule,
		AppLoggedModule
	],
	// components and directives
	declarations: [
		AppComponent,
		navbarComponent
	],
	// root component
	bootstrap: [ AppComponent ]
})

export class AppModule { }
