import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import {GlobalsService} from './globals.service';


export class Teacher {
	_id: string;
	firstName: string;
	surname: string;
	email: string;
	password: string;
	subjects: string;
}

@Component({
	selector: 'teachers',
  	templateUrl: 'src/app/html/teachers.html',
  //  styleUrls: ['./login.css'],
   	providers: [GlobalsService]
})
export class Teachers {
	teacherList: Object[];
	teacherToEdit: Teacher;
	formEnable: boolean;
	teacherForm: FormGroup;
	teacherUrl: string;

	constructor(public http: Http, fb: FormBuilder, globalsService: GlobalsService) {
		this.teacherUrl = globalsService.apiUrl + 'teacher/';
		this.getTeachers();
		this.teacherForm = fb.group({
			_id:[""],
	    	firstName: ["", Validators.required],
	    	surname: [""],
	    	email: [""],
	    	password: ["", Validators.required],
	    	subjects: [""],
		});
	}

	showForm(event, teacher) {
		this.teacherToEdit = teacher ? teacher : { _id: null };
		this.formEnable = true;
	}

  	onSubmit(event) {
		this.formEnable = false;
		let value = this.teacherToEdit;
		if (value._id){
			this.update(value)
		}
		else {
			this.add(value)
		}
	}
	getTeachers() {
	  this.http.get(this.teacherUrl + 'findAll')
		.subscribe(
          response => {
			  var content = response.json().content;
			  this.teacherList = content;

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

	add(teacher) {
		let body = JSON.stringify(teacher);
	    let headers = new Headers();
	    headers.append('Content-Type', 'application/json');

	    this.http.post(this.teacherUrl + 'add', body, { headers: headers })
	      .subscribe(
	        response => {
	          console.log(response)
				this.getTeachers();

	        },
	        error => {
	          alert(error.text());
	          console.log(error.text());
	        }
	      );
	}



	update(teacher) {
		let body = JSON.stringify(teacher);
	    let headers = new Headers();
	    headers.append('Content-Type', 'application/json');

	    this.http.put(this.teacherUrl + 'update/' + teacher._id, body, { headers: headers })
	      .subscribe(
	        response => {
	          console.log(response)
				this.getTeachers();

	        },
	        error => {
	          alert(error.text());
	          console.log(error.text());
	        }
	      );
	}


  delete(teacher, event) {
	this.http.delete(this.teacherUrl + 'delete/' + teacher._id)
	  	.subscribe(
          response => {
			  var status = response.json().status;
          	  console.log(status)
          	  if(status == "success") {
          	  	alert("Se ha borrado con éxito")
				this.getTeachers();
			  }
		},
		error => {
			  console.error(error.text());
		  }
 	  );
  }
}