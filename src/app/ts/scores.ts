import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import {GlobalsService} from './globals.service';

export class Score {
	_id: string;
	student: string;
	subject: string;
	finalScore: string;
}

@Component({
	selector: 'scores',
  	templateUrl: 'src/app/html/scores.html',
  //  styleUrls: ['./login.css'],
   	providers: [GlobalsService]

})
export class Scores {
	scoreList: Object[];
	scoreToEdit: Score;
	formEnable: boolean;
	scoreForm: FormGroup;
	scoreUrl: string;

	constructor(public http: Http, fb: FormBuilder, globalsService: GlobalsService) {
		this.scoreUrl = globalsService.apiUrl + 'score/';
		this.getScores();
		this.scoreForm = fb.group({
			_id:[""],
	    	student: ["", Validators.required],
	    	subject: [""],
	    	finalScore: [""],
		});
	}

	showForm(event, score) {
		this.scoreToEdit = score ? score : { _id: null };
		this.formEnable = true;
	}

  	onSubmit(event) {
		this.formEnable = false;
		let value = this.scoreToEdit;
		if (value._id){
			this.update(value)
		}
		else {
			this.add(value)
		}
	}
	getScores() {
	  this.http.get(this.scoreUrl + 'findAll')
		.subscribe(
          response => {
			  var content = response.json().content;
			  this.scoreList = content;

			  for (var i = 0; i < content.length; i++) {
				  var data = content[i];
				  for (var key in data) {
					  console.log(key, data[key])
				  }
			  }
          	  console.log(response.json())
		  },
		  error => {
			  console.error(error.text());
		  }
 	  );
  }

	add(score) {
		let body = JSON.stringify(score);
	    let headers = new Headers();
	    headers.append('Content-Type', 'application/json');

	    this.http.post(this.scoreUrl + 'add', body, { headers: headers })
	      .subscribe(
	        response => {
	          console.log(response)
				this.getScores();

	        },
	        error => {
	          alert(error.text());
	          console.log(error.text());
	        }
	      );
	}



	update(score) {
		let body = JSON.stringify(score);
	    let headers = new Headers();
	    headers.append('Content-Type', 'application/json');

	    this.http.put(this.scoreUrl + 'update/' + score._id, body, { headers: headers })
	      .subscribe(
	        response => {
	          console.log(response)
				this.getScores();

	        },
	        error => {
	          alert(error.text());
	          console.log(error.text());
	        }
	      );
	}


  delete(score, event) {
	this.http.delete(this.scoreUrl + 'delete/' + score._id)
	  	.subscribe(
          response => {
			  var status = response.json().status;
          	  console.log(status)
          	  if(status == "success") {
          	  	alert("Se ha borrado con éxito")
				this.getScores();
			  }
		},
		error => {
			  console.error(error.text());
		  }
 	  );
  }
}