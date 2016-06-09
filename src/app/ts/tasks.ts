import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http, Headers, Response } from '@angular/http';


@Component({
  selector: 'tasks',
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES ],
  templateUrl: 'src/app/html/tasks.html',
  //  styleUrls: ['./login.css']
})
export class Tasks {
	taskList: Object[];

  constructor(public router: Router, public http: Http) {
	  this.getTasks();
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
}