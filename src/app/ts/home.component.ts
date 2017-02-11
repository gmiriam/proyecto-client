import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';


@Component({
	selector: 'home',
	templateUrl: 'src/app/html/home.html'
})

export class Home {
	accessToken: string;
	response: string;
	api: string;

	constructor(public router: Router, public http: Http) {

		this.accessToken = localStorage.getItem('accessToken');
	}

	logout() {

		localStorage.removeItem('accessToken');
	}

	_callApi(type, url) {

		let headers = new Headers();
		headers.append('Authorization', 'Bearer ' + this.accessToken);

		this.http.get(url, { headers: headers }).subscribe(
			response => this.response = response.text(),
			error => this.response = error.text()
		);
	}
}
