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
	scoreUrl: string;
	userIsTeacherInSubject;

	constructor(public router: Router, private globalsService: GlobalsService, private route: ActivatedRoute,
		private localStorageService: LocalStorageService) {

		this.route.params.subscribe((params: Params) => {
			this.params = params;
		});
		this.subjectId = this.params['subjectid'];

		this.subjectUrl = globalsService.apiUrl + 'subject/';
		this.scoreUrl = globalsService.apiUrl + 'score';

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
			subject = content[0] ? content[0] : { _id: null },
			teachers = subject.teachers,
			userId = this.localStorageService.get('userId'),
			userRole = this.localStorageService.get('userRole'),
			userQuery = '';

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
			},
			error => {
				console.error(error.text());
			});
	}

	viewItem(evt, id) {

		this.router.navigate([id], { relativeTo: this.route });
	}

	editItem(evt, id) {

		this.router.navigate([id, 'edit'], { relativeTo: this.route });
	}
}
