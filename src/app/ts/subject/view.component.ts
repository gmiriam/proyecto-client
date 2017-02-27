import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {GlobalsService} from '../globals.service';
import {Subject} from './subject';

@Component({
	selector: 'subjectView',
	templateUrl: 'src/app/html/subject/view.html'
})

export class SubjectView {
	params;
	subjectId: string;
	subjectToView: Subject = new Subject();
	subjectUrl: string;
	teacherUrl: string;
	teachersName: Array<any>;
	downloadUrl: string;
	temaryUrl: string;

	constructor(public router: Router, private globalsService: GlobalsService, private route: ActivatedRoute) {

		this.route.params.subscribe((params: Params) => {
			this.params = params;
		});
		this.subjectId = this.params['subjectid'];

		this.subjectUrl = globalsService.apiUrl + 'subject/';
		this.downloadUrl = globalsService.apiUrl + 'download';
		this.teacherUrl = globalsService.apiUrl + 'user?role=teacher';

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

		this.globalsService.request('get', this.teacherUrl, {
			urlParams: this.params
		}).subscribe(
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
