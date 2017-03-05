import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import {GlobalsService} from '../globals.service';
import {Admin} from './admin';

@Component({
	selector: 'adminView',
	templateUrl: 'src/app/html/admin/view.html'
})

export class AdminView {
	params;
	adminId: string;
	adminToView: Admin = new Admin();
	adminUrl: string;
	viewingYourself;

	constructor(public router: Router, private globalsService: GlobalsService, private route: ActivatedRoute,
		private localStorageService: LocalStorageService) {

		this.route.params.subscribe((params: Params) => {
			this.params = params;
		});
		this.adminId = this.params['userid'];

		this.viewingYourself = this.localStorageService.get('userId') === this.adminId;
		this.adminUrl = globalsService.apiUrl + 'user/';

		this.getAdmin();
	}

	getAdmin() {

		this.globalsService.request('get', this.adminUrl + this.adminId, {
			urlParams: this.params
		}).subscribe(
			(this.onAdminResponse).bind(this),
			error => {

				console.error(error.text());
			});
	}

	onAdminResponse(response) {

		var content = response.json().content;
		this.adminToView = content[0] ? content[0] : { _id: null };
	}

	editItem(evt, id) {

		this.router.navigate(['edit'], { relativeTo: this.route });
	}

	deleteItem(evt, id) {

		var confirmed = window.confirm("Está a punto de eliminar este administrador, ¿está seguro?");

		if (!confirmed) {
			return;
		}

		this.globalsService.request('delete', this.adminUrl + id, {
			urlParams: this.params
		}).subscribe(
			response => {
				this.router.navigate(['admin']);
			},
			error => {
				console.error(error.text());
			});
	}
}
