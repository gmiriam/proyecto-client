import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators } from '@angular/common';
import { Http, Headers, Response } from '@angular/http';


export class Admin {
	_id: string;
	firstName: string;
	surname: string;
	email: string;
	password: string;
}

@Component({
	selector: 'admins',
	directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES ],
  	templateUrl: 'src/app/html/admins.html',
  //  styleUrls: ['./login.css']
})
export class Admins {
	adminList: Object[];
	adminToEdit: Admin;
	formEnable: boolean;
	adminForm: ControlGroup;

	constructor(public router: Router, public http: Http, fb: FormBuilder) {
		this.getAdmins();
		this.adminForm = fb.group({
			_id:[""],
	    	firstName: ["", Validators.required],
	    	surname: [""],
	    	email: [""],
	    	password: ["", Validators.required],
		});
	}

	showForm(event, admin) {
		this.adminToEdit = admin ? admin : { _id: null };
		this.formEnable = true;
	}

  	onSubmit(event) {
		this.formEnable = false;
		let value = this.adminToEdit;
		if (value._id){
			this.update(value)
		}
		else {
			this.add(value)
		}
	}
	getAdmins() {
	  this.http.get('http://localhost:3000/admin/findAll')
		.subscribe(
          response => {
			  var content = response.json().content;
			  this.adminList = content;

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

	add(admin) {
		let body = JSON.stringify(admin);
	    let headers = new Headers();
	    headers.append('Content-Type', 'application/json');

	    this.http.post('http://localhost:3000/admin/add', body, { headers: headers })
	      .subscribe(
	        response => {
	          console.log(response)
				this.getAdmins();

	        },
	        error => {
	          alert(error.text());
	          console.log(error.text());
	        }
	      );
	}



	update(admin) {
		let body = JSON.stringify(admin);
	    let headers = new Headers();
	    headers.append('Content-Type', 'application/json');

	    this.http.put('http://localhost:3000/admin/update/' + admin._id, body, { headers: headers })
	      .subscribe(
	        response => {
	          console.log(response)
				this.getAdmins();

	        },
	        error => {
	          alert(error.text());
	          console.log(error.text());
	        }
	      );
	}


  delete(admin, event) {
	this.http.delete('http://localhost:3000/admin/delete/' + admin._id)
	  	.subscribe(
          response => {
			  var status = response.json().status;
          	  console.log(status)
          	  if(status == "success") {
          	  	alert("Se ha borrado con éxito")
				this.getAdmins();
			  }
		},
		error => {
			  console.error(error.text());
		  }
 	  );
  }
}