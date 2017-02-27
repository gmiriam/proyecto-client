import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {GlobalsService} from '../globals.service';
import {Task} from './task';

@Component({
	selector: 'taskList',
	templateUrl: 'src/app/html/task/list.html'
})

export class TaskList {
	params;
	subjectId: string;
	taskList: Task[];
	taskUrl: string;

	constructor(public router: Router, private route: ActivatedRoute, private globalsService: GlobalsService) {

		this.route.params.subscribe((params: Params) => {
			this.params = params;
		});
		this.subjectId = this.params['subjectid'];

		this.taskUrl = globalsService.apiUrl + 'task';
		this.getTasks();
	}

	getTasks() {

		var url = this.taskUrl;

		if (this.subjectId) {
			url += '?subjectid=' + this.subjectId;
		}

		this.globalsService.request('get', url, {
			urlParams: this.params
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

		this.router.navigate(['subject', this.subjectId, 'task', id]);
	}

	addItem(evt) {

		this.router.navigate(['subject', this.subjectId, 'task', "new", "edit"]);
	}

	editItem(evt, id) {

		this.router.navigate(['subject', this.subjectId, 'task', id, "edit"]);
	}

	deleteItem(evt, id) {

		var confirmed = window.confirm("Está seguro?");

		if (!confirmed) {
			return;
		}

		this.globalsService.request('delete', this.taskUrl + '/' + id, {
			urlParams: this.params
		}).subscribe(
			response => {
				console.log("borrado", id);
				this.getTasks();
			},
			error => {
				console.error(error.text());
			});
	}
}
