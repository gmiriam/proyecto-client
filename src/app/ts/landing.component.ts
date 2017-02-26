import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import {GlobalsService} from './globals.service';

@Component({
	selector: 'landing',
	templateUrl: 'src/app/html/landing.html'
})

export class LandingComponent {
	getTokenUrl: string;
	clientAuthorization: string;
	grantType: string;

	constructor(public http: Http, private globalsService: GlobalsService,
		private localStorageService: LocalStorageService) {

		this.getTokenUrl = globalsService.apiUrl + 'oauth/token';
		this.clientAuthorization = 'Basic cHJveWVjdG8tY2xpZW50OnRoaXNpc2FzZWNyZXRwYXNzd29yZA';
		this.grantType = 'password';
	}

	login(event, username, password) {

		event.preventDefault();

		let grant_type = this.grantType,
			body = JSON.parse(JSON.stringify({ grant_type, username, password })),
			bodyEncoded = Object.keys(body).map(function(k) {

				return encodeURIComponent(k) + '=' + encodeURIComponent(body[k]);
			}).join('&'),
			headers = new Headers();

		headers.append('Authorization', this.clientAuthorization);
		headers.append('Content-Type', 'application/x-www-form-urlencoded');

		this.http.post(this.getTokenUrl, bodyEncoded, { headers: headers }).subscribe(
			(function(username, response) {

				this.localStorageService.set("userToken", response.json().access_token);

				this.globalsService.request('get', this.globalsService.apiUrl + 'user?email=' + username).subscribe(
					response => {
						var content = response.json().content,
							user = content[0];

						this.localStorageService.set("userFirstName", user.firstName);
						this.localStorageService.set("userSurname", user.surname);
						this.localStorageService.set("userId", user._id);

						window.location.href = '//' + window.location.host;
					});
			}).bind(this, username),
			error => {
				console.error(error.text());
				alert(error.text());
			});
	}
}
