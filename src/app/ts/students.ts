import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';


export class Student {
	_id: string;
	firstName: string;
	surname: string;
	email: string;
	password: string;
	subjects: string;
	tasks: string;
}

@Component({
	selector: 'students',
  	templateUrl: 'src/app/html/students.html',
  //  styleUrls: ['./login.css']
})
export class Students {
	studentList: Object[];
	studentToEdit: Student;
	formEnable: boolean;
	studentForm: FormGroup;

	constructor(public http: Http, fb: FormBuilder) {
		this.getStudents();
		this.studentForm = fb.group({
			_id:[""],
	    	firstName: ["", Validators.required],
	    	surname: [""],
	    	email: [""],
	    	password: ["", Validators.required],
	    	subjects: [""],
	    	tasks: [""],
		});
	}

	showForm(event, student) {
		this.studentToEdit = student ? student : { _id: null };
		this.formEnable = true;
	}

  	onSubmit(event) {
  		if (!this.studentForm.valid) {
  			alert("invalido")
  			return;
  		}
		this.formEnable = false;
		let value = this.studentToEdit;
		if (value._id){
			this.update(value)
		}
		else {
			this.add(value)
		}
	}
	getStudents() {
	  this.http.get('http://localhost:3000/student/findAll')
		.subscribe(
          response => {
			  var content = response.json().content;
			  this.studentList = content;

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

	add(student) {
		let body = JSON.stringify(student);
	    let headers = new Headers();
	    headers.append('Content-Type', 'application/json');

	    this.http.post('http://localhost:3000/student/add', body, { headers: headers })
	      .subscribe(
	        response => {
	          console.log(response)
				this.getStudents();

	        },
	        error => {
	          alert(error.text());
	          console.log(error.text());
	        }
	      );
	}



	update(student) {
		let body = JSON.stringify(student);
	    let headers = new Headers();
	    headers.append('Content-Type', 'application/json');

	    this.http.put('http://localhost:3000/student/update/' + student._id, body, { headers: headers })
	      .subscribe(
	        response => {
	          console.log(response)
				this.getStudents();

	        },
	        error => {
	          alert(error.text());
	          console.log(error.text());
	        }
	      );
	}


  delete(student, event) {
	this.http.delete('http://localhost:3000/student/delete/' + student._id)
	  	.subscribe(
          response => {
			  var status = response.json().status;
          	  console.log(status)
          	  if(status == "success") {
          	  	alert("Se ha borrado con éxito")
				this.getStudents();
			  }
		},
		error => {
			  console.error(error.text());
		  }
 	  );
  }
}