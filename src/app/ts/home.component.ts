import { Component } from '@angular/core';

@Component({
	selector: 'home',
	templateUrl: 'src/app/html/home.html'
})

export class Home {
	accessToken: string;

	constructor() {

		this.accessToken = localStorage.getItem('accessToken');
	}

	logout() {

		localStorage.removeItem('accessToken');
	}
}
