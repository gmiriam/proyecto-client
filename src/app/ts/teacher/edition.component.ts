import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {GlobalsService} from '../globals.service';
import {Teacher} from './teacher';

@Component({
	selector: 'teacherEdition',
	templateUrl: 'src/app/html/teacher/edition.html',
	providers: [GlobalsService]
})

export class TeacherEdition {
	teacherId: string;
	teacherToEdit: Teacher = new Teacher();
	teacherForm: FormGroup;
	teacherUrl: string;
	subjectUrl: string;
	taskUrl: string;
	roles = ['student', 'teacher', 'admin'];
	subjectList;
	taskList;
	enrolledSubjects;
	assignedTasks;

	constructor(public http: Http, fb: FormBuilder, globalsService: GlobalsService, private route: ActivatedRoute) {

		this.route.params.subscribe((params: Params) => {
			this.teacherId = params['id'];
		});

		this.teacherUrl = globalsService.apiUrl + 'user/';
		this.subjectUrl = globalsService.apiUrl + 'subject';
		this.taskUrl = globalsService.apiUrl + 'task';

		this.teacherForm = fb.group({
			_id:[""],
			firstName: ["", Validators.required],
			surname: [""],
			email: [""],
			password: ["", Validators.required],
			role: ["", Validators.required],
			enrolledSubjects: [""],
			assignedTasks: [""]
		});

		this.getTeacher();
		this.getSubjects();
		this.getTasks();
	}

	onChangeEnrolledSubjects(event) {

		this.teacherToEdit.enrolledSubjects = event;
	}

	onChangeAssignedTasks(event) {

		this.teacherToEdit.assignedTasks = event;
	}

	onSubmit(event) {

		let value = this.teacherToEdit;

		if (value._id){
			this.update(value)
		} else {
			this.add(value)
		}
	}

	getTeacher() {

		if (this.teacherId === "new") {
			this.teacherToEdit.role = "teacher";
			return;
		}

		this.http.get(this.teacherUrl + this.teacherId).subscribe(response => {

			var content = response.json().content;
			this.teacherToEdit = content.length ? content[0] : { _id: null };
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

				var enrolledSubjects = this.teacherToEdit.enrolledSubjects,
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

				var assignedTasks = this.teacherToEdit.assignedTasks,
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

	add(teacher) {

		let body = JSON.stringify({ data: teacher });
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		this.http.post(this.teacherUrl, body, { headers: headers }).subscribe(response => {

			this.getTeacher();
		}, error => {

			console.error(error.text());
		});
	}

	update(teacher) {

		let body = JSON.stringify({ data: teacher });
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		this.http.put(this.teacherUrl + teacher._id, body, { headers: headers }).subscribe(response => {

			this.getTeacher();
		}, error => {

			console.error(error.text());
		});
	}

	delete(teacher, event) {

		this.http.delete(this.teacherUrl + teacher._id)
			.subscribe(response => {

				var status = response.json().status;

				if (status === "success") {
					alert("Se ha borrado con éxito")
					this.getTeacher();
				}
			}, error => {

				console.error(error.text());
			});
	}
}
