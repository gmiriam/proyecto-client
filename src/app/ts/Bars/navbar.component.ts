import {Component} from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'navbar',
  templateUrl: 'src/app/html/bars/navbar.html'
})
export class navbarComponent {
	userToken;
	userFirstName;
	userSurname;

	constructor(private localStorageService: LocalStorageService) {

		this.userToken = this.localStorageService.get("userToken");
		this.userFirstName = this.localStorageService.get("userFirstName");
		this.userSurname = this.localStorageService.get("userSurname");
	}

	goRoot() {

		window.location.href = '//' + window.location.host;
	}

	logout() {

		this.localStorageService.remove("userId");
		this.localStorageService.remove("userFirstName");
		this.localStorageService.remove("userSurname");
		this.localStorageService.remove("userToken");

		this.goRoot();
	}
}