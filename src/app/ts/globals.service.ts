import { Injectable }      from '@angular/core';
import { Http, Headers } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class GlobalsService {

	apiUrl: string = 'http://localhost:3002/';

	constructor(private http: Http, private localStorageService: LocalStorageService) {}

	request(method, url, options?) {

		var headers = options ? options.headers : null,
			body = options ? options.body : null,
			token = this.localStorageService.get("userToken");

		if (!headers) {
			headers = new Headers();
		}

		if (body) {
			headers.append('Content-Type', 'application/json');
		}

		headers.append('Authorization', 'Bearer ' + token);

		var httpOptions = {
				headers: headers
			},
			promise;

		if (method === 'get' || method === 'delete') {
			promise = this.http[method](url, httpOptions);
		} else {
			promise = this.http[method](url, body, httpOptions);
		}

		return promise;
	}

}
