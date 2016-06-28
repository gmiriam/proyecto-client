import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators } from '@angular/common';
import { Http, Headers, Response } from '@angular/http';


@Component({
	selector: 'courses',
	directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES ],
  templateUrl: 'src/app/html/courses.html',
  //  styleUrls: ['./login.css']
})
export class Courses {
	courseList: Object[];
	formEnable: boolean;
	courseForm: ControlGroup;

	constructor(public router: Router, public http: Http, fb: FormBuilder) {
		this.getTasks();
		this.taskForm = fb.group({
			_id:[""],
	    	name: ["", Validators.required],
	    	subjects: [""],
		});
	}
	showForm(event, course) {
  	this.courseForm.controls['_id'].updateValue(course ? course._id : "");
  	this.courseForm.controls['name'].updateValue(course ? course.name : "");
  	this.courseForm.controls['subjects'].updateValue(course ? course.subjects : "");
	this.formEnable = true;
  }

  	onSubmit(event) {
		this.formEnable = false;
		let value = this.courseForm.value;
		if (value._id){
			this.update(value)
		}
		else {
			this.add(value)
		}
	}
	getCourses() {
	  this.http.get('http://localhost:3000/course/findAll')
		.subscribe(
          response => {
			  var content = response.json().content;
			  this.courseList = content;

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

	add(course) {
		let body = JSON.stringify(course);
	    let headers = new Headers();
	    headers.append('Content-Type', 'application/json');

	    this.http.post('http://localhost:3000/course/add', body, { headers: headers })
	      .subscribe(
	        response => {
	          console.log(response)
				this.getCourses();

	        },
	        error => {
	          alert(error.text());
	          console.log(error.text());
	        }
	      );
	}



	update(course) {
		let body = JSON.stringify(course);
	    let headers = new Headers();
	    headers.append('Content-Type', 'application/json');

	    this.http.put('http://localhost:3000/course/update/' + course._id, body, { headers: headers })
	      .subscribe(
	        response => {
	          console.log(response)
				this.getCourses();

	        },
	        error => {
	          alert(error.text());
	          console.log(error.text());
	        }
	      );
	}


  delete(course, event) {
	this.http.delete('http://localhost:3000/course/delete/' + course._id)
	  	.subscribe(
          response => {
			  var status = response.json().status;
          	  console.log(status)
          	  if(status == "success") {
          	  	alert("Se ha borrado con éxito")
				this.getCourses();
			  }
		},
		error => {
			  console.error(error.text());
		  }
 	  );
  }
}