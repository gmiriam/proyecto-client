import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { AppComponent } from './app.component';

import { EditionModule } from './edition.module';
import { ListModule } from './list.module';

import {Home} from './home';
import {navbarComponent} from './bars/navbar.component';
import {SidebarModule } from 'ng-sidebar';

@NgModule({
	// module dependencies
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes),
		HttpModule,
		SidebarModule,
		EditionModule,
		ListModule
	],
	// components and directives
	declarations: [
		AppComponent,
		Home,
		navbarComponent
	],
	// root component
	bootstrap: [ AppComponent ]
})

export class AppModule { }
