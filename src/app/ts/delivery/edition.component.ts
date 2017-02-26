import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {GlobalsService} from '../globals.service';
import {Delivery} from './delivery';

@Component({
	selector: 'deliveryEdition',
	templateUrl: 'src/app/html/delivery/edition.html'
})

export class DeliveryEdition {
	deliveryId: string;
	deliveryToEdit: Delivery = new Delivery();
	deliveryForm: FormGroup;
	deliveryUrl: string;
	taskUrl: string;
	studentUrl: string;
	dataFileTarget: string;
	taskList;
	task;
	studentList;
	student;

	constructor(fb: FormBuilder, private globalsService: GlobalsService, private route: ActivatedRoute) {

		this.route.params.subscribe((params: Params) => {
			this.deliveryId = params['id'];
		});

		this.deliveryUrl = globalsService.apiUrl + 'delivery/';
		this.taskUrl = globalsService.apiUrl + 'task';
		this.studentUrl = globalsService.apiUrl + 'user?role=student';

		this.deliveryForm = fb.group({
			_id:[""],
			task: ["", Validators.required],
			student: [""],
			score: [""],
			data: [""]
		});

		this.dataFileTarget = 'deliveries';

		this.getDelivery();
		this.getTasks();
		this.getStudents();
	}

	onChangeTask(event) {

		this.deliveryToEdit.task = event;
	}

	onChangeStudent(event) {

		this.deliveryToEdit.student = event;
	}

	onSubmit(event) {

		let value = this.deliveryToEdit;

		if (value._id){
			this.update(value)
		} else {
			this.add(value)
		}
	}

	getDelivery() {

		if (this.deliveryId === "new") {
			return;
		}

		this.globalsService.request('get', this.deliveryUrl + this.deliveryId).subscribe(response => {

			var content = response.json().content;
			this.deliveryToEdit = content[0] ? content[0] : { _id: null };
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

			this.task = [];

			this.taskList = content.map((function(currentValue, index, array) {

				var task = this.deliveryToEdit.task,
					taskObj = {
						id: currentValue._id,
						text: currentValue.name
					};

				if (task === taskObj.id) {
					this.task.push(taskObj);
				}

				return taskObj;
			}).bind(this));
		}, error => {

			console.error(error.text());
		});
	}

	getStudents() {

		this.globalsService.request('get', this.studentUrl).subscribe(response => {

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

			console.error(error.text());
		});
	}

	add(delivery) {

		let body = JSON.stringify({ data: delivery });

		this.globalsService.request('post', this.deliveryUrl, { body: body }).subscribe(response => {

			this.getDelivery();
		}, error => {

			console.error(error.text());
		});
	}

	update(delivery) {

		let body = JSON.stringify({ data: delivery });

		//let url = this.deliveryUrl + delivery._id + "/updatedata";
		let url = this.deliveryUrl + delivery._id + "/updatescore";
		this.globalsService.request('put', url, { body: body }).subscribe(response => {

			this.getDelivery();
		}, error => {

			console.error(error.text());
		});
	}

	onDeliveryDataUploaded(filename: string) {

		this.deliveryToEdit.data = filename;
	}
}
