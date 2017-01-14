import {Component, EventEmitter, Output, Input} from '@angular/core';


@Component({
    selector: 'file-upload',
    templateUrl: 'src/app/html/uploader.html'
})

export class UploaderComponent {
  @Output() onUploaded = new EventEmitter<string>();
  @Input() fileTarget;
  uploadFile: any;
  hasBaseDropZoneOver: boolean = false;
  options: Object;
  sizeLimit = 2000000;

  ngOnInit() {
    this.options = {
      url: 'http://localhost:3002/upload',
      data: {
        "fileTarget": this.fileTarget
      }
    };
  }

  handleUpload(data): void {
    if (data && data.response) {
      data = JSON.parse(data.response);
      this.uploadFile = data;
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
