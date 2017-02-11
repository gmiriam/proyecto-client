import { Component } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {GlobalsService} from '../globals.service';
import {Task} from './task';

@Component({
	selector: 'taskView',
	templateUrl: 'src/app/html/task/view.html',
	providers: [GlobalsService]
})

export class TaskView {
	taskId: string;
	taskToView: Task = new Task();
	taskUrl: string;

	constructor(public http: Http, globalsService: GlobalsService, private route: ActivatedRoute) {

		this.route.params.subscribe((params: Params) => {
			this.taskId = params['id'];
		});

		this.taskUrl = globalsService.apiUrl + 'task/';

		this.getTask();
	}

	getTask() {

		if (this.taskId === "new") {
			return;
		}

		this.http.get(this.taskUrl + this.taskId).subscribe(response => {

			var content = response.json().content;
			this.taskToView = content[0] ? content[0] : { _id: null };
		}, error => {

			console.error(error.text());
		});
	}

}
