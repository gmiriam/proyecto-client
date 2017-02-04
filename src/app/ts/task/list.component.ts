import { Component } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import {GlobalsService} from '../globals.service';
import {Task} from './task';

@Component({
	selector: 'taskList',
	templateUrl: 'src/app/html/task/list.html',
	providers: [GlobalsService]
})

export class TaskList {
	taskList: Task[];
	taskUrl: string;

	constructor(public http: Http, public router: Router, globalsService: GlobalsService) {

		this.taskUrl = globalsService.apiUrl + 'task';
		this.getTasks();
	}

	getTasks() {

		var url = this.taskUrl;// + '?subjectid=1235';

		this.http.get(url).subscribe(
			response => {
				var content = response.json().content;
				this.taskList = content;
			},
			error => {
				console.error(error.text());
			});
	}

	addItem(evt) {
		this.router.navigate(['task', "new"]);
	}

	editItem(evt, id) {
		this.router.navigate(['task', id]);
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
