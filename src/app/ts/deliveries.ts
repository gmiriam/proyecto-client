import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';


export class Delivery {
	_id: string;
	task: string;
	student: string;
	score: string;
	data: string;
}

@Component({
	selector: 'deliveries',
  	templateUrl: 'src/app/html/deliveries.html',
  //  styleUrls: ['./login.css']
})
export class Deliveries {
	deliveryList: Object[];
	deliveryToEdit: Delivery;
	formEnable: boolean;
	deliveryForm: FormGroup;

	constructor(public router: Router, public http: Http, fb: FormBuilder) {
		this.getStudents();
		this.deliveryForm = fb.group({
			_id:[""],
	    	task: ["", Validators.required],
	    	student: [""],
	    	score: [""],
	    	data: [""],
		});
	}

	showForm(event, delivery) {
		this.deliveryToEdit = delivery ? delivery : { _id: null };
		this.formEnable = true;
	}

  	onSubmit(event) {
		this.formEnable = false;
		let value = this.deliveryToEdit;
		if (value._id){
			this.update(value)
		}
		else {
			this.add(value)
		}
	}
	getStudents() {
	  this.http.get('http://localhost:3000/delivery/findAll')
		.subscribe(
          response => {
			  var content = response.json().content;
			  this.deliveryList = content;

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

	add(delivery) {
		let body = JSON.stringify(delivery);
	    let headers = new Headers();
	    headers.append('Content-Type', 'application/json');

	    this.http.post('http://localhost:3000/delivery/add', body, { headers: headers })
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



	update(delivery) {
		let body = JSON.stringify(delivery);
	    let headers = new Headers();
	    headers.append('Content-Type', 'application/json');

	    this.http.put('http://localhost:3000/delivery/update/' + delivery._id, body, { headers: headers })
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


  delete(delivery, event) {
	this.http.delete('http://localhost:3000/delivery/delete/' + delivery._id)
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