import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
	taskName: string;
	studentUrl: string;
	studentName: string;
	downloadUrl: string;
	dataUrl: string;

	constructor(private globalsService: GlobalsService, private route: ActivatedRoute) {

		this.route.params.subscribe((params: Params) => {
			this.params = params;
		});
		this.subjectId = this.params['subjectid'];
		this.taskId = this.params['taskid'];
		this.deliveryId = this.params['deliveryid'];

		this.deliveryUrl = globalsService.apiUrl + 'delivery/';
		this.downloadUrl = globalsService.apiUrl + 'download';
		this.taskUrl = globalsService.apiUrl + 'task/';
		this.studentUrl = globalsService.apiUrl + 'user/';

		this.getDelivery();
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
			this.dataUrl = this.downloadUrl + "?path=deliveries&name=" + data;
		}

		var student = this.deliveryToView.student;
		if (student) {
			this.getStudent(student);
		}

		var task = this.deliveryToView.task;
		if (task) {
			this.getTask(task);
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

	getTask(id) {

		this.globalsService.request('get', this.taskUrl + id, {
			urlParams: this.params
		}).subscribe(
			response => {

				var content = response.json().content[0];
				this.taskName = content.name;
			}, error => {

				console.error(error.text());
			});
	}

}
