import {Component, EventEmitter, Output} from '@angular/core';


@Component({
    selector: 'file-upload',
    templateUrl: 'src/app/html/uploader.html'
})

export class UploaderComponent {
  @Output() onUploaded = new EventEmitter<string>();
  uploadFile: any;
  hasBaseDropZoneOver: boolean = false;
  options: Object = {
    url: 'http://localhost:3002/upload',
    data: {
      "fileTarget": "tests"
    }
  };
  sizeLimit = 2000000;

  handleUpload(data): void {
    if (data && data.response) {
      data = JSON.parse(data.response);
      this.uploadFile = data;
      console.log("eeee", data);
      this.onUploaded.emit(data.filename);
    }
  }

  fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  beforeUpload(uploadingFile): void {
    //if (uploadingFile.size > this.sizeLimit) {
      //uploadingFile.setAbort();
      //alert('File is too large');
    //}
  }
}
