import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import {GlobalsService} from '../globals.service';
import {Teacher} from './teacher';

@Component({
	selector: 'teacherView',
	templateUrl: 'src/app/html/teacher/view.html'
})

export class TeacherView {
	params;
	teacherId: string;
	teacherToView: Teacher = new Teacher();
	teacherUrl: string;

	constructor(public router: Router, private globalsService: GlobalsService, private route: ActivatedRoute,
		private localStorageService: LocalStorageService) {

		this.route.params.subscribe((params: Params) => {
			this.params = params;
		});
		this.teacherId = this.params['userid'];

		this.teacherUrl = globalsService.apiUrl + 'user/';

		this.getTeacher();
	}

	getTeacher() {

		this.globalsService.request('get', this.teacherUrl + this.teacherId, {
			urlParams: this.params
		}).subscribe(
			(this.onTeacherResponse).bind(this),
			error => {

				this.globalsService.showError(error);
			});
	}

	onTeacherResponse(response) {

		var content = response.json().content;
		this.teacherToView = content[0] ? content[0] : { _id: null };
	}

	editItem(evt, id) {

		this.router.navigate(['edit'], { relativeTo: this.route });
	}

	deleteItem(evt, id) {

		var confirmed = window.confirm("Está a punto de eliminar este profesor, ¿está seguro?");

		if (!confirmed) {
			return;
		}

		this.globalsService.request('delete', this.teacherUrl + id, {
			urlParams: this.params
		}).subscribe(
			response => {
				this.router.navigate(['teacher']);
			},
			error => {
				this.globalsService.showError(error);
			});
	}

	goBack(evt) {

		this.router.navigate(['teacher']);
	}
}
