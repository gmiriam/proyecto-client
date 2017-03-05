import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import {GlobalsService} from '../globals.service';
import {Delivery} from './delivery';

@Component({
	selector: 'deliveryView',
	templateUrl: 'src/app/html/delivery/view.html'
})

export class DeliveryView {
	params;
	subjectId: string;
	taskId: string;
	deliveryId: string;
	deliveryToView: Delivery = new Delivery();
	deliveryUrl: string;
	taskUrl: string;
	subjectUrl: string;
	subjectName: string;
	taskName: string;
	studentUrl: string;
	studentName: string;
	downloadUrl: string;
	dataUrl: string;
	userIsTeacherInSubject;
	userIsDeliveryOwner;

	constructor(public router: Router, private globalsService: GlobalsService, private route: ActivatedRoute,
		private localStorageService: LocalStorageService) {

		this.route.params.subscribe((params: Params) => {
			this.params = params;
		});
		this.subjectId = this.params['subjectid'];
		this.taskId = this.params['taskid'];
		this.deliveryId = this.params['deliveryid'];

		this.subjectUrl = globalsService.apiUrl + 'subject/';
		this.taskUrl = globalsService.apiUrl + 'task/';
		this.deliveryUrl = globalsService.apiUrl + 'delivery/';
		this.downloadUrl = globalsService.apiUrl + 'download';
		this.studentUrl = globalsService.apiUrl + 'user/';

		this.getSubject();
		this.getTask();
		this.getDelivery();
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
			subject = content[0];

		this.subjectName = subject.name;

		var teachers = subject.teachers;
		if (teachers) {
			var userId = this.localStorageService.get('userId');
			this.userIsTeacherInSubject = teachers.indexOf(userId) !== -1;
		}
	}

	getTask() {

		this.globalsService.request('get', this.taskUrl + this.taskId, {
			urlParams: this.params
		}).subscribe(
			(this.onTaskResponse).bind(this),
			error => {

				console.error(error.text());
			});
	}

	onTaskResponse(response) {

		var content = response.json().content,
			task = content[0];

		this.taskName = task.name;
	}

	getDelivery() {

		this.globalsService.request('get', this.deliveryUrl + this.deliveryId, {
			urlParams: this.params
		}).subscribe(
			(this.onDeliveryResponse).bind(this),
			error => {

				console.error(error.text());
			});
	}

	onDeliveryResponse(response) {

		var content = response.json().content;
		this.deliveryToView = content[0] ? content[0] : { _id: null };

		var data = this.deliveryToView.data;
		if (data) {
			this.dataUrl = this.downloadUrl + "?path=deliveries&name=" + data + '/' + data + '.zip' +
				'&access_token=' + this.localStorageService.get('userToken');
		}

		var student = this.deliveryToView.student;
		if (student) {
			var userId = this.localStorageService.get('userId');
			this.userIsDeliveryOwner = userId === student;

			this.getStudent(student);
		}
	}

	getStudent(id) {

		this.globalsService.request('get', this.studentUrl + id, {
			urlParams: this.params
		}).subscribe(
			response => {

				var content = response.json().content[0];
				this.studentName = content.surname + ", " + content.firstName;
			}, error => {

				console.error(error.text());
			});
	}

	editItemData(evt, id) {

		this.router.navigate(['editdata'], { relativeTo: this.route });
	}

	editItemScore(evt, id) {

		this.router.navigate(['editscore'], { relativeTo: this.route });
	}

	deleteItem(evt, id) {

		var confirmed = window.confirm("Está a punto de eliminar esta entrega, ¿está seguro?");

		if (!confirmed) {
			return;
		}

		this.globalsService.request('delete', this.deliveryUrl + id, {
			urlParams: this.params
		}).subscribe(
			response => {
				this.router.navigate(['subject', this.subjectId, 'task', this.taskId, 'delivery']);
			},
			error => {
				console.error(error.text());
			});
	}

	goBack(evt) {

		this.router.navigate(['subject', this.subjectId, 'task', this.taskId, 'delivery']);
	}
}
