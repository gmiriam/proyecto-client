import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {GlobalsService} from '../globals.service';
import {Subject} from './subject';

@Component({
	selector: 'subjectEdition',
	templateUrl: 'src/app/html/subject/edition.html',
	providers: [GlobalsService]
})

export class SubjectEdition {
	subjectId: string;
	formEnable: boolean;
	subjectToEdit: Subject = new Subject();
	subjectForm: FormGroup;
	subjectUrl: string;
	teacherUrl: string;
	teacherList;
	teachers;
	temaryFileTarget: string;

	constructor(public http: Http, fb: FormBuilder, globalsService: GlobalsService, private route: ActivatedRoute) {

		this.route.params.subscribe((params: Params) => {
			this.subjectId = params['id'];
		});

		this.subjectUrl = globalsService.apiUrl + 'subject/';
		this.teacherUrl = globalsService.apiUrl + 'user?role=teacher';

		this.subjectForm = fb.group({
			_id: [""],
			name: ["", Validators.required],
			description: [""],
			temary: [""],
			teachers: [""]
		});

		this.temaryFileTarget = 'temaries';

		this.getSubject();
		this.getTeachers();
	}

	onChangeTeachers(event) {

		this.subjectToEdit.teachers = event;
	}

	onSubmit(event) {

		let value = this.subjectToEdit;

		if (value._id){
			this.update(value)
		} else {
			this.add(value)
		}
	}

	getSubject() {

		if (this.subjectId === "new") {
			return;
		}

		this.http.get(this.subjectUrl + this.subjectId).subscribe(response => {

			var content = response.json().content;
			this.subjectToEdit = content[0] ? content[0] : { _id: null };
		}, error => {

			console.error(error.text());
		});
	}

	getTeachers() {

		this.http.get(this.teacherUrl).subscribe(response => {

			var content = response.json().content;
			if (!content) {
				return;
			}

			this.teachers = [];

			this.teacherList = content.map((function(currentValue, index, array) {

				var teachers = this.subjectToEdit.teachers,
					teacherObj = {
						id: currentValue._id,
						text: currentValue.surname + ", " + currentValue.firstName
					};

				if (teachers && teachers.indexOf(teacherObj.id) !== -1) {
					this.teachers.push(teacherObj);
				}

				return teacherObj;
			}).bind(this));
		}, error => {

			console.error(error.text());
		});
	}

	add(subject) {

		let body = JSON.stringify({ data: subject });
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		this.http.post(this.subjectUrl, body, { headers: headers }).subscribe(response => {

			this.getSubject();
		}, error => {

			console.error(error.text());
		});
	}

	update(subject) {

		let body = JSON.stringify({ data: subject });
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		this.http.put(this.subjectUrl + subject._id, body, { headers: headers }).subscribe(response => {

			this.getSubject();
		}, error => {

			console.error(error.text());
		});
	}

	delete(subject, event) {

		this.http.delete(this.subjectUrl + subject._id)
			.subscribe(response => {

				var status = response.json().status;

				if (status === "success") {
					alert("Se ha borrado con éxito")
					this.getSubject();
				}
			}, error => {

				console.error(error.text());
			});
	}

	onSubjectTemaryUploaded(filename: string) {

		this.subjectToEdit.temary = filename;
	}
}
