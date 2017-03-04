import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import {GlobalsService} from '../globals.service';
import {Task} from './task';

@Component({
	selector: 'taskView',
	templateUrl: 'src/app/html/task/view.html'
})

export class TaskView {
	params;
	subjectId: string;
	taskId: string;
	taskToView: Task = new Task();
	taskUrl: string;
	subjectUrl: string;
	subjectName: string;
	teacherUrl: string;
	teacherName: string;
	downloadUrl: string;
	attachedUrl: string;
	evaluationTestUrl: string;
	userIsTeacherInSubject;

	constructor(public router: Router, private globalsService: GlobalsService, private route: ActivatedRoute,
		private localStorageService: LocalStorageService) {

		this.route.params.subscribe((params: Params) => {
			this.params = params;
		});
		this.subjectId = this.params['subjectid'];
		this.taskId = this.params['taskid'];

		this.subjectUrl = globalsService.apiUrl + 'subject/';
		this.taskUrl = globalsService.apiUrl + 'task/';
		this.downloadUrl = globalsService.apiUrl + 'download';
		this.teacherUrl = globalsService.apiUrl + 'user/';

		this.getSubject();
		this.getTask();
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
			subject = content[0];

		this.subjectName = subject.name;

		var teachers = subject.teachers;
		if (teachers) {
			var userId = this.localStorageService.get('userId');
			this.userIsTeacherInSubject = teachers.indexOf(userId) !== -1;
		}
	}

	getTask() {

		this.globalsService.request('get', this.taskUrl + this.taskId, {
			urlParams: this.params
		}).subscribe(
			(this.onTaskResponse).bind(this),
			error => {

				console.error(error.text());
			});
	}

	onTaskResponse(response) {

		var content = response.json().content;
		this.taskToView = content[0] ? content[0] : { _id: null };

		var attached = this.taskToView.attached;
		if (attached) {
			this.attachedUrl = this.downloadUrl + "?path=attachments&name=" + attached;
		}

		var evaluationTest = this.taskToView.evaluationTest;
		if (evaluationTest) {
			this.evaluationTestUrl = this.downloadUrl + "?path=tests&name=" + evaluationTest;
		}

		var teacher = this.taskToView.teacher;
		if (teacher) {
			this.getTeacher(teacher);
		}
	}

	getTeacher(id) {

		this.globalsService.request('get', this.teacherUrl + id, {
			urlParams: this.params
		}).subscribe(
			response => {

				var content = response.json().content[0];
				this.teacherName = content.surname + ", " + content.firstName;
			}, error => {

				console.error(error.text());
			});
	}

	editItem(evt, id) {

		this.router.navigate(['edit'], { relativeTo: this.route });
	}

	deleteItem(evt, id) {

		var confirmed = window.confirm("Está a punto de eliminar esta tarea, ¿está seguro?");

		if (!confirmed) {
			return;
		}

		this.globalsService.request('delete', this.taskUrl + id, {
			urlParams: this.params
		}).subscribe(
			response => {
				this.router.navigate(['subject', this.subjectId, 'task']);
			},
			error => {
				console.error(error.text());
			});
	}

	showDeliveries(evt, id) {

		this.router.navigate(['delivery'], { relativeTo: this.route });
	}

	assignTask(evt, id) {

		this.router.navigate(['assign'], { relativeTo: this.route });
	}
}
