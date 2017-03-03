import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {GlobalsService} from '../globals.service';
import {Admin} from './admin';

@Component({
	selector: 'adminEdition',
	templateUrl: 'src/app/html/admin/edition.html'
})

export class AdminEdition {
	params;
	adminId: string;
	adminToEdit: Admin = new Admin();
	adminForm: FormGroup;
	adminUrl: string;
	roles = ['student', 'teacher', 'admin'];

	constructor(public router: Router, fb: FormBuilder, private globalsService: GlobalsService,
		private route: ActivatedRoute) {

		this.route.params.subscribe((params: Params) => {
			this.params = params;
		});
		this.adminId = this.params['userid'];
		this.adminUrl = globalsService.apiUrl + 'user/';

		this.adminForm = fb.group({
			_id:[""],
			firstName: ["", Validators.required],
			surname: [""],
			email: [""],
			password: ["", Validators.required],
			role: ["", Validators.required]
		});

		this.getAdmin();
	}

	onSubmit(event) {

		let value = this.adminToEdit;

		if (value._id){
			this.update(value)
		} else {
			this.add(value)
		}
	}

	getAdmin() {

		if (this.adminId === "new") {
			this.adminToEdit.role = "admin";
			return;
		}

		this.globalsService.request('get', this.adminUrl + this.adminId, {
			urlParams: this.params
		}).subscribe(response => {

			var content = response.json().content;
			this.adminToEdit = content.length ? content[0] : { _id: null };
		}, error => {

			console.error(error.text());
		});
	}

	add(admin) {

		let body = JSON.stringify({ data: admin });

		this.globalsService.request('post', this.adminUrl, {
			urlParams: this.params,
			body: body
		}).subscribe(response => {

			this.finishEdition();
		}, error => {

			console.error(error.text());
		});
	}

	update(admin) {

		let body = JSON.stringify({ data: admin });

		this.globalsService.request('put', this.adminUrl + admin._id, {
			urlParams: this.params,
			body: body
		}).subscribe(response => {

			this.finishEdition();
		}, error => {

			console.error(error.text());
		});
	}

	finishEdition(event?) {

		event && event.preventDefault();

		var paths = ['admin'];
		if (this.adminId !== 'new') {
			paths.push(this.adminId);
		}

		this.router.navigate(paths);
	}
}
