import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {GlobalsService} from '../globals.service';

@Component({
	selector: 'enrollStudents',
	templateUrl: 'src/app/html/subject/enrollStudents.html',
	providers: [GlobalsService]
})

export class EnrollStudents {
	subjectId: string;
	enrollStudentsForm: FormGroup;
	studentUrl: string;
	enrollStudentsUrl: string;
	unenrollStudentsUrl: string;
	studentList;
	originalEnrolledStudents;
	enrolledStudents;
	unenrolledStudents = [];

	constructor(public http: Http, fb: FormBuilder, globalsService: GlobalsService, private route: ActivatedRoute) {

		this.route.params.subscribe((params: Params) => {
			this.subjectId = params['id'];
		});

		this.enrolledStudentsUrl = globalsService.apiUrl + 'user?role=student&subjectid=' + this.subjectId;
		this.studentUrl = globalsService.apiUrl + 'user?role=student';
		this.enrollStudentsUrl = globalsService.apiUrl + 'enrollStudents';
		this.unenrollStudentsUrl = globalsService.apiUrl + 'unenrollStudents';

		this.enrollStudentsForm = fb.group({
			students: ["", Validators.required]
		});

		this.getEnrolledStudents();
	}

	onChangeEnrolledStudents(event) {

		this.enrolledStudents = event;
	}

	onRemoveEnrolledStudent(event) {

		this.unenrolledStudents.push(event);
	}

	onSubmit(event) {

		this.save();
	}

	getEnrolledStudents() {

		this.http.get(this.enrolledStudentsUrl).subscribe(response => {

			var content = response.json().content;
			if (!content) {
				return;
			}

			this.originalEnrolledStudents = content;
			this.getStudents();
		}, error => {

			console.error(error.text());
		});
	}

	getStudents() {

		this.http.get(this.studentUrl).subscribe(response => {

			var content = response.json().content;
			if (!content) {
				return;
			}

			this.enrolledStudents = [];

			this.studentList = content.map((function(currentValue, index, array) {

				var students = this.originalEnrolledStudents,
					studentObj = {
						id: currentValue._id,
						text: currentValue.surname + ", " + currentValue.firstName
					};

				if (students && students.indexOf(studentObj.id) !== -1) {
					this.enrolledStudents.push(studentObj);
				}

				return studentObj;
			}).bind(this));
		}, error => {

			console.error(error.text());
		});
	}

	save() {

		this.saveUnenrolledStudents({
			subject: this.subjectId,
			students: this.unenrolledStudents;
		});
	}

	saveUnenrolledStudents(value) {

		let body = JSON.stringify({ data: value });
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		this.http.post(this.unenrollStudentsUrl, body, { headers: headers }).subscribe(response => {

			this.saveEnrolledStudents({
				subject: this.subjectId,
				students: this.enrolledStudents;
			});
		}, error => {

			console.error(error.text());
		});
	}

	saveEnrolledStudents(value) {

		let body = JSON.stringify({ data: value });
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		this.http.post(this.enrollStudentsUrl, body, { headers: headers }).subscribe(response => {

			//this.getSubject();
		}, error => {

			console.error(error.text());
		});
	}
}
