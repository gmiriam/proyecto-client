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
	subjectUrl: string;
	taskUrl: string;
	roles = ['estudiante', 'profesor', 'administrador'];
	subjectList;
	taskList;
	enrolledSubjects;
	assignedTasks;

	constructor(public http: Http, fb: FormBuilder, globalsService: GlobalsService, private route: ActivatedRoute) {

		this.route.params.subscribe((params: Params) => {
			this.studentId = params['id'];
		});

		this.studentUrl = globalsService.apiUrl + 'user/';
		this.subjectUrl = globalsService.apiUrl + 'subject';
		this.taskUrl = globalsService.apiUrl + 'task';

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
		this.getSubjects();
		this.getTasks();
	}

	onChangeEnrolledSubjects(event) {

		this.studentToEdit.enrolledSubjects = this._getSerializedSelection(event);
	}

	onChangeAssignedTasks(event) {

		this.studentToEdit.assignedTasks = this._getSerializedSelection(event);
	}

	_getSerializedSelection(selection) {

		if (!selection || !selection.length) {
			return null;
		}

		return selection.map(function(currentValue, index, array) {
			return currentValue.id;
		});
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
			this.studentToEdit = content.length ? content[0] : { _id: null };
		}, error => {

			console.error(error.text());
		});
	}

	getSubjects() {

		this.http.get(this.subjectUrl).subscribe(response => {

			var content = response.json().content;
			if (!content) {
				return;
			}

			this.enrolledSubjects = [];

			this.subjectList = content.map((function(currentValue, index, array) {

				var enrolledSubjects = this.studentToEdit.enrolledSubjects,
					subjectObj = {
						id: currentValue._id,
						text: currentValue.name
					};

				if (enrolledSubjects && enrolledSubjects.indexOf(subjectObj.id) !== -1) {
					this.enrolledSubjects.push(subjectObj);
				}

				return subjectObj;
			}).bind(this));
		}, error => {

			console.error(error.text());
		});
	}

	getTasks() {

		this.http.get(this.taskUrl).subscribe(response => {

			var content = response.json().content;
			if (!content) {
				return;
			}

			this.assignedTasks = [];

			this.taskList = content.map((function(currentValue, index, array) {

				var assignedTasks = this.studentToEdit.assignedTasks,
					taskObj = {
						id: currentValue._id,
						text: currentValue.name
					};

				if (assignedTasks && assignedTasks.indexOf(taskObj.id) !== -1) {
					this.assignedTasks.push(taskObj);
				}

				return taskObj;
			}).bind(this));
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
