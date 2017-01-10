import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import {GlobalsService} from './globals.service';


export class Course {
	_id: string;
	name: string;
	subjects: string;
}

@Component({
	selector: 'courses',
  templateUrl: 'src/app/html/courses.html',
  //  styleUrls: ['./login.css'],
   	providers: [GlobalsService]
})
export class Courses {
	courseList: Object[];
	courseToEdit: Course;
	formEnable: boolean;
	courseForm: FormGroup;
	courseUrl: string;

	constructor(public http: Http, fb: FormBuilder, globalsService: GlobalsService) {
		this.courseUrl = globalsService.apiUrl + 'course/';
		this.getCourses();
		this.courseForm = fb.group({
			_id:[""],
	    	name: ["", Validators.required],
	    	subjects: [""],
		});
	}

	showForm(event, course) {
		this.courseToEdit = course ? course : { _id: null };
		this.formEnable = true;
	}

  	onSubmit(event) {
		this.formEnable = false;
		let value = this.courseToEdit;
		if (value._id){
			this.update(value)
		}
		else {
			this.add(value)
		}
	}
	getCourses() {
	  this.http.get(this.courseUrl + 'findAll')
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

	    this.http.post(this.courseUrl + 'add', body, { headers: headers })
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

	    this.http.put(this.courseUrl + 'update/' + course._id, body, { headers: headers })
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
	this.http.delete(this.courseUrl + 'delete/' + course._id)
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