import { Component } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import {GlobalsService} from '../globals.service';
import {Student} from './student';

@Component({
	selector: 'studentList',
	templateUrl: 'src/app/html/student/list.html',
	//styleUrls: ['./login.css'],
	providers: [GlobalsService]
})

export class StudentList {
	studentList: Student[];
	studentUrl: string;

	constructor(public http: Http, public router: Router, globalsService: GlobalsService) {
		this.studentUrl = globalsService.apiUrl + 'student';
		this.getStudents();
	}

	getStudents() {

		var url = this.studentUrl;

		this.http.get(url).subscribe(
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

		var confirmed = window.confirm("Are you sure?");

		if (!confirmed) {
			return;
		}

		this.http.delete(this.studentUrl + '/' + id).subscribe(
			response => {
				console.log("borrado", id);
				this.getStudents();
			},
			error => {
				console.error(error.text());
			});
	}
}
