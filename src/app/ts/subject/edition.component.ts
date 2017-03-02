import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {GlobalsService} from '../globals.service';
import {Subject} from './subject';

@Component({
	selector: 'subjectEdition',
	templateUrl: 'src/app/html/subject/edition.html'
})

export class SubjectEdition {
	params;
	subjectId: string;
	subjectToEdit: Subject = new Subject();
	subjectForm: FormGroup;
	subjectUrl: string;
	teacherUrl: string;
	teacherList;
	teachers;
	temaryFileTarget: string;

	constructor(public router: Router, fb: FormBuilder, private globalsService: GlobalsService,
		private route: ActivatedRoute) {

		this.route.params.subscribe((params: Params) => {

			this.params = params;
		});

		this.subjectId = this.params['subjectid'];

		this.subjectUrl = globalsService.apiUrl + 'subject/';
		this.teacherUrl = globalsService.apiUrl + 'user?role=teacher';

		this.subjectForm = fb.group({
			_id: [""],
			name: ["", Validators.required],
			description: [""],
			temary: [""],
			teachers: [""]
		});

		this.temaryFileTarget = 'temaries';

		this.getSubject();
	}

	onChangeTeachers(event) {

		this.subjectToEdit.teachers = event;
	}

	onSubmit(event) {

		let value = this.subjectToEdit;

		if (value._id){
			this.update(value)
		} else {
			this.add(value)
		}
	}

	getSubject() {

		if (this.subjectId === "new") {
			this.getTeachers();
			return;
		}

		this.globalsService.request('get', this.subjectUrl + this.subjectId, {
			urlParams: this.params
		}).subscribe(response => {

			var content = response.json().content;
			this.subjectToEdit = content[0] ? content[0] : { _id: null };
			this.getTeachers();
		}, error => {

			console.error(error.text());
		});
	}

	getTeachers() {

		this.globalsService.request('get', this.teacherUrl, {
			urlParams: this.params
		}).subscribe(response => {

			var content = response.json().content;
			if (!content) {
				return;
			}

			this.teachers = [];

			this.teacherList = content.map((function(currentValue, index, array) {

				var teachers = this.subjectToEdit.teachers,
					teacherObj = {
						id: currentValue._id,
						text: currentValue.surname + ", " + currentValue.firstName
					};

				if (teachers && teachers.indexOf(teacherObj.id) !== -1) {
					this.teachers.push(teacherObj);
				}

				return teacherObj;
			}).bind(this));
		}, error => {

			console.error(error.text());
		});
	}

	add(subject) {

		let body = JSON.stringify({ data: subject });

		this.globalsService.request('post', this.subjectUrl, {
			urlParams: this.params,
			body: body
		}).subscribe(response => {

			this.finishEdition();
		}, error => {

			console.error(error.text());
		});
	}

	update(subject) {

		let body = JSON.stringify({ data: subject });

		this.globalsService.request('put', this.subjectUrl + subject._id, {
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

		var paths = ['subject'];
		if (this.subjectId !== 'new') {
			paths.push(this.subjectId);
		}

		this.router.navigate(paths);
	}

	onSubjectTemaryUploaded(filename: string) {

		this.subjectToEdit.temary = filename;
	}
}
