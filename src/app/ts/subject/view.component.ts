import { Component } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {GlobalsService} from '../globals.service';
import {Subject} from './subject';

@Component({
	selector: 'subjectView',
	templateUrl: 'src/app/html/subject/view.html'
})

export class SubjectView {
	subjectId: string;
	subjectToView: Subject = new Subject();
	subjectUrl: string;
	teacherUrl: string;
	teachersName: Array<any>;
	downloadUrl: string;
	temaryUrl: string;

	constructor(public http: Http, public router: Router, globalsService: GlobalsService, private route: ActivatedRoute) {

		this.route.params.subscribe((params: Params) => {
			this.subjectId = params['id'];
		});

		this.subjectUrl = globalsService.apiUrl + 'subject/';
		this.downloadUrl = globalsService.apiUrl + 'download';
		this.teacherUrl = globalsService.apiUrl + 'user?role=teacher';

		this.getSubject();
	}

	getSubject() {

		this.http.get(this.subjectUrl + this.subjectId).subscribe(
			(this.onSubjectResponse).bind(this),
			error => {

				console.error(error.text());
			});
	}

	onSubjectResponse(response) {

		var content = response.json().content;
		this.subjectToView = content[0] ? content[0] : { _id: null };

		var temary = this.subjectToView.temary;
		if (temary) {
			this.temaryUrl = this.downloadUrl + "?path=temaries&name=" + temary;
		}

		var teachers = this.subjectToView.teachers;
		if (teachers) {
			this.getTeachers();
		}
	}

	getTeachers() {

		this.http.get(this.teacherUrl).subscribe(
			response => {

				var content = response.json().content;

				this.teachersName = [];
				for (var i = 0; i < content.length; i++) {
					var teacher = content[i];
					this.teachersName.push(teacher.surname + ", " + teacher.firstName);
				}
			}, error => {

				console.error(error.text());
			});
	}

	showTasks(evt, id) {

		this.router.navigate(['subject', id, "tasks"]);
	}

	enrollStudents(evt, id) {

		this.router.navigate(['subject', id, "enroll"]);
	}
}
