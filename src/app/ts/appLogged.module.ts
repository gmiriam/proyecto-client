import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppLoggedRoutingModule } from './appLoggedRouting.module';
import { EditionModule } from './edition.module';
import { ListModule } from './list.module';
import { ViewModule } from './view.module';

import { AppLoggedComponent } from './appLogged.component';
import { Home } from './home.component';
import { SidebarModule } from 'ng-sidebar';

@NgModule({
	// module dependencies
	imports: [
		BrowserModule,
		HttpModule,
		AppLoggedRoutingModule,
		SidebarModule,
		EditionModule,
		ListModule,
		ViewModule
	],
	// components and directives
	declarations: [
		AppLoggedComponent,
		Home
	],
	exports: [
		AppLoggedComponent
	],
	// root component
	bootstrap: [ AppLoggedComponent ]
})

export class AppLoggedModule { }
