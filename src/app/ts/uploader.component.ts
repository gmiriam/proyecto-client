import {Component, EventEmitter, Output, Input} from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import {GlobalsService} from './globals.service';

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
	message = "Subir fichero";

	constructor(private globalsService: GlobalsService, private localStorageService: LocalStorageService) {}

	ngOnInit() {

		this.options = {
			url: this.globalsService.apiUrl + 'upload',
			authToken: this.localStorageService.get("userToken"),
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
			this.message="Fichero subido con éxito"
		}
	}

	fileOverBase(e:any):void {

		this.hasBaseDropZoneOver = e;
		this.message="Suelte para subir"
	}

	beforeUpload(uploadingFile): void {

		//if (uploadingFile.size > this.sizeLimit) {
			//uploadingFile.setAbort();
			//alert('File is too large');
		//}
	}
}
