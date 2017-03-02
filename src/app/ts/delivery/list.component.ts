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
	params;
	subjectId: string;
	taskId: string;

	constructor(public router: Router, private globalsService: GlobalsService, private route: ActivatedRoute,
		private localStorageService: LocalStorageService) {

		this.route.params.subscribe((params: Params) => {
			this.params = params;
		});
		this.subjectId = this.params['subjectid'];
		this.taskId = this.params['taskid'];

		this.deliveryUrl = globalsService.apiUrl + 'delivery';
		this.getDeliveries();
	}

	getDeliveries() {

		var url = this.deliveryUrl + '?studentid=' + this.localStorageService.get('userId');

		if (this.taskId) {
			url += '&taskid=' + this.taskId;
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

		this.router.navigate([id], { relativeTo: this.route });
	}

	addItem(evt) {

		this.router.navigate(['new', 'edit'], { relativeTo: this.route });
	}
}
