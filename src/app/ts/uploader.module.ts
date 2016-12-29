import { CommonModule }   from '@angular/common';
import { NgModule }      from '@angular/core';
import { Ng2UploaderModule } from 'ng2-uploader';
import { UploaderComponent }  from './uploader.component';

@NgModule({
  imports: [
	CommonModule,
  	Ng2UploaderModule
  ],
  declarations: [ UploaderComponent ],
  exports: [ UploaderComponent ],
  bootstrap:    [  ]
})
export class UploaderModule { }
