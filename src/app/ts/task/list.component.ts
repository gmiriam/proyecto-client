import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
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

	constructor(public router: Router, private route: ActivatedRoute, private globalsService: GlobalsService) {

		this.route.params.subscribe((params: Params) => {
			this.subjectId = params['id'];
		});

		this.taskUrl = globalsService.apiUrl + 'task';
		this.getTasks();
	}

	getTasks() {

		var url = this.taskUrl;

		if (this.subjectId) {
			url += '?subjectid=' + this.subjectId;
		}

		this.globalsService.request('get', url).subscribe(
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

		this.globalsService.request('delete', this.taskUrl + '/' + id).subscribe(
			response => {
				console.log("borrado", id);
				this.getTasks();
			},
			error => {
				console.error(error.text());
			});
	}
}
