import {Component} from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
    selector: 'file-upload',
    templateUrl: 'src/app/html/uploader.html'
})

export class UploaderComponent {
  public uploader:FileUploader = new FileUploader({
    url: 'http://localhost:3002/upload'
  });
}
