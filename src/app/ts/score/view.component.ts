import { Component } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {GlobalsService} from '../globals.service';
import {Score} from './score';

@Component({
	selector: 'scoreView',
	templateUrl: 'src/app/html/score/view.html'
})

export class ScoreView {
	scoreId: string;
	scoreToView: Score = new Score();
	scoreUrl: string;
	subjectUrl: string;
	subjectName: string;
	studentUrl: string;
	studentName: string;

	constructor(public http: Http, public router: Router, globalsService: GlobalsService, private route: ActivatedRoute) {

		this.route.params.subscribe((params: Params) => {
			this.scoreId = params['id'];
		});

		this.scoreUrl = globalsService.apiUrl + 'score/';
		this.subjectUrl = globalsService.apiUrl + 'subject/';
		this.studentUrl = globalsService.apiUrl + 'user?role=student/';

		this.getScore();
	}

	getScore() {

		this.http.get(this.scoreUrl + this.scoreId).subscribe(
			(this.onScoreResponse).bind(this),
			error => {

				console.error(error.text());
			});
	}

	onScoreResponse(response) {

		var content = response.json().content;
		this.scoreToView = content[0] ? content[0] : { _id: null };

		var student = this.scoreToView.student;
		if (student) {
			this.getStudent(student);
		}

		var subject = this.scoreToView.subject;
		if (subject) {
			this.getSubject(subject);
		}
	}

	getStudent(id) {

		this.http.get(this.studentUrl + id).subscribe(
			response => {

				var content = response.json().content[0];
				this.studentName = content.surname + ", " + content.firstName;
			}, error => {

				console.error(error.text());
			});
	}

	getSubject(id) {

		this.http.get(this.subjectUrl + id).subscribe(
			response => {

				var content = response.json().content[0];
				this.subjectName = content.name;
			}, error => {

				console.error(error.text());
			});
	}
}
