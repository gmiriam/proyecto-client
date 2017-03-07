import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import {GlobalsService} from '../globals.service';
import {Score} from './score';

@Component({
	selector: 'scoreList',
	templateUrl: 'src/app/html/score/list.html'
})

export class ScoreList {
	params;
	subjectId: string;
	studentId;
	scoreList: Score[];
	subjectUrl: string;
	studentUrl: string;
	scoreUrl: string;
	userIsTeacherInSubject;
	subjectName;
	studentNamesById;

	constructor(public router: Router, private globalsService: GlobalsService, private route: ActivatedRoute,
		private localStorageService: LocalStorageService) {

		this.route.params.subscribe((params: Params) => {
			this.params = params;
		});
		this.subjectId = this.params['subjectid'];

		this.subjectUrl = globalsService.apiUrl + 'subject/';
		this.scoreUrl = globalsService.apiUrl + 'score';
		this.studentUrl = globalsService.apiUrl + 'user?role=student';

		this.getSubject();
	}

	getSubject() {

		this.globalsService.request('get', this.subjectUrl + this.subjectId, {
			urlParams: this.params
		}).subscribe(
			(this.onSubjectResponse).bind(this),
			error => {

				this.globalsService.showError(error);
			});
	}

	onSubjectResponse(response) {

		var content = response.json().content,
			subject = content[0] ? content[0] : { _id: null },
			teachers = subject.teachers,
			userId = this.localStorageService.get('userId'),
			userRole = this.localStorageService.get('userRole'),
			userQuery = '';

		this.subjectName = subject.name;

		if (teachers) {
			this.userIsTeacherInSubject = teachers.indexOf(userId) !== -1;
		}

		if (userRole !== "admin" && (teachers && teachers.indexOf(userId) === -1)) {
			userQuery += '&studentid=' + userId;
		}

		this.getScores(userQuery);
	}

	getScores(userQuery?) {

		var url = this.scoreUrl + '?subjectid=' + this.subjectId;

		if (userQuery) {
			url += userQuery;
		}

		this.globalsService.request('get', url, {
			urlParams: this.params
		}).subscribe(
			response => {
				var content = response.json().content;
				this.scoreList = content;

				var studentIds = this.scoreList.map(function(value) {
					return value.student;
				});
				this.studentNamesById = {};
				for (let i = 0; i < studentIds.length; i++) {
					let id = studentIds[i];
					this.studentNamesById[id] = true;
				}
				this.getStudents();
			},
			error => {
				this.globalsService.showError(error);
			});
	}

	getStudents() {

		this.globalsService.request('get', this.studentUrl, {
			urlParams: this.params
		}).subscribe(
			response => {

				var students = response.json().content;

				for (var i = 0; i < students.length; i++) {
					var student = students[i];

					if (this.studentNamesById[student._id]) {
						this.studentNamesById[student._id] = student.surname + ', ' + student.firstName;
					}
				}
			}, error => {

				this.globalsService.showError(error);
			});
	}

	viewItem(evt, id) {

		this.router.navigate([id], { relativeTo: this.route });
	}

	editItem(evt, id) {

		this.router.navigate([id, 'edit'], { relativeTo: this.route });
	}

	goBack(evt) {

		this.router.navigate(['subject', this.subjectId]);
	}
}
