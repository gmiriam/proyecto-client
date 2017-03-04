import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import {GlobalsService} from '../globals.service';
import {Delivery} from './delivery';

@Component({
	selector: 'deliveryScoreEdition',
	templateUrl: 'src/app/html/delivery/scoreEdition.html'
})

export class DeliveryScoreEdition {
	params;
	subjectId: string;
	taskId: string;
	deliveryId: string;
	deliveryToEdit: Delivery = new Delivery();
	deliveryForm: FormGroup;
	subjectUrl: string;
	deliveryUrl: string;
	userId;
	userRole;
	userIsTeacherInSubject;

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

		this.deliveryForm = fb.group({
			_id:[""],
			score: [""]
		});

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

	update(delivery) {

		let body = JSON.stringify({ data: delivery }),
			url = this.deliveryUrl + delivery._id + '/updatescore';

		this.globalsService.request('put', url, {
			urlParams: this.params,
			body: body
		}).subscribe(response => {

			this.finishEdition();
		}, error => {

			console.error(error.text());
		});
	}

	finishEdition(event?) {

		event && event.preventDefault();

		var paths = ['subject', this.subjectId, 'task', this.taskId, 'delivery', this.deliveryId];

		this.router.navigate(paths);
	}
}
