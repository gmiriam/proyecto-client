import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators } from '@angular/common';
import { Http, Headers, Response } from '@angular/http';


@Component({
	selector: 'tasks',
	directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES ],
  templateUrl: 'src/app/html/tasks.html',
  //  styleUrls: ['./login.css']
})
export class Tasks {
	taskList: Object[];
	formEnable: boolean;
	taskForm: ControlGroup;

	constructor(public router: Router, public http: Http, fb: FormBuilder) {
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
  	this.taskForm.controls['_id'].updateValue(task ? task._id : "");
  	this.taskForm.controls['name'].updateValue(task ? task.name : "");
  	this.taskForm.controls['statement'].updateValue(task ? task.statement : "");
  	this.taskForm.controls['startDate'].updateValue(task ? task.startDate : "");
  	this.taskForm.controls['endDate'].updateValue(task ? task.endDate : "");
  	this.taskForm.controls['maxScore'].updateValue(task ? task.maxScore : "");
  	this.taskForm.controls['teacher'].updateValue(task ? task.teacher : "");
	  this.formEnable = true;
  }

  	onSubmit(event) {
		this.formEnable = false;
		let value = this.taskForm.value;
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
		console.debug("mando", body)
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