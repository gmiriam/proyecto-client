import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
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
	scoreUrl: string;
	teachersName: Array<any>;
	downloadUrl: string;
	temaryUrl: string;
	userIsTeacherInSubject;
	studentScore;

	constructor(public router: Router, private globalsService: GlobalsService, private route: ActivatedRoute,
		private localStorageService: LocalStorageService) {

		this.route.params.subscribe((params: Params) => {
			this.params = params;
		});
		this.subjectId = this.params['subjectid'];

		this.subjectUrl = globalsService.apiUrl + 'subject/';
		this.downloadUrl = globalsService.apiUrl + 'download';
		this.teacherUrl = globalsService.apiUrl + 'user?role=teacher';
		this.scoreUrl = globalsService.apiUrl + 'score';

		this.getSubject();
		this.getScore();
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
			this.temaryUrl = this.downloadUrl + "?path=temaries&name=" + temary +
				'&access_token=' + this.localStorageService.get('userToken');
		}

		var teachers = this.subjectToView.teachers;
		if (teachers) {
			this.getTeachers();
			var userId = this.localStorageService.get('userId');
			this.userIsTeacherInSubject = teachers.indexOf(userId) !== -1;
		}
	}

	getScore() {

		var userId = this.localStorageService.get('userId'),
			scoreUrl = this.scoreUrl + '?subjectid=' + this.subjectId + '&studentid=' + userId;

		this.globalsService.request('get', scoreUrl, {
			urlParams: this.params
		}).subscribe(
			response => {

				var content = response.json().content;

				if (content.length) {
					this.studentScore = content[0].finalScore;
				}
			}, error => {

				console.error(error.text());
			});
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
					if (this.subjectToView.teachers.indexOf(teacher._id) !== -1) {
						this.teachersName.push(teacher.surname + ", " + teacher.firstName);
					}
				}
			}, error => {

				console.error(error.text());
			});
	}

	editItem(evt, id) {

		this.router.navigate(["edit"], { relativeTo: this.route });
	}

	deleteItem(evt, id) {

		var confirmed = window.confirm("Está seguro?");

		if (!confirmed) {
			return;
		}

		this.globalsService.request('delete', this.subjectUrl + id, {
			urlParams: this.params
		}).subscribe(
			response => {
				this.router.navigate(['subject']);
			},
			error => {
				console.error(error.text());
			});
	}

	showTasks(evt, id) {

		this.router.navigate(["task"], { relativeTo: this.route });
	}

	showScores(evt, id) {

		this.router.navigate(["score"], { relativeTo: this.route });
	}

	enrollStudents(evt, id) {

		this.router.navigate(["enroll"], { relativeTo: this.route });
	}
}
