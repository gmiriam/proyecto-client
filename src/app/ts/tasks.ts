import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http, Headers } from '@angular/http';


@Component({
  selector: 'tasks',
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES ],
  templateUrl: 'src/app/html/tasks.html',
  //  styleUrls: ['./login.css']
})
export class Tasks {
  constructor(public router: Router, public http: Http) {
	  console.log('Holaaaa');
  }
}