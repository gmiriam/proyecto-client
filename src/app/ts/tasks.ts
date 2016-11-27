import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';

export class Task {
	_id: string;
	name: string;
	statement: string;
	startDate: string;
	endDate: string;
	maxScore: string;
	teacher: string;
}

@Component({
	selector: 'tasks',
	templateUrl: 'src/app/html/tasks.html',
	//styleUrls: ['./login.css']
})

export class Tasks {
	taskList: Task[];
	taskToEdit: Task;
	formEnable: boolean;
	taskForm: FormGroup;

	constructor(public http: Http, fb: FormBuilder) {
		this.getTasks();
		this.taskForm = fb.group({
			_id:[""],
			name: ["", Validators.required],
			statement: ["", Validators.required],
			startDate: ["", Validators.required],
			endDate: [""],
			maxScore: [""],
			teacher: ["", Validators.required]
		});
	}
	showForm(event, task) {
		this.taskToEdit = task ? task : { _id: null };
		this.formEnable = true;
	}

  	onSubmit(event) {
		this.formEnable = false;
		let value = this.taskToEdit;
		if (value._id){
			this.update(value)
		}
		else {
			this.add(value)
		}
	}
	getTasks() {
	  this.http.get('http://localhost:3000/task/findAll')
		.subscribe(
          response => {
			  var content = response.json().content;
			  console.debug("entra")
			  this.taskList = content;

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

	add(task) {
		let body = JSON.stringify(task);
	    let headers = new Headers();
	    headers.append('Content-Type', 'application/json');

	    this.http.post('http://localhost:3000/task/add', body, { headers: headers })
	      .subscribe(
	        response => {
	          console.log(response)
				this.getTasks();

	        },
	        error => {
	          alert(error.text());
	          console.log(error.text());
	        }
	      );
	}



	update(task) {
		let body = JSON.stringify(task);
		console.debug("mando", body)
	    let headers = new Headers();
	    headers.append('Content-Type', 'application/json');

	    this.http.put('http://localhost:3000/task/update/' + task._id, body, { headers: headers })
	      .subscribe(
	        response => {
	          console.log(response)
				this.getTasks();

	        },
	        error => {
	          alert(error.text());
	          console.log(error.text());
	        }
	      );
	}


  delete(task, event) {
	this.http.delete('http://localhost:3000/task/delete/' + task._id)
	  	.subscribe(
          response => {
			  var status = response.json().status;
          	  console.log(status)
          	  if(status == "success") {
          	  	alert("Se ha borrado con éxito")
				this.getTasks();
			  }
		},
		error => {
			  console.error(error.text());
		  }
 	  );
  }
}