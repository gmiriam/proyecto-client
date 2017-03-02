import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {GlobalsService} from '../globals.service';
import {Score} from './score';

@Component({
	selector: 'scoreEdition',
	templateUrl: 'src/app/html/score/edition.html'
})

export class ScoreEdition {
	params;
	subjectId: string;
	scoreId: string;
	scoreToEdit: Score = new Score();
	scoreForm: FormGroup;
	scoreUrl: string;

	constructor(public router: Router, fb: FormBuilder, private globalsService: GlobalsService,
		private route: ActivatedRoute) {

		this.route.params.subscribe((params: Params) => {
			this.params = params;
		});
		this.subjectId = this.params['subjectid'];
		this.scoreId = this.params['scoreid'];

		this.scoreUrl = globalsService.apiUrl + 'score/';

		this.scoreForm = fb.group({
			finalScore: ["", Validators.required]
		});

		this.getScore();
	}

	onSubmit(event) {

		let value = this.scoreToEdit;

		this.update(value)
	}

	getScore() {

		this.globalsService.request('get', this.scoreUrl + this.scoreId, {
			urlParams: this.params
		}).subscribe(response => {

			var content = response.json().content;
			this.scoreToEdit = content[0] ? content[0] : { _id: null };
		}, error => {

			console.error(error.text());
		});
	}

	update(score) {

		let body = JSON.stringify({ data: score });

		this.globalsService.request('put', this.scoreUrl + score._id, {
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
		this.router.navigate(['subject', this.subjectId, 'score', this.scoreId]);
	}
}
