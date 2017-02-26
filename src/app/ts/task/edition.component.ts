import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {GlobalsService} from '../globals.service';
import {Task} from './task';

@Component({
	selector: 'taskEdition',
	templateUrl: 'src/app/html/task/edition.html'
})

export class TaskEdition {
	taskId: string;
	taskToEdit: Task = new Task();
	taskForm: FormGroup;
	taskUrl: string;
	teacherUrl: string;
	subjectUrl: string;
	testFileTarget: string;
	attachedFileTarget: string;
	teacherList;
	subjectList;
	teacher;
	subject;

	constructor(fb: FormBuilder, private globalsService: GlobalsService, private route: ActivatedRoute) {

		this.route.params.subscribe((params: Params) => {
			this.taskId = params['id'];
		});

		this.taskUrl = globalsService.apiUrl + 'task/';
		this.teacherUrl = globalsService.apiUrl + 'user?role=teacher';
		this.subjectUrl = globalsService.apiUrl + 'subject';

		this.taskForm = fb.group({
			_id:[""],
			name: ["", Validators.required],
			statement: ["", Validators.required],
			startDate: ["", Validators.required],
			endDate: [""],
			maxScore: [""],
			teacher: ["", Validators.required],
			evaluationTest: ["", Validators.required],
			subject: ["", Validators.required],
			attached: [""]
		});

		this.testFileTarget = 'tests';
		this.attachedFileTarget = 'attached';

		this.getTask();
		this.getTeachers();
		this.getSubjects();
	}

	onChangeTeacher(event) {

		this.taskToEdit.teacher = event;
	}

	onChangeSubject(event) {

		this.taskToEdit.subject = event;
	}

	onSubmit(event) {

		let value = this.taskToEdit;

		if (value._id){
			this.update(value)
		} else {
			this.add(value)
		}
	}

	getTask() {

		if (this.taskId === "new") {
			return;
		}

		this.globalsService.request('get', this.taskUrl + this.taskId).subscribe(response => {

			var content = response.json().content;
			this.taskToEdit = content[0] ? content[0] : { _id: null };
		}, error => {

			console.error(error.text());
		});
	}

	getTeachers() {

		this.globalsService.request('get', this.teacherUrl).subscribe(response => {

			var content = response.json().content;
			if (!content) {
				return;
			}

			this.teacher = [];

			this.teacherList = content.map((function(currentValue, index, array) {

				var teacher = this.taskToEdit.teacher,
					teacherObj = {
						id: currentValue._id,
						text: currentValue.surname + ", " + currentValue.firstName
					};

				if (teacher === teacherObj.id) {
					this.teacher.push(teacherObj);
				}

				return teacherObj;
			}).bind(this));
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

			this.subject = [];

			this.subjectList = content.map((function(currentValue, index, array) {

				var subject = this.taskToEdit.subject,
					subjectObj = {
						id: currentValue._id,
						text: currentValue.name
					};

				if (subject === subjectObj.id) {
					this.subject.push(subjectObj);
				}

				return subjectObj;
			}).bind(this));
		}, error => {

			console.error(error.text());
		});
	}

	add(task) {

		let body = JSON.stringify({ data: task });

		this.globalsService.request('post', this.taskUrl, {
			body: body
		}).subscribe(response => {

			this.getTask();
		}, error => {

			console.error(error.text());
		});
	}

	update(task) {

		let body = JSON.stringify({ data: task });

		this.globalsService.request('put', this.taskUrl + task._id, { body: body }).subscribe(response => {

			this.getTask();
		}, error => {

			console.error(error.text());
		});
	}

	onTaskTestUploaded(filename: string) {

		this.taskToEdit.evaluationTest = filename;
	}

	onTaskAttachedUploaded(filename: string) {

		this.taskToEdit.attached = filename;
	}
}
