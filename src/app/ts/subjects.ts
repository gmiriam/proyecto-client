import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import {GlobalsService} from './globals.service';


export class Subject {
	_id: string;
	name: string;
	description: string;
	temary: string;
}

@Component({
	selector: 'subjects',
  	templateUrl: 'src/app/html/subjects.html',
  //  styleUrls: ['./login.css'],
   	providers: [GlobalsService]

})
export class Subjects {
	subjectList: Object[];
	subjectToEdit: Subject;
	formEnable: boolean;
	subjectForm: FormGroup;
	subjectUrl: string;

	constructor(public http: Http, fb: FormBuilder, globalsService: GlobalsService) {
		this.subjectUrl = globalsService.apiUrl + 'subject/';
		this.getSubjects();
		this.subjectForm = fb.group({
			_id:[""],
	    	name: ["", Validators.required],
	    	description: [""],
	    	temary: [""],
		});
	}

	showForm(event, subject) {
		this.subjectToEdit = subject ? subject : { _id: null };
		this.formEnable = true;
	}

  	onSubmit(event) {
		this.formEnable = false;
		let value = this.subjectToEdit;
		if (value._id){
			this.update(value)
		}
		else {
			this.add(value)
		}
	}
	getSubjects() {
	  this.http.get(this.subjectUrl + 'findAll')
		.subscribe(
          response => {
			  var content = response.json().content;
			  this.subjectList = content;

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

	add(subject) {
		let body = JSON.stringify(subject);
	    let headers = new Headers();
	    headers.append('Content-Type', 'application/json');

	    this.http.post(this.subjectUrl + 'add', body, { headers: headers })
	      .subscribe(
	        response => {
	          console.log(response)
				this.getSubjects();

	        },
	        error => {
	          alert(error.text());
	          console.log(error.text());
	        }
	      );
	}



	update(subject) {
		let body = JSON.stringify(subject);
	    let headers = new Headers();
	    headers.append('Content-Type', 'application/json');

	    this.http.put(this.subjectUrl + 'update/' + subject._id, body, { headers: headers })
	      .subscribe(
	        response => {
	          console.log(response)
				this.getSubjects();

	        },
	        error => {
	          alert(error.text());
	          console.log(error.text());
	        }
	      );
	}


  delete(subject, event) {
	this.http.delete(this.subjectUrl + 'delete/' + subject._id)
	  	.subscribe(
          response => {
			  var status = response.json().status;
          	  console.log(status)
          	  if(status == "success") {
          	  	alert("Se ha borrado con éxito")
				this.getSubjects();
			  }
		},
		error => {
			  console.error(error.text());
		  }
 	  );
  }
}