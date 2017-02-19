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
	enrolledStudentsUrl: string;
	enrollStudentsUrl: string;
	unenrollStudentsUrl: string;
	studentList;
	enrolledStudentList;
	originalEnrolledStudentIds;
	enrolledStudentIds;
	unenrolledStudentIds = [];

	constructor(public http: Http, fb: FormBuilder, globalsService: GlobalsService, private route: ActivatedRoute) {

		this.route.params.subscribe((params: Params) => {
			this.subjectId = params['id'];
		});

		this.enrolledStudentsUrl = globalsService.apiUrl + 'user?role=student&enrolledsubjectid=' + this.subjectId;
		this.studentUrl = globalsService.apiUrl + 'user?role=student';
		this.enrollStudentsUrl = globalsService.apiUrl + 'subject/enrollstudents';
		this.unenrollStudentsUrl = globalsService.apiUrl + 'subject/unenrollstudents';

		this.enrollStudentsForm = fb.group({
			students: ["", Validators.required]
		});

		this.getEnrolledStudents();
	}

	onChangeEnrolledStudents(event) {

		this.enrolledStudentIds = event;
	}

	onSelectEnrolledStudent(event) {

		var index = this.unenrolledStudentIds.indexOf(event);
		if (index !== -1) {
			this.unenrolledStudentIds.splice(index, 1);
		}
	}

	onRemoveEnrolledStudent(event) {

		if (this.unenrolledStudentIds.indexOf(event) === -1 && this.originalEnrolledStudentIds.indexOf(event) !== -1) {
			this.unenrolledStudentIds.push(event);
		}
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

			this.originalEnrolledStudentIds = content.map((function(currentValue, index, array) {

				return currentValue._id;
			}).bind(this));
			this.enrolledStudentIds = this.originalEnrolledStudentIds;

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

			this.enrolledStudentList = [];

			this.studentList = content.map((function(currentValue, index, array) {

				var studentObj = {
						id: currentValue._id,
						text: currentValue.surname + ", " + currentValue.firstName
					};

				if (this.originalEnrolledStudentIds && this.originalEnrolledStudentIds.indexOf(studentObj.id) !== -1) {
					this.enrolledStudentList.push(studentObj);
				}

				return studentObj;
			}).bind(this));
		}, error => {

			console.error(error.text());
		});
	}

	save() {

		if (this.unenrolledStudentIds.length) {
			this.saveUnenrolledStudents({
				subject: this.subjectId,
				students: this.unenrolledStudentIds
			});
		} else if (this.enrolledStudentIds.length) {
			this.saveEnrolledStudents({
				subject: this.subjectId,
				students: this.enrolledStudentIds
			});
		}
	}

	saveUnenrolledStudents(value) {

		let body = JSON.stringify({ data: value });
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		this.http.post(this.unenrollStudentsUrl, body, { headers: headers }).subscribe(response => {

			this.unenrolledStudentIds = [];
			this.saveEnrolledStudents({
				subject: this.subjectId,
				students: this.enrolledStudentIds
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

			this.originalEnrolledStudentIds = this.enrolledStudentIds;
		}, error => {

			console.error(error.text());
		});
	}
}
