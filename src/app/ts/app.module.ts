import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { AppComponent }  from './app.component';
import {Home} from './home';

@NgModule({
  // module dependencies
  imports: [
  	BrowserModule,
  	RouterModule.forRoot(routes),
  	FormsModule,
  	HttpModule
  ],
  // components and directives
  declarations: [
  	AppComponent,
  	Home
  ],
  // root component
  bootstrap: [ AppComponent ]
})

export class AppModule { }
