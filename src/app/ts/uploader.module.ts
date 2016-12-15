import { NgModule }      from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';
import { UploaderComponent }  from './uploader.component';

@NgModule({
  imports: [
  	FileUploadModule
  ],
  declarations: [ UploaderComponent ],
  exports: [ UploaderComponent ],
  bootstrap:    [  ]
})
export class UploaderModule { }
