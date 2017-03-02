import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
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
	subjectUrl: string;
	taskUrl: string;
	userIsTeacherInSubject;

	constructor(public router: Router, private route: ActivatedRoute, private globalsService: GlobalsService,
		private localStorageService: LocalStorageService) {

		this.route.params.subscribe((params: Params) => {
			this.params = params;
		});
		this.subjectId = this.params['subjectid'];

		this.subjectUrl = globalsService.apiUrl + 'subject/';
		this.taskUrl = globalsService.apiUrl + 'task';

		this.getSubject();
	}

	getSubject() {

		this.globalsService.request('get', this.subjectUrl + this.subjectId, {
			urlParams: this.params
		}).subscribe(
			(this.onSubjectResponse).bind(this),
			error => {

				console.error(error.text());
			});
	}

	onSubjectResponse(response) {

		var content = response.json().content,
			subject = content[0] ? content[0] : { _id: null };

		var teachers = subject.teachers,
			userId = this.localStorageService.get('userId'),
			userRole = this.localStorageService.get('userRole'),
			userQuery = '';

		if (teachers) {
			this.userIsTeacherInSubject = teachers.indexOf(userId) !== -1;
		}

		if (userRole !== "admin" && (teachers && teachers.indexOf(userId) === -1)) {
			userQuery += '&userid=' + userId;
		}

		this.getTasks(userQuery);
	}

	getTasks(userQuery?) {

		var url = this.taskUrl + '?subjectid=' + this.subjectId;

		if (userQuery) {
			url += userQuery;
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

		this.router.navigate([id], { relativeTo: this.route });
	}

	addItem(evt) {

		this.router.navigate(['new', 'edit'], { relativeTo: this.route });
	}
}
