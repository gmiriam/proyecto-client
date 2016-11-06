import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import
       { UploaderComponent }  from './uploader.component';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ UploaderComponent ],
  bootstrap:    [ UploaderComponent ]
})
export class UploaderModule { }
