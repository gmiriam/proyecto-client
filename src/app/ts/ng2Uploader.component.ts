import {Component, NgZone} from '@angular/core';
import {UPLOAD_DIRECTIVES} from 'ng2-uploader';
import {bootstrap} from '@angular/platform-browser-dynamic'

@Component({
    selector: 'ng2-uploader',
    templateUrl: 'src/app/html/ng2Uploader.html',
    directives: [UPLOAD_DIRECTIVES],
})

export class ng2UploaderComponent {
    uploadFile: any;
    options: Object = {
        url: 'http://localhost:8000/php/angular2uploads/upload.php'
    };

    handleUpload(data): void {
        console.log(data);
        if (data && data.response) {
            data = JSON.parse(data.response);
            this.uploadFile = data;
        }
    }
}
bootstrap(ng2UploaderComponent);