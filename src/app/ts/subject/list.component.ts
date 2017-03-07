import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import {GlobalsService} from '../globals.service';
import {Subject} from './subject';

@Component({
	selector: 'subjectList',
	templateUrl: 'src/app/html/subject/list.html'
})

export class SubjectList {
	params;
	subjectList: Subject[];
	subjectsEnrolledList: Subject[];
	subjectsToEvaluateList: Subject[];
	subjectUrl: string;
	userId;
	userRole;

	constructor(private router: Router, private route: ActivatedRoute, private globalsService: GlobalsService,
		private localStorageService: LocalStorageService) {

		this.subjectUrl = globalsService.apiUrl + 'subject';

		this.userId = this.localStorageService.get('userId');
		this.userRole = this.localStorageService.get('userRole');

		this.getSubjects();
	}

	getSubjects() {

		var url = this.subjectUrl,
			studentQuery = '?studentid=' + this.userId,
			teacherQuery = '?teacherid=' + this.userId,
			subjectsEnrolledCbk = (this.onSubjectsResponse).bind(this, 'subjectsEnrolledList'),
			subjectsToEvaluateCbk = (this.onSubjectsResponse).bind(this, 'subjectsToEvaluateList');

		if (this.userRole === 'admin') {
			this.globalsService.request('get', url, {
				urlParams: this.params
			}).subscribe(
				subjectsToEvaluateCbk,
				error => {
					this.globalsService.showError(error);
				});
		}
		if (this.userRole === 'teacher') {
			this.globalsService.request('get', url + teacherQuery, {
				urlParams: this.params
			}).subscribe(
				subjectsToEvaluateCbk,
				error => {
					this.globalsService.showError(error);
				});

			this.globalsService.request('get', url + studentQuery, {
				urlParams: this.params
			}).subscribe(
				subjectsEnrolledCbk,
				error => {
					this.globalsService.showError(error);
				});
		} else if (this.userRole === 'student') {
			this.globalsService.request('get', url + studentQuery, {
				urlParams: this.params
			}).subscribe(
				subjectsEnrolledCbk,
				error => {
					this.globalsService.showError(error);
				});
		}
	}

	onSubjectsResponse(subjectListName, response) {

		var content = response.json().content;
		this[subjectListName] = content;
	}

	viewItem(evt, id) {

		this.router.navigate([id], { relativeTo: this.route });
	}

	addItem(evt) {

		this.router.navigate(["new", "edit"], { relativeTo: this.route });
	}

	goBack(evt) {

		this.router.navigate(['home']);
	}
}
