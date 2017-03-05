import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocalStorageModule } from 'angular-2-local-storage';

import { AppLoggedModule } from './appLogged.module';
import { AppUnloggedModule } from './appUnlogged.module';

import { AppComponent } from './app.component';
import { navbarComponent } from './navbar.component';

@NgModule({
	// module dependencies
	imports: [
		BrowserModule,
		LocalStorageModule.withConfig({
			prefix: 'client',
			storageType: 'localStorage'
		}),

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
