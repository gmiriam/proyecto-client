import { Component } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import {GlobalsService} from './globals.service';

@Component({
	selector: 'app',
	templateUrl: 'src/app/html/app.html',
	providers: [GlobalsService]
})

export class AppComponent {

	isLogged: Boolean;

	constructor(private localStorageService: LocalStorageService) {

		this.isLogged = !!this.localStorageService.get("userToken");
	}
}
