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
	studentId: string;
	studentToEdit: Student = new Student();
	studentForm: FormGroup;
	studentUrl: string;
	subjectUrl: string;
	taskUrl: string;
	roles = ['student', 'teacher', 'admin'];
	subjectList;
	taskList;
	enrolledSubjects;
	assignedTasks;

	constructor(fb: FormBuilder, private globalsService: GlobalsService, private route: ActivatedRoute) {

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

		this.studentToEdit.enrolledSubjects = event;
	}

	onChangeAssignedTasks(event) {

		this.studentToEdit.assignedTasks = event;
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

		this.globalsService.request('get', this.studentUrl + this.studentId).subscribe(response => {

			var content = response.json().content;
			this.studentToEdit = content.length ? content[0] : { _id: null };
		}, error => {

			console.error(error.text());
		});
	}

	getSubjects() {

		this.globalsService.request('get', this.subjectUrl).subscribe(response => {

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

		this.globalsService.request('get', this.taskUrl).subscribe(response => {

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

		this.globalsService.request('post', this.studentUrl, { body: body }).subscribe(response => {

			this.getStudent();
		}, error => {

			console.error(error.text());
		});
	}

	update(student) {

		let body = JSON.stringify({ data: student });

		this.globalsService.request('put', this.studentUrl + student._id, { body: body }).subscribe(response => {

			this.getStudent();
		}, error => {

			console.error(error.text());
		});
	}
}
