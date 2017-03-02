import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import {GlobalsService} from '../globals.service';
import {Delivery} from './delivery';

@Component({
	selector: 'deliveryEdition',
	templateUrl: 'src/app/html/delivery/edition.html'
})

export class DeliveryEdition {
	params;
	subjectId: string;
	taskId: string;
	deliveryId: string;
	deliveryToEdit: Delivery = new Delivery();
	deliveryForm: FormGroup;
	deliveryUrl: string;
	studentUrl: string;
	dataFileTarget: string;
	studentList;
	student;

	constructor(public router: Router, fb: FormBuilder, private globalsService: GlobalsService,
		private route: ActivatedRoute, private localStorageService: LocalStorageService) {

		this.route.params.subscribe((params: Params) => {
			this.params = params;
		});
		this.subjectId = this.params['subjectid'];
		this.taskId = this.params['taskid'];
		this.deliveryId = this.params['deliveryid'];

		this.deliveryUrl = globalsService.apiUrl + 'delivery/';
		this.studentUrl = globalsService.apiUrl + 'user?role=student';

		this.deliveryForm = fb.group({
			_id:[""],
			student: [""],
			score: [""],
			data: [""]
		});

		this.dataFileTarget = 'deliveries';

		this.getDelivery();
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
			this.deliveryToEdit.task = this.taskId;
			this.getStudents();
			return;
		}

		this.globalsService.request('get', this.deliveryUrl + this.deliveryId, {
			urlParams: this.params
		}).subscribe(response => {

			var content = response.json().content;
			this.deliveryToEdit = content[0] ? content[0] : { _id: null };
			this.getStudents();
		}, error => {

			console.error(error.text());
		});
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

			console.error(error.text());
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

			console.error(error.text());
		});
	}

	update(delivery) {

		let body = JSON.stringify({ data: delivery });

		// TODO dividir en 2 componentes de edición, uno para nota y otro para data
		//let url = this.deliveryUrl + delivery._id + "/updatedata";
		let url = this.deliveryUrl + delivery._id + "/updatescore";

		this.globalsService.request('put', url, {
			urlParams: this.params,
			body: body
		}).subscribe(response => {

			this.finishEdition();
		}, error => {

			console.error(error.text());
		});
	}

	onDeliveryDataUploaded(filename: string) {

		this.deliveryToEdit.data = filename;
	}

	finishEdition(event?) {

		event && event.preventDefault();

		var paths = ['subject', this.subjectId, 'task', this.taskId, 'delivery'];
		if (this.deliveryId !== 'new') {
			paths.push(this.deliveryId);
		}

		this.router.navigate(paths);
	}
}
