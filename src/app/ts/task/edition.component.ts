import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import {GlobalsService} from '../globals.service';
import {Task} from './task';

@Component({
	selector: 'taskEdition',
	templateUrl: 'src/app/html/task/edition.html'
})

export class TaskEdition {
	params;
	subjectId: string;
	taskId: string;
	taskToEdit: Task = new Task();
	taskForm: FormGroup;
	taskUrl: string;
	teacherUrl: string;
	testFileTarget: string;
	attachedFileTarget: string;
	teacherList;
	teacher;
	userRole;

	constructor(public router: Router, fb: FormBuilder, private globalsService: GlobalsService,
		private route: ActivatedRoute, private localStorageService: LocalStorageService) {

		this.route.params.subscribe((params: Params) => {
			this.params = params;
		});
		this.subjectId = this.params['subjectid'];
		this.taskId = this.params['taskid'];

		this.userRole = this.localStorageService.get('userRole');

		this.taskUrl = globalsService.apiUrl + 'task/';
		this.teacherUrl = globalsService.apiUrl + 'user?subjectid=' + this.subjectId;

		this.taskForm = fb.group({
			_id:[""],
			name: ["", Validators.required],
			statement: ["", Validators.required],
			startDate: ["", Validators.required],
			endDate: [""],
			maxScore: [""],
			teacher: ["", Validators.required],
			evaluationTest: ["", Validators.required],
			attached: [""]
		});

		this.testFileTarget = 'tests';
		this.attachedFileTarget = 'attached';

		this.getTask();
	}

	onChangeTeacher(event) {

		this.taskToEdit.teacher = event;
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
			this.taskToEdit.subject = this.subjectId;
			this.getTeachers();
			return;
		}

		this.globalsService.request('get', this.taskUrl + this.taskId, {
			urlParams: this.params
		}).subscribe(response => {

			var content = response.json().content;
			this.taskToEdit = content[0] ? content[0] : { _id: null };
			this.getTeachers();
		}, error => {

			this.globalsService.showError(error);
		});
	}

	getTeachers() {

		this.globalsService.request('get', this.teacherUrl, {
			urlParams: this.params
		}).subscribe(response => {

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

			this.globalsService.showError(error);
		});
	}

	add(task) {

		let body = JSON.stringify({ data: task });

		this.globalsService.request('post', this.taskUrl, {
			urlParams: this.params,
			body: body
		}).subscribe(response => {

			var content = response.json().content,
				task = content[0];

			this.taskId = task._id;
			this.finishEdition();
		}, error => {

			this.globalsService.showError(error);
		});
	}

	update(task) {

		let body = JSON.stringify({ data: task });

		this.globalsService.request('put', this.taskUrl + task._id, {
			urlParams: this.params,
			body: body
		}).subscribe(response => {

			this.finishEdition();
		}, error => {

			this.globalsService.showError(error);
		});
	}

	onTaskTestUploaded(filename: string) {

		this.taskToEdit.evaluationTest = filename;
	}

	onTaskAttachedUploaded(filename: string) {

		this.taskToEdit.attached = filename;
	}

	finishEdition(event?) {

		if (!event) {
			this.router.navigate(['subject', this.subjectId, 'task', this.taskId, 'assign']);

			return;
		}

		event.preventDefault();

		var paths = ['subject', this.subjectId, 'task'];
		if (this.taskId !== 'new') {
			paths.push(this.taskId);
		}

		this.router.navigate(paths);
	}
}
