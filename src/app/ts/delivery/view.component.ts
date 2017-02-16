import { Component } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {GlobalsService} from '../globals.service';
import {Delivery} from './delivery';

@Component({
	selector: 'deliveryView',
	templateUrl: 'src/app/html/delivery/view.html',
	providers: [GlobalsService]
})

export class DeliveryView {
	deliveryId: string;
	deliveryToView: Delivery = new Delivery();
	deliveryUrl: string;
	taskUrl: string;
	taskName: string;
	studentUrl: string;
	studentName: string;
	downloadUrl: string;
	dataUrl: string;

	constructor(public http: Http, globalsService: GlobalsService, private route: ActivatedRoute) {

		this.route.params.subscribe((params: Params) => {
			this.deliveryId = params['id'];
		});

		this.deliveryUrl = globalsService.apiUrl + 'delivery/';
		this.downloadUrl = globalsService.apiUrl + 'download';
		this.taskUrl = globalsService.apiUrl + 'task/';
		this.studentUrl = globalsService.apiUrl + 'user/';

		this.getDelivery();
	}

	getDelivery() {

		if (this.deliveryId === "new") {
			return;
		}

		this.http.get(this.deliveryUrl + this.deliveryId).subscribe(
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
			this.dataUrl = this.downloadUrl + "?path=attachments&name=" + data;
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

		this.http.get(this.studentUrl + id).subscribe(
			response => {

				var content = response.json().content[0];
				this.studentName = content.surname + ", " + content.firstName;
			}, error => {

				console.error(error.text());
			});
	}

	getTask(id) {

		this.http.get(this.taskUrl + id).subscribe(
			response => {

				var content = response.json().content[0];
				this.taskName = content.name;
			}, error => {

				console.error(error.text());
			});
	}

}
