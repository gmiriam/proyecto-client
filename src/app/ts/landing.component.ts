import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import {GlobalsService} from './globals.service';

@Component({
	selector: 'landing',
	templateUrl: 'src/app/html/landing.html'
})

export class LandingComponent {

	constructor(public http: Http, globalsService: GlobalsService,
		private localStorageService: LocalStorageService) {

		this.getTokenUrl = globalsService.apiUrl + 'oauth/token';
		this.clientAuthorization = 'Basic cHJveWVjdG8tY2xpZW50OnRoaXNpc2FzZWNyZXRwYXNzd29yZA';
	}

	login(event, username, password) {

		event.preventDefault();

		let grant_type = 'password',
			body = JSON.parse(JSON.stringify({ grant_type, username, password })),
			bodyEncoded = Object.keys(body).map(function(k) {

				return encodeURIComponent(k) + '=' + encodeURIComponent(body[k])
			}).join('&'),
			headers = new Headers();

		headers.append('Authorization', this.clientAuthorization);
		headers.append('Content-Type', 'application/x-www-form-urlencoded');

		this.http.post(this.getTokenUrl, bodyEncoded, { headers: headers }).subscribe(
			response => {
				this.localStorageService.set("userToken", response.json().access_token);
				window.location.href = '//' + window.location.host;
			},
			error => {
				console.error(error.text());
			});
	}
}
