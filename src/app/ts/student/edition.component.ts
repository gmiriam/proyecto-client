import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {GlobalsService} from '../globals.service';
import {Student} from './student';

@Component({
	selector: 'studentEdition',
	templateUrl: 'src/app/html/student/edition.html',
	providers: [GlobalsService]
})

export class StudentEdition {
	studentId: string;
	formEnable: boolean;
	studentToEdit: Student = new Student();
	studentForm: FormGroup;
	studentUrl: string;
	roles = ['student', 'teacher', 'admin'];

	constructor(public http: Http, fb: FormBuilder, globalsService: GlobalsService, private route: ActivatedRoute) {

		this.route.params.subscribe((params: Params) => {
			this.studentId = params['id'];
		});

		this.studentUrl = globalsService.apiUrl + 'user/';

		this.studentForm = fb.group({
			_id:[""],
			firstName: ["", Validators.required],
			surname: [""],
			email: [""],
			password: ["", Validators.required],
			role: ["", Validators.required],
			enrolledSubjects: [""],
			assignedTasks: [""]
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
			return;
		}

		this.http.get(this.studentUrl + this.studentId).subscribe(response => {

			var content = response.json().content;
			console.debug("entra", content)
			this.studentToEdit = content[0] ? content[0] : { _id: null };
		}, error => {

			console.error(error.text());
		});
	}

	add(student) {

		let body = JSON.stringify({ data: student });
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		this.http.post(this.studentUrl, body, { headers: headers }).subscribe(response => {

			this.getStudent();
		}, error => {

			console.error(error.text());
		});
	}

	update(student) {

		let body = JSON.stringify({ data: student });
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		this.http.put(this.studentUrl + student._id, body, { headers: headers }).subscribe(response => {

			this.getStudent();
		}, error => {

			console.error(error.text());
		});
	}

	delete(student, event) {

		this.http.delete(this.studentUrl + student._id)
			.subscribe(response => {

				var status = response.json().status;

				if (status === "success") {
					alert("Se ha borrado con éxito")
					this.getStudent();
				}
			}, error => {

				console.error(error.text());
			});
	}
}
