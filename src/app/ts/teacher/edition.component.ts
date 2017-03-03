import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {GlobalsService} from '../globals.service';
import {Teacher} from './teacher';

@Component({
	selector: 'teacherEdition',
	templateUrl: 'src/app/html/teacher/edition.html'
})

export class TeacherEdition {
	params;
	teacherId: string;
	teacherToEdit: Teacher = new Teacher();
	teacherForm: FormGroup;
	teacherUrl: string;
	roles = ['student', 'teacher', 'admin'];

	constructor(public router: Router, fb: FormBuilder, private globalsService: GlobalsService,
		private route: ActivatedRoute) {

		this.route.params.subscribe((params: Params) => {
			this.params = params;
		});
		this.teacherId = this.params['userid'];
		this.teacherUrl = globalsService.apiUrl + 'user/';

		this.teacherForm = fb.group({
			_id:[""],
			firstName: ["", Validators.required],
			surname: [""],
			email: [""],
			password: ["", Validators.required],
			role: ["", Validators.required]
		});

		this.getTeacher();
	}

	onSubmit(event) {

		let value = this.teacherToEdit;

		if (value._id){
			this.update(value)
		} else {
			this.add(value)
		}
	}

	getTeacher() {

		if (this.teacherId === "new") {
			this.teacherToEdit.role = "teacher";
			return;
		}

		this.globalsService.request('get', this.teacherUrl + this.teacherId, {
			urlParams: this.params
		}).subscribe(response => {

			var content = response.json().content;
			this.teacherToEdit = content.length ? content[0] : { _id: null };
		}, error => {

			console.error(error.text());
		});
	}

	add(teacher) {

		let body = JSON.stringify({ data: teacher });

		this.globalsService.request('post', this.teacherUrl, {
			urlParams: this.params,
			body: body
		}).subscribe(response => {

			this.finishEdition();
		}, error => {

			console.error(error.text());
		});
	}

	update(teacher) {

		let body = JSON.stringify({ data: teacher });

		this.globalsService.request('put', this.teacherUrl + teacher._id, {
			urlParams: this.params,
			body: body
		}).subscribe(response => {

			this.finishEdition();
		}, error => {

			console.error(error.text());
		});
	}

	finishEdition(event?) {

		event && event.preventDefault();

		var paths = ['teacher'];
		if (this.teacherId !== 'new') {
			paths.push(this.teacherId);
		}

		this.router.navigate(paths);
	}
}
