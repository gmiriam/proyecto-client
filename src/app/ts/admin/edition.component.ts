import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {GlobalsService} from '../globals.service';
import {Admin} from './admin';

@Component({
	selector: 'adminEdition',
	templateUrl: 'src/app/html/admin/edition.html',
	providers: [GlobalsService]
})

export class AdminEdition {
	adminId: string;
	formEnable: boolean;
	adminToEdit: Admin = new Admin();
	adminForm: FormGroup;
	adminUrl: string;
	roles = ['student', 'teacher', 'admin'];

	constructor(public http: Http, fb: FormBuilder, globalsService: GlobalsService, private route: ActivatedRoute) {

		this.route.params.subscribe((params: Params) => {
			this.adminId = params['id'];
		});

		this.adminUrl = globalsService.apiUrl + 'user/';

		this.adminForm = fb.group({
			_id:[""],
			firstName: ["", Validators.required],
			surname: [""],
			email: [""],
			password: ["", Validators.required],
			role: ["", Validators.required],
			enrolledSubjects: [""],
			assignedTasks: [""]
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

		this.http.get(this.adminUrl + this.adminId).subscribe(response => {

			var content = response.json().content;
			this.adminToEdit = content.length ? content[0] : { _id: null };
		}, error => {

			console.error(error.text());
		});
	}

	add(admin) {

		let body = JSON.stringify({ data: admin });
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		this.http.post(this.adminUrl, body, { headers: headers }).subscribe(response => {

			this.getAdmin();
		}, error => {

			console.error(error.text());
		});
	}

	update(admin) {

		let body = JSON.stringify({ data: admin });
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		this.http.put(this.adminUrl + admin._id, body, { headers: headers }).subscribe(response => {

			this.getAdmin();
		}, error => {

			console.error(error.text());
		});
	}

	delete(admin, event) {

		this.http.delete(this.adminUrl + admin._id)
			.subscribe(response => {

				var status = response.json().status;

				if (status === "success") {
					alert("Se ha borrado con éxito")
					this.getAdmin();
				}
			}, error => {

				console.error(error.text());
			});
	}
}
