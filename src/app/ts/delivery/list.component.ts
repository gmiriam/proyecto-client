import { Component } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {GlobalsService} from '../globals.service';
import {Delivery} from './delivery';

@Component({
	selector: 'deliveryList',
	templateUrl: 'src/app/html/delivery/list.html',
	providers: [GlobalsService]
})

export class DeliveryList {
	deliveryList: Delivery[];
	deliveryUrl: string;
	taskId: string;

	constructor(public http: Http, public router: Router, globalsService: GlobalsService, private route: ActivatedRoute) {

		this.route.params.subscribe((params: Params) => {
			this.taskId = params['id'];
		});

		this.deliveryUrl = globalsService.apiUrl + 'delivery';
		this.getDeliveries();
	}

	getDeliveries() {

		var url = this.deliveryUrl + '?taskid=' + this.taskId;

		this.http.get(url).subscribe(
			response => {
				var content = response.json().content;
				this.deliveryList = content;
			},
			error => {
				console.error(error.text());
			});
	}

	viewItem(evt, id) {

		this.router.navigate(['delivery', id]);
	}

	addItem(evt) {

		this.router.navigate(['delivery', "new", "edit"]);
	}

	editItem(evt, id) {

		this.router.navigate(['delivery', id, "edit"]);
	}

	deleteItem(evt, id) {

		var confirmed = window.confirm("Está seguro?");

		if (!confirmed) {
			return;
		}

		this.http.delete(this.deliveryUrl + '/' + id).subscribe(
			response => {
				console.log("borrado", id);
				this.getDeliveries();
			},
			error => {
				console.error(error.text());
			});
	}
}
