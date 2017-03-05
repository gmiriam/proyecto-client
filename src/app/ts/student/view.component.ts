import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import {GlobalsService} from '../globals.service';
import {Student} from './student';

@Component({
	selector: 'studentView',
	templateUrl: 'src/app/html/student/view.html'
})

export class StudentView {
	params;
	studentId: string;
	studentToView: Student = new Student();
	studentUrl: string;

	constructor(public router: Router, private globalsService: GlobalsService, private route: ActivatedRoute,
		private localStorageService: LocalStorageService) {

		this.route.params.subscribe((params: Params) => {
			this.params = params;
		});
		this.studentId = this.params['userid'];

		this.studentUrl = globalsService.apiUrl + 'user/';

		this.getStudent();
	}

	getStudent() {

		this.globalsService.request('get', this.studentUrl + this.studentId, {
			urlParams: this.params
		}).subscribe(
			(this.onStudentResponse).bind(this),
			error => {

				console.error(error.text());
			});
	}

	onStudentResponse(response) {

		var content = response.json().content;
		this.studentToView = content[0] ? content[0] : { _id: null };
	}

	editItem(evt, id) {

		this.router.navigate(['edit'], { relativeTo: this.route });
	}

	deleteItem(evt, id) {

		var confirmed = window.confirm("Está a punto de eliminar este estudiante, ¿está seguro?");

		if (!confirmed) {
			return;
		}

		this.globalsService.request('delete', this.studentUrl + id, {
			urlParams: this.params
		}).subscribe(
			response => {
				this.router.navigate(['student']);
			},
			error => {
				console.error(error.text());
			});
	}

	goBack(evt) {

		this.router.navigate(['student']);
	}
}
