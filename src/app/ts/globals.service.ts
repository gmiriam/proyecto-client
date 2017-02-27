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
			urlParams = options ? options.urlParams : null,
			token = this.localStorageService.get('userToken'),
			userId = this.localStorageService.get('userId');

		if (!headers) {
			headers = new Headers();
		}

		if (body) {
			headers.append('Content-Type', 'application/json');
		}

		if (urlParams) {
			var subjectId = urlParams.subjectid,
				taskId = urlParams.taskid;

			subjectId && headers.append('SubjectId', subjectId);
			taskId && headers.append('TaskId', taskId);
		}

		headers.append('Authorization', 'Bearer ' + token);
		headers.append('UserId', userId);

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
