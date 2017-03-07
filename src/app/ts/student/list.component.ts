import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
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

	constructor(public router: Router, private route: ActivatedRoute, private globalsService: GlobalsService,
		private localStorageService: LocalStorageService) {

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
				this.globalsService.showError(error);
			});
	}

	viewItem(evt, id) {

		this.router.navigate([id], { relativeTo: this.route });
	}

	addItem(evt) {

		this.router.navigate(['new', 'edit'], { relativeTo: this.route });
	}

	goBack(evt) {

		this.router.navigate(['home']);
	}
}
