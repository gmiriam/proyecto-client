import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import {GlobalsService} from '../globals.service';
import {Delivery} from './delivery';

@Component({
	selector: 'deliveryCreation',
	templateUrl: 'src/app/html/delivery/creation.html'
})

export class DeliveryCreation {
	params;
	subjectId: string;
	taskId: string;
	deliveryId: string;
	deliveryToEdit: Delivery = new Delivery();
	deliveryForm: FormGroup;
	subjectUrl: string;
	deliveryUrl: string;
	studentUrl: string;
	userUrl: string;
	dataFileTarget: string;
	studentList;
	student;
	userId;
	userRole;
	userIsTeacherInSubject;
	userIsStudentInSubjectAndHasTaskAssigned;

	constructor(public router: Router, fb: FormBuilder, private globalsService: GlobalsService,
		private route: ActivatedRoute, private localStorageService: LocalStorageService) {

		this.route.params.subscribe((params: Params) => {
			this.params = params;
		});
		this.subjectId = this.params['subjectid'];
		this.taskId = this.params['taskid'];
		this.deliveryId = this.params['deliveryid'];

		this.userId = this.localStorageService.get('userId');
		this.userRole = this.localStorageService.get('userRole');

		this.subjectUrl = globalsService.apiUrl + 'subject/';
		this.deliveryUrl = globalsService.apiUrl + 'delivery/';
		this.studentUrl = globalsService.apiUrl + 'user?assignedtaskid=' + this.taskId;
		this.userUrl = globalsService.apiUrl + 'user/';

		this.deliveryForm = fb.group({
			_id:[""],
			student: [""],
			data: [""]
		});

		this.dataFileTarget = 'deliveries';

		this.getSubject();
	}

	getSubject() {

		this.globalsService.request('get', this.subjectUrl + this.subjectId, {
			urlParams: this.params
		}).subscribe(
			(this.onSubjectResponse).bind(this),
			error => {

				this.globalsService.showError(error);
			});
	}

	onSubjectResponse(response) {

		var content = response.json().content,
			subject = content[0] ? content[0] : { _id: null };

		var teachers = subject.teachers,
			userId = this.userId;

		if (teachers) {
			this.userIsTeacherInSubject = teachers.indexOf(userId) !== -1;
		}

		this.getDelivery();
		this.getUser();
	}

	onChangeStudent(event) {

		this.deliveryToEdit.student = event;
	}

	onSubmit(event) {

		let value = this.deliveryToEdit;

		this.add(value)
	}

	getDelivery() {

		this.deliveryToEdit.task = this.taskId;

		if (this.userRole === 'admin') {
			this.getStudents();
		} else if (!this.userIsTeacherInSubject) {
			this.deliveryToEdit.student = this.userId;
		}
	}

	getUser() {

		this.globalsService.request('get', this.userUrl + this.userId, {
			urlParams: this.params
		}).subscribe(
			(this.onUserResponse).bind(this),
			error => {

				this.globalsService.showError(error);
			});
	}

	onUserResponse(response) {

		var content = response.json().content,
			user = content[0],
			enrolledSubjects = user.enrolledSubjects || [],
			assignedTasks = user.assignedTasks || [];

		this.userIsStudentInSubjectAndHasTaskAssigned = enrolledSubjects.indexOf(this.subjectId) !== -1 &&
			assignedTasks.indexOf(this.taskId) !== -1;
	}

	getStudents() {

		this.globalsService.request('get', this.studentUrl, {
			urlParams: this.params
		}).subscribe(response => {

			var content = response.json().content;
			if (!content) {
				return;
			}

			this.student = [];

			this.studentList = content.map((function(currentValue, index, array) {

				var student = this.deliveryToEdit.student,
					studentObj = {
						id: currentValue._id,
						text: currentValue.surname + ", " + currentValue.firstName
					};

				if (student === studentObj.id) {
					this.student.push(studentObj);
				}

				return studentObj;
			}).bind(this));
		}, error => {

			this.globalsService.showError(error);
		});
	}

	add(delivery) {

		let body = JSON.stringify({ data: delivery });

		this.globalsService.request('post', this.deliveryUrl, {
			urlParams: this.params,
			body: body
		}).subscribe(response => {

			this.finishEdition();
		}, error => {

			this.globalsService.showError(error);
		});
	}

	onDeliveryDataUploaded(filename: string) {

		this.deliveryToEdit.data = filename;
	}

	finishEdition(event?) {

		event && event.preventDefault();

		var paths = ['subject', this.subjectId, 'task', this.taskId, 'delivery'];
		this.router.navigate(paths);
	}
}
