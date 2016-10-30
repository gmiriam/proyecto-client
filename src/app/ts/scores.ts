import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators } from '@angular/common';
import { Http, Headers, Response } from '@angular/http';


export class Score {
	_id: string;
	student: string;
	subject: string;
	finalScore: string;
}

@Component({
	selector: 'scores',
	directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES ],
  	templateUrl: 'src/app/html/scores.html',
  //  styleUrls: ['./login.css']
})
export class Scores {
	scoreList: Object[];
	scoreToEdit: Score;
	formEnable: boolean;
	scoreForm: ControlGroup;

	constructor(public router: Router, public http: Http, fb: FormBuilder) {
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
	  this.http.get('http://localhost:3000/score/findAll')
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

	    this.http.post('http://localhost:3000/score/add', body, { headers: headers })
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

	    this.http.put('http://localhost:3000/score/update/' + score._id, body, { headers: headers })
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
	this.http.delete('http://localhost:3000/score/delete/' + score._id)
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