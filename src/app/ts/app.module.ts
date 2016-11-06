import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {APP_ROUTER_PROVIDER} from './app.routes';
import { AppComponent }  from './app.component';

@NgModule({
  imports: [ BrowserModule, APP_ROUTER_PROVIDER, FormsModule, HttpModule ],       // module dependencies
  declarations: [ AppComponent ],   // components and directives
  bootstrap: [ AppComponent ],     // root component
  providers: []                    // services
})

export class AppModule { }
