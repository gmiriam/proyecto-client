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
	subjectUrl: string;
	subjectName: string;
	teacherUrl: string;
	teacherName: string;
	downloadUrl: string;
	attachedUrl: string;
	evaluationTestUrl: string;

	constructor(public http: Http, public router: Router, globalsService: GlobalsService, private route: ActivatedRoute) {

		this.route.params.subscribe((params: Params) => {
			this.taskId = params['id'];
		});

		this.taskUrl = globalsService.apiUrl + 'task/';
		this.downloadUrl = globalsService.apiUrl + 'download';
		this.subjectUrl = globalsService.apiUrl + 'subject/';
		this.teacherUrl = globalsService.apiUrl + 'user/';

		this.getTask();
	}

	getTask() {

		this.http.get(this.taskUrl + this.taskId).subscribe(
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

		var subject = this.taskToView.subject;
		if (subject) {
			this.getSubject(subject);
		}
	}

	getTeacher(id) {

		this.http.get(this.teacherUrl + id).subscribe(
			response => {

				var content = response.json().content[0];
				this.teacherName = content.surname + ", " + content.firstName;
			}, error => {

				console.error(error.text());
			});
	}

	getSubject(id) {

		this.http.get(this.subjectUrl + id).subscribe(
			response => {

				var content = response.json().content[0];
				this.subjectName = content.name;
			}, error => {

				console.error(error.text());
			});
	}

	showDeliveries(evt, id) {

		this.router.navigate(['task', id, "deliveries"]);
	}

}
