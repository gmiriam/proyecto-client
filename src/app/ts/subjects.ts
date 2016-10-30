import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators } from '@angular/common';
import { Http, Headers, Response } from '@angular/http';


export class Subject {
	_id: string;
	name: string;
	description: string;
	temary: string;
}

@Component({
	selector: 'subjects',
	directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES ],
  	templateUrl: 'src/app/html/subjects.html',
  //  styleUrls: ['./login.css']
})
export class Subjects {
	subjectList: Object[];
	subjectToEdit: Subject;
	formEnable: boolean;
	subjectForm: ControlGroup;

	constructor(public router: Router, public http: Http, fb: FormBuilder) {
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
	  this.http.get('http://localhost:3000/subject/findAll')
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

	    this.http.post('http://localhost:3000/subject/add', body, { headers: headers })
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

	    this.http.put('http://localhost:3000/subject/update/' + subject._id, body, { headers: headers })
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
	this.http.delete('http://localhost:3000/subject/delete/' + subject._id)
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