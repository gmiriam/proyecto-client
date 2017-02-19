import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {GlobalsService} from '../globals.service';

@Component({
	selector: 'assignTask',
	templateUrl: 'src/app/html/task/assignTask.html',
	providers: [GlobalsService]
})

export class AssignTask {
	apiUrl: string;
	taskId: string;
	subjectId: string;
	assignTaskForm: FormGroup;
	taskUrl: string;
	enrolledStudentsUrl: string;
	enrolledStudentsWithTaskAssignedUrl: string;
	assignTaskUrl: string;
	unassignTaskUrl: string;
	enrolledStudentList;
	enrolledStudentWithTaskAssignedList;
	originalEnrolledStudentWithTaskAssignedIds;
	enrolledStudentWithTaskAssignedIds;
	enrolledStudentWithoutTaskAssignedIds = [];

	constructor(public http: Http, fb: FormBuilder, globalsService: GlobalsService, private route: ActivatedRoute) {

		this.route.params.subscribe((params: Params) => {
			this.taskId = params['id'];
		});

		this.apiUrl = globalsService.apiUrl;
		this.taskUrl = this.apiUrl + 'task/';

		this.enrolledStudentsWithTaskAssignedUrl = this.apiUrl + 'user?role=student&assignedtaskid=' +
			this.taskId;

		this.assignTaskUrl = this.apiUrl + 'task/assign';
		this.unassignTaskUrl = this.apiUrl + 'task/unassign';

		this.assignTaskForm = fb.group({
			students: ["", Validators.required]
		});

		this.getTask();
	}

	onChangeStudentWithTaskAssigned(event) {

		this.enrolledStudentWithTaskAssignedIds = event;
	}

	onSelectStudentWithTaskAssigned(event) {

		var index = this.enrolledStudentWithoutTaskAssignedIds.indexOf(event);
		if (index !== -1) {
			this.enrolledStudentWithoutTaskAssignedIds.splice(index, 1);
		}
	}

	onRemoveStudentWithTaskAssigned(event) {

		if (this.enrolledStudentWithoutTaskAssignedIds.indexOf(event) === -1 &&
			this.originalEnrolledStudentWithTaskAssignedIds.indexOf(event) !== -1) {

			this.enrolledStudentWithoutTaskAssignedIds.push(event);
		}
	}

	onSubmit(event) {

		this.save();
	}

	getTask() {

		this.http.get(this.taskUrl + this.taskId).subscribe(response => {

			var content = response.json().content[0];
			if (!content) {
				return;
			}

			this.subjectId = content.subject;
			this.enrolledStudentsUrl = this.apiUrl + 'user?role=student&enrolledsubjectid=' + this.subjectId;

			this.getEnrolledStudentsWithTaskAssigned();
		}, error => {

			console.error(error.text());
		});
	}

	getEnrolledStudentsWithTaskAssigned() {

		this.http.get(this.enrolledStudentsWithTaskAssignedUrl).subscribe(response => {

			var content = response.json().content;
			if (!content) {
				return;
			}

			this.originalEnrolledStudentWithTaskAssignedIds = content.map((function(currentValue, index, array) {

				return currentValue._id;
			}).bind(this));
			this.enrolledStudentWithTaskAssignedIds = this.originalEnrolledStudentWithTaskAssignedIds;

			this.getEnrolledStudents();
		}, error => {

			console.error(error.text());
		});
	}

	getEnrolledStudents() {

		this.http.get(this.enrolledStudentsUrl).subscribe(response => {

			var content = response.json().content;
			if (!content) {
				return;
			}

			this.enrolledStudentWithTaskAssignedList = [];

			this.enrolledStudentList = content.map((function(currentValue, index, array) {

				var studentObj = {
						id: currentValue._id,
						text: currentValue.surname + ", " + currentValue.firstName
					};

				if (this.enrolledStudentWithTaskAssignedIds &&
					this.enrolledStudentWithTaskAssignedIds.indexOf(studentObj.id) !== -1) {

					this.enrolledStudentWithTaskAssignedList.push(studentObj);
				}

				return studentObj;
			}).bind(this));
		}, error => {

			console.error(error.text());
		});
	}

	save() {

		if (this.enrolledStudentWithoutTaskAssignedIds.length) {
			this.saveEnrolledStudentWithoutTaskAssigned({
				task: this.taskId,
				students: this.enrolledStudentWithoutTaskAssignedIds
			});
		} else if (this.enrolledStudentWithTaskAssignedIds.length) {
			this.saveEnrolledStudentWithTaskAssigned({
				task: this.taskId,
				students: this.enrolledStudentWithTaskAssignedIds
			});
		}
	}

	saveEnrolledStudentWithoutTaskAssigned(value) {

		let body = JSON.stringify({ data: value });
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		this.http.post(this.unassignTaskUrl, body, { headers: headers }).subscribe(response => {

			this.enrolledStudentWithoutTaskAssignedIds = [];

			if (this.enrolledStudentWithTaskAssignedIds.length) {
				this.saveEnrolledStudentWithTaskAssigned({
					task: this.taskId,
					students: this.enrolledStudentWithTaskAssignedIds
				});
			}
		}, error => {

			console.error(error.text());
		});
	}

	saveEnrolledStudentWithTaskAssigned(value) {

		let body = JSON.stringify({ data: value });
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		this.http.post(this.assignTaskUrl, body, { headers: headers }).subscribe(response => {

			this.originalEnrolledStudentWithTaskAssignedIds = this.enrolledStudentWithTaskAssignedIds;
		}, error => {

			console.error(error.text());
		});
	}
}
