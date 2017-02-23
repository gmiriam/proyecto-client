import { Component } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import {GlobalsService} from '../globals.service';
import {Task} from './task';

@Component({
	selector: 'taskList',
	templateUrl: 'src/app/html/task/list.html'
})

export class TaskList {
	taskList: Task[];
	taskUrl: string;
	subjectId: string;
	userToken;

	constructor(public http: Http, public router: Router, globalsService: GlobalsService,
		private route: ActivatedRoute, private localStorageService: LocalStorageService) {

		this.route.params.subscribe((params: Params) => {
			this.subjectId = params['id'];
		});

		this.userToken = this.localStorageService.get("userToken");
		this.taskUrl = globalsService.apiUrl + 'task';
		this.getTasks();
	}

	getTasks() {

		var url = this.taskUrl;

		if (this.subjectId) {
			url += '?subjectid=' + this.subjectId;
		}

		let headers = new Headers();
		headers.append('Authorization', 'Bearer ' + this.userToken);

		this.http.get(url, {
			headers: headers
		}).subscribe(
			response => {
				var content = response.json().content;
				this.taskList = content;
			},
			error => {
				console.error(error.text());
			});
	}

	viewItem(evt, id) {

		this.router.navigate(['task', id]);
	}

	addItem(evt) {

		this.router.navigate(['task', "new", "edit"]);
	}

	editItem(evt, id) {

		this.router.navigate(['task', id, "edit"]);
	}

	deleteItem(evt, id) {

		var confirmed = window.confirm("Está seguro?");

		if (!confirmed) {
			return;
		}

		this.http.delete(this.taskUrl + '/' + id).subscribe(
			response => {
				console.log("borrado", id);
				this.getTasks();
			},
			error => {
				console.error(error.text());
			});
	}
}
