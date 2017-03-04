import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import {GlobalsService} from '../globals.service';
import {Delivery} from './delivery';

@Component({
	selector: 'deliveryDataEdition',
	templateUrl: 'src/app/html/delivery/dataEdition.html'
})

export class DeliveryDataEdition {
	params;
	subjectId: string;
	taskId: string;
	deliveryId: string;
	deliveryToEdit: Delivery = new Delivery();
	deliveryForm: FormGroup;
	subjectUrl: string;
	deliveryUrl: string;
	userUrl: string;
	dataFileTarget: string;
	userId;
	userRole;
	userIsTeacherInSubject;
	userIsStudentInSubjectAndHasTaskAssigned;

	constructor(public router: Router, fb: FormBuilder, private globalsService: GlobalsService,
		private route: ActivatedRoute, private localStorageService: LocalStorageService) {

		this.route.params.subscribe((params: Params) => {
			this.params = params;
		});
		this.subjectId = this.params['subjectid'];
		this.taskId = this.params['taskid'];
		this.deliveryId = this.params['deliveryid'];

		this.userId = this.localStorageService.get('userId');
		this.userRole = this.localStorageService.get('userRole');

		this.subjectUrl = globalsService.apiUrl + 'subject/';
		this.deliveryUrl = globalsService.apiUrl + 'delivery/';
		this.userUrl = globalsService.apiUrl + 'user/';

		this.deliveryForm = fb.group({
			_id:[""],
			data: [""]
		});

		this.dataFileTarget = 'deliveries';

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
			userId = this.userId;

		if (teachers) {
			this.userIsTeacherInSubject = teachers.indexOf(userId) !== -1;
		}

		this.getDelivery();
		this.getUser();
	}

	onSubmit(event) {

		let value = this.deliveryToEdit;

		this.update(value)
	}

	getDelivery() {

		this.globalsService.request('get', this.deliveryUrl + this.deliveryId, {
			urlParams: this.params
		}).subscribe(response => {

			var content = response.json().content;
			this.deliveryToEdit = content[0] ? content[0] : { _id: null };
		}, error => {

			console.error(error.text());
		});
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

	update(delivery) {

		let body = JSON.stringify({ data: delivery }),
			url = this.deliveryUrl + delivery._id + '/updatedata';

		this.globalsService.request('put', url, {
			urlParams: this.params,
			body: body
		}).subscribe(response => {

			this.finishEdition();
		}, error => {

			console.error(error.text());
		});
	}

	onDeliveryDataUploaded(filename: string) {

		this.deliveryToEdit.data = filename;
	}

	finishEdition(event?) {

		event && event.preventDefault();

		var paths = ['subject', this.subjectId, 'task', this.taskId, 'delivery', this.deliveryId];

		this.router.navigate(paths);
	}
}
