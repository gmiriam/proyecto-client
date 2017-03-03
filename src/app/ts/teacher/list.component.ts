import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import {GlobalsService} from '../globals.service';
import {Teacher} from './teacher';

@Component({
	selector: 'teacherList',
	templateUrl: 'src/app/html/teacher/list.html'
})

export class TeacherList {
	params;
	teacherList: Teacher[];
	teacherUrl: string;

	constructor(public router: Router, private route: ActivatedRoute, private globalsService: GlobalsService,
		private localStorageService: LocalStorageService) {

		this.teacherUrl = globalsService.apiUrl + 'user';
		this.getTeachers();
	}

	getTeachers() {

		var url = this.teacherUrl + '?role=teacher';

		this.globalsService.request('get', url, {
			urlParams: this.params
		}).subscribe(
			response => {
				var content = response.json().content;
				this.teacherList = content;
			},
			error => {
				console.error(error.text());
			});
	}

	viewItem(evt, id) {

		this.router.navigate([id], { relativeTo: this.route });
	}

	addItem(evt) {

		this.router.navigate(['new', 'edit'], { relativeTo: this.route });
	}
}
