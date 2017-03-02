import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {GlobalsService} from '../globals.service';
import {Student} from './student';

@Component({
	selector: 'studentEdition',
	templateUrl: 'src/app/html/student/edition.html'
})

export class StudentEdition {
	params;
	studentId: string;
	studentToEdit: Student = new Student();
	studentForm: FormGroup;
	studentUrl: string;
	roles = ['student', 'teacher', 'admin'];

	constructor(public router: Router, fb: FormBuilder, private globalsService: GlobalsService,
		private route: ActivatedRoute) {

		this.route.params.subscribe((params: Params) => {

			this.params = params;
		});
		this.studentId = this.params['id'];

		this.studentUrl = globalsService.apiUrl + 'user/';

		this.studentForm = fb.group({
			_id:[""],
			firstName: ["", Validators.required],
			surname: [""],
			email: [""],
			password: ["", Validators.required],
			role: ["", Validators.required]
		});

		this.getStudent();
	}

	onSubmit(event) {

		let value = this.studentToEdit;

		if (value._id){
			this.update(value)
		} else {
			this.add(value)
		}
	}

	getStudent() {

		if (this.studentId === "new") {
			this.studentToEdit.role = "student";
			return;
		}

		this.globalsService.request('get', this.studentUrl + this.studentId, {
			urlParams: this.params
		}).subscribe(response => {

			var content = response.json().content;
			this.studentToEdit = content.length ? content[0] : { _id: null };
		}, error => {

			console.error(error.text());
		});
	}

	add(student) {

		let body = JSON.stringify({ data: student });

		this.globalsService.request('post', this.studentUrl, {
			urlParams: this.params,
			body: body
		}).subscribe(response => {

			this.finishEdition();
		}, error => {

			console.error(error.text());
		});
	}

	update(student) {

		let body = JSON.stringify({ data: student });

		this.globalsService.request('put', this.studentUrl + student._id, {
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
		this.router.navigate(['student', this.studentId]);
	}
}
