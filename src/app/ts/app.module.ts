import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { AppComponent }  from './app.component';

import { EditionModule }  from './edition.module';
import { ListModule }  from './list.module';

import {Home} from './home';
import {navbarComponent} from './Bars/navbar.component';
//import {SideBarComponent} from './Bars/sidebar.component';

@NgModule({
  // module dependencies
  imports: [
  	BrowserModule,
  	RouterModule.forRoot(routes),
  	HttpModule,
    EditionModule,
    ListModule
  ],
  // components and directives
  declarations: [
    AppComponent,
  	Home,
    navbarComponent,
 //   SideBarComponent,
  ],
  // root component
  bootstrap: [ AppComponent ]
})

export class AppModule { }
