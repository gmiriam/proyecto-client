import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import {GlobalsService} from './globals.service';

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
  	providers: [GlobalsService]
  //  styleUrls: ['./login.css']
})
export class Deliveries {
	deliveryList: Object[];
	deliveryToEdit: Delivery;
	formEnable: boolean;
	deliveryForm: FormGroup;
	deliveryUrl: string;
	fileTarget: string;

	constructor(public http: Http, fb: FormBuilder, globalsService: GlobalsService) {
		this.deliveryUrl = globalsService.apiUrl + 'delivery/';
		this.getStudents();
		this.deliveryForm = fb.group({
			_id:[""],
	    	task: ["", Validators.required],
	    	student: [""],
	    	score: [""],
	    	data: [""],
		});
		this.fileTarget = 'deliveries';
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
	  this.http.get(this.deliveryUrl + 'findAll')
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

	    this.http.post(this.deliveryUrl + 'add', body, { headers: headers })
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

	    this.http.put(this.deliveryUrl + 'update/' + delivery._id, body, { headers: headers })
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
	this.http.delete(this.deliveryUrl + 'delete/' + delivery._id)
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

  onDeliveryUploaded(filename: string) {

  	console.debug("oh milagro", filename);
  	this.deliveryToEdit.data = filename;
  }
}