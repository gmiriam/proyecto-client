import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {GlobalsService} from '../globals.service';
import {Delivery} from './delivery';

@Component({
	selector: 'deliveryList',
	templateUrl: 'src/app/html/delivery/list.html'
})

export class DeliveryList {
	deliveryList: Delivery[];
	deliveryUrl: string;
	params;
	subjectId: string;
	taskId: string;

	constructor(public router: Router, private globalsService: GlobalsService, private route: ActivatedRoute) {

		this.route.params.subscribe((params: Params) => {
			this.params = params;
		});
		this.subjectId = this.params['subjectid'];
		this.taskId = this.params['taskid'];

		this.deliveryUrl = globalsService.apiUrl + 'delivery';
		this.getDeliveries();
	}

	getDeliveries() {

		var url = this.deliveryUrl;

		if (this.taskId) {
			url += '?taskid=' + this.taskId;
		}

		this.globalsService.request('get', url, {
			urlParams: this.params
		}).subscribe(
			response => {
				var content = response.json().content;
				this.deliveryList = content;
			},
			error => {
				console.error(error.text());
			});
	}

	viewItem(evt, id) {

		this.router.navigate(['subject', this.subjectId, 'task', this.taskId, 'delivery', id]);
	}

	addItem(evt) {

		this.router.navigate(['subject', this.subjectId, 'task', this.taskId, 'delivery', "new", "edit"]);
	}

	editItem(evt, id) {

		this.router.navigate(['subject', this.subjectId, 'task', this.taskId, 'delivery', id, "edit"]);
	}

	deleteItem(evt, id) {

		var confirmed = window.confirm("Está seguro?");

		if (!confirmed) {
			return;
		}

		this.globalsService.request('delete', this.deliveryUrl + '/' + id, {
			urlParams: this.params
		}).subscribe(
			response => {
				console.log("borrado", id);
				this.getDeliveries();
			},
			error => {
				console.error(error.text());
			});
	}
}
