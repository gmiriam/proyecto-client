import { Component } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {GlobalsService} from '../globals.service';
import {Score} from './score';

@Component({
	selector: 'scoreList',
	templateUrl: 'src/app/html/score/list.html',
	providers: [GlobalsService]
})

export class ScoreList {
	scoreList: Score[];
	scoreUrl: string;
	subjectId: string;
	studentId: string;

	constructor(public http: Http, public router: Router, globalsService: GlobalsService, private route: ActivatedRoute) {

		this.route.params.subscribe((params: Params) => {
			this.subjectId = params['subjectid'];
			this.studentId = params['studentId'];
		});

		this.scoreUrl = globalsService.apiUrl + 'score';
		this.getScores();
	}

	getScores() {

		var url = this.scoreUrl,
			queryParams = '';

		if (this.subjectId) {
			queryParams += (queryParams.length ? '&' : '?') + 'subjectid=' + this.subjectId;
		}

		if (this.studentId) {
			queryParams += (queryParams.length ? '&' : '?') + 'studentid=' + this.studentId;
		}

		url += queryParams;

		this.http.get(url).subscribe(
			response => {
				var content = response.json().content;
				this.scoreList = content;
			},
			error => {
				console.error(error.text());
			});
	}

	viewItem(evt, id) {

		this.router.navigate(['score', id]);
	}

	editItem(evt, id) {

		this.router.navigate(['score', id, "edit"]);
	}
}
