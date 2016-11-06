import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';


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
  //  styleUrls: ['./login.css']
})
export class Teachers {
	teacherList: Object[];
	teacherToEdit: Teacher;
	formEnable: boolean;
	teacherForm: FormGroup;

	constructor(public router: Router, public http: Http, fb: FormBuilder) {
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
	  this.http.get('http://localhost:3000/teacher/findAll')
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

	    this.http.post('http://localhost:3000/teacher/add', body, { headers: headers })
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

	    this.http.put('http://localhost:3000/teacher/update/' + teacher._id, body, { headers: headers })
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
	this.http.delete('http://localhost:3000/teacher/delete/' + teacher._id)
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