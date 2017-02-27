import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {GlobalsService} from '../globals.service';
import {Student} from './student';

@Component({
	selector: 'studentList',
	templateUrl: 'src/app/html/student/list.html'
})

export class StudentList {
	params;
	studentList: Student[];
	studentUrl: string;

	constructor(public router: Router, private globalsService: GlobalsService) {

		this.studentUrl = globalsService.apiUrl + 'user';
		this.getStudents();
	}

	getStudents() {

		var url = this.studentUrl + '?role=student';

		this.globalsService.request('get', url, {
			urlParams: this.params
		}).subscribe(
			response => {
				var content = response.json().content;
				this.studentList = content;
			},
			error => {
				console.error(error.text());
			});
	}

	addItem(evt) {
		this.router.navigate(['student', "new"]);
	}

	editItem(evt, id) {
		this.router.navigate(['student', id]);
	}

	deleteItem(evt, id) {

		var confirmed = window.confirm("Está seguro?");

		if (!confirmed) {
			return;
		}

		this.globalsService.request('delete', this.studentUrl + '/' + id, {
			urlParams: this.params
		}).subscribe(
			response => {
				this.getStudents();
			},
			error => {
				console.error(error.text());
			});
	}
}
