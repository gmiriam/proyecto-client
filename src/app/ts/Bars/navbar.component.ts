import {Component, Input} from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: 'src/app/html/bars/navbar.html'
})
export class navbarComponent {

	goRoot() {

		console.log("entra", window.location.host)
		window.location.href = '//' + window.location.host;
	}
}