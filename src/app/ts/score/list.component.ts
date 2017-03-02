import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import {GlobalsService} from '../globals.service';
import {Score} from './score';

@Component({
	selector: 'scoreList',
	templateUrl: 'src/app/html/score/list.html'
})

export class ScoreList {
	params;
	subjectId: string;
	studentId;
	scoreList: Score[];
	scoreUrl: string;

	constructor(public router: Router, private globalsService: GlobalsService, private route: ActivatedRoute,
		private localStorageService: LocalStorageService) {

		this.route.params.subscribe((params: Params) => {
			this.params = params;
		});
		this.subjectId = this.params['subjectid'];

		this.scoreUrl = globalsService.apiUrl + 'score';
		this.getScores();
	}

	getScores() {

		var url = this.scoreUrl + '?studentid=' + this.localStorageService.get('userId'),
			queryParams = '';

		if (this.subjectId) {
			queryParams += '&subjectid=' + this.subjectId;
		}

		if (this.studentId) {
			queryParams += '&studentid=' + this.studentId;
		}

		url += queryParams;

		this.globalsService.request('get', url, {
			urlParams: this.params
		}).subscribe(
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
