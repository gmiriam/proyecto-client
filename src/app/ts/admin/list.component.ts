import { Component } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import {GlobalsService} from '../globals.service';
import {Admin} from './admin';

@Component({
	selector: 'adminList',
	templateUrl: 'src/app/html/admin/list.html',
	providers: [GlobalsService]
})

export class AdminList {
	adminList: Admin[];
	adminUrl: string;

	constructor(public http: Http, public router: Router, globalsService: GlobalsService) {

		this.adminUrl = globalsService.apiUrl + 'user';
		this.getAdmins();
	}

	getAdmins() {

		var url = this.adminUrl + '?role=admin';

		this.http.get(url).subscribe(
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

		this.http.delete(this.adminUrl + '/' + id).subscribe(
			response => {
				this.getAdmins();
			},
			error => {
				console.error(error.text());
			});
	}
}
