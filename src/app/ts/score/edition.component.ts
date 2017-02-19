import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {GlobalsService} from '../globals.service';
import {Score} from './score';

@Component({
	selector: 'scoreEdition',
	templateUrl: 'src/app/html/score/edition.html',
	providers: [GlobalsService]
})

export class ScoreEdition {
	scoreId: string;
	scoreToEdit: Score = new Score();
	scoreForm: FormGroup;
	scoreUrl: string;

	constructor(public http: Http, fb: FormBuilder, globalsService: GlobalsService, private route: ActivatedRoute) {

		this.route.params.subscribe((params: Params) => {
			this.scoreId = params['id'];
		});

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

		this.http.get(this.scoreUrl + this.scoreId).subscribe(response => {

			var content = response.json().content;
			this.scoreToEdit = content[0] ? content[0] : { _id: null };
		}, error => {

			console.error(error.text());
		});
	}

	update(score) {

		let body = JSON.stringify({ data: score });
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		this.http.put(this.scoreUrl + score._id, body, { headers: headers }).subscribe(response => {

			this.getScore();
		}, error => {

			console.error(error.text());
		});
	}
}
