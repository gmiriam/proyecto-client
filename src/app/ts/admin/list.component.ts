import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {GlobalsService} from '../globals.service';
import {Admin} from './admin';

@Component({
	selector: 'adminList',
	templateUrl: 'src/app/html/admin/list.html'
})

export class AdminList {
	params;
	adminList: Admin[];
	adminUrl: string;

	constructor(public router: Router, private globalsService: GlobalsService) {

		this.adminUrl = globalsService.apiUrl + 'user';
		this.getAdmins();
	}

	getAdmins() {

		var url = this.adminUrl + '?role=admin';

		this.globalsService.request('get', url, {
			urlParams: this.params
		}).subscribe(
			response => {
				var content = response.json().content;
				this.adminList = content;
			},
			error => {
				console.error(error.text());
			});
	}

	addItem(evt) {
		this.router.navigate(['admin', "new"]);
	}

	editItem(evt, id) {
		this.router.navigate(['admin', id]);
	}

	deleteItem(evt, id) {

		var confirmed = window.confirm("Está seguro?");

		if (!confirmed) {
			return;
		}

		this.globalsService.request('delete', this.adminUrl + '/' + id, {
			urlParams: this.params
		}).subscribe(
			response => {
				this.getAdmins();
			},
			error => {
				console.error(error.text());
			});
	}
}
