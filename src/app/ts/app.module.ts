import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { AppComponent }  from './app.component';

import {Home} from './home';
import {Tasks} from './tasks';
import {Courses} from './courses';
import {Admins} from './admins';
import {Teachers} from './teachers';
import {Students} from './students';
import {Subjects} from './subjects';
import {Deliveries} from './deliveries';
import {Scores} from './scores';

@NgModule({
  // module dependencies
  imports: [
  	BrowserModule,
  	RouterModule.forRoot(routes),
    FormsModule,
  	ReactiveFormsModule,
  	HttpModule
  ],
  // components and directives
  declarations: [
  	AppComponent,
  	Home, Tasks, Courses, Admins, Teachers, Students, Subjects, Deliveries, Scores
  ],
  // root component
  bootstrap: [ AppComponent ]
})

export class AppModule { }
