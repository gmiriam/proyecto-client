import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import {GlobalsService} from '../globals.service';
import {Delivery} from './delivery';

@Component({
	selector: 'deliveryList',
	templateUrl: 'src/app/html/delivery/list.html'
})

export class DeliveryList {
	deliveryList: Delivery[];
	deliveryUrl: string;
	subjectUrl: string;
	userUrl: string;
	params;
	subjectId: string;
	taskId: string;
	userIsTeacherInSubject;
	userIsStudentInSubjectAndHasTaskAssigned;
	studentHasNotDeliveries;
	userId;
	userRole;

	constructor(public router: Router, private globalsService: GlobalsService, private route: ActivatedRoute,
		private localStorageService: LocalStorageService) {

		this.route.params.subscribe((params: Params) => {
			this.params = params;
		});
		this.subjectId = this.params['subjectid'];
		this.taskId = this.params['taskid'];

		this.userId = this.localStorageService.get('userId');
		this.userRole = this.localStorageService.get('userRole');

		this.subjectUrl = globalsService.apiUrl + 'subject/';
		this.deliveryUrl = globalsService.apiUrl + 'delivery';
		this.userUrl = globalsService.apiUrl + 'user/';

		this.getSubject();
		this.getUser();
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
			userId = this.userId,
			userRole = this.userRole,
			userQuery = '';

		if (teachers) {
			this.userIsTeacherInSubject = teachers.indexOf(userId) !== -1;
		}

		if (userRole !== "admin" && (teachers && teachers.indexOf(userId) === -1)) {
			userQuery += '&studentid=' + userId;
		}

		this.getDeliveries(userQuery);
	}

	getUser() {

		this.globalsService.request('get', this.userUrl + this.userId, {
			urlParams: this.params
		}).subscribe(
			(this.onUserResponse).bind(this),
			error => {

				console.error(error.text());
			});
	}

	onUserResponse(response) {

		var content = response.json().content,
			user = content[0],
			enrolledSubjects = user.enrolledSubjects || [],
			assignedTasks = user.assignedTasks || [];

		this.userIsStudentInSubjectAndHasTaskAssigned = enrolledSubjects.indexOf(this.subjectId) !== -1 &&
			assignedTasks.indexOf(this.taskId) !== -1;
	}

	getDeliveries(userQuery?) {

		var url = this.deliveryUrl + '?taskid=' + this.taskId;

		if (userQuery) {
			url += userQuery;
		}

		this.globalsService.request('get', url, {
			urlParams: this.params
		}).subscribe(
			response => {
				var content = response.json().content;
				this.deliveryList = content;

				if (this.userIsStudentInSubjectAndHasTaskAssigned) {
					this.studentHasNotDeliveries = !this.deliveryList.length;
				}
			},
			error => {
				console.error(error.text());
			});
	}

	viewItem(evt, id) {

		this.router.navigate([id], { relativeTo: this.route });
	}

	addItem(evt) {

		this.router.navigate(['new', 'create'], { relativeTo: this.route });
	}
}
