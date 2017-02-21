import { Component } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import {GlobalsService} from '../globals.service';
import {Subject} from './subject';

@Component({
	selector: 'subjectList',
	templateUrl: 'src/app/html/subject/list.html'
})

export class SubjectList {
	subjectList: Subject[];
	subjectUrl: string;

	constructor(public http: Http, public router: Router, globalsService: GlobalsService) {

		this.subjectUrl = globalsService.apiUrl + 'subject';
		this.getSubjects();
	}

	getSubjects() {

		var url = this.subjectUrl;

		this.http.get(url).subscribe(
			response => {
				var content = response.json().content;
				this.subjectList = content;
			},
			error => {
				console.error(error.text());
			});
	}

	viewItem(evt, id) {

		this.router.navigate(['subject', id]);
	}

	addItem(evt) {
		this.router.navigate(['subject', "new", "edit"]);
	}

	editItem(evt, id) {
		this.router.navigate(['subject', id, "edit"]);
	}

	deleteItem(evt, id) {

		var confirmed = window.confirm("Está seguro?");

		if (!confirmed) {
			return;
		}

		this.http.delete(this.subjectUrl + '/' + id).subscribe(
			response => {
				this.getSubjects();
			},
			error => {
				console.error(error.text());
			});
	}
}
