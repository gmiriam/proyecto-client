import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
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

	constructor(public router: Router, private route: ActivatedRoute, private globalsService: GlobalsService,
		private localStorageService: LocalStorageService) {

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

	viewItem(evt, id) {

		this.router.navigate([id], { relativeTo: this.route });
	}

	addItem(evt) {

		this.router.navigate(['new', 'edit'], { relativeTo: this.route });
	}
}
