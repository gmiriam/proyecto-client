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
	userRole;

	constructor(private localStorageService: LocalStorageService) {

		this.userToken = this.localStorageService.get("userToken");
		this.userFirstName = this.localStorageService.get("userFirstName");
		this.userSurname = this.localStorageService.get("userSurname");
		this.userRole = this.localStorageService.get("userRole");
	}

	goRoot() {

		window.location.href = '//' + window.location.host;
	}

	logout() {

		this.localStorageService.remove("userId");
		this.localStorageService.remove("userFirstName");
		this.localStorageService.remove("userSurname");
		this.localStorageService.remove("userToken");
		this.localStorageService.remove("userRole");

		this.goRoot();
	}
}