import { Component } from '@angular/core';
//import { CORE_DIRECTIVES } from '@angular/common';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
//import { AuthHttp } from 'angular2-jwt';


@Component({
  selector: 'home',
  //directives: [CORE_DIRECTIVES],
  // Here we specify the template we'll use
  templateUrl: 'src/app/html/home.html',
  //  styleUrls: ['./home.css']
})
export class Home {
  // Here we define this component's instance variables
  // They're accessible from the template
  accessToken: string;
  //decodedJwt: string;
  response: string;
  api: string;

  //constructor(public router: Router, public http: Http, public authHttp: AuthHttp) {
  constructor(public router: Router, public http: Http) {
    // We get the JWT from localStorage
    this.accessToken = localStorage.getItem('accessToken');
  }

  logout() {
    // Method to be called when the user wants to logout
    // Logging out means just deleting the JWT from localStorage and redirecting the user to the Login page
    localStorage.removeItem('accessToken');
    //this.router.parent.navigateByUrl('../login');
    this.router.navigateByUrl('../login');
  }

  callAnonymousApi() {
    this._callApi('Anonymous', 'http://localhost:3010/');
  }

  callSecuredApi() {
    // We call the secured API
    this._callApi('Secured', 'http://localhost:3010/');
  }

  _callApi(type, url) {
    this.response = null;
    if (type === 'Anonymous') {
      // For non-protected routes, just use Http
      this.http.get(url)
        .subscribe(
          response => this.response = response.text(),
          error => this.response = error.text()
        );
    }
    if (type === 'Secured') {
      // For protected routes, use AuthHttp
      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + this.accessToken);
      this.http.get(url, { headers: headers })
        .subscribe(
          response => this.response = response.text(),
          error => this.response = error.text()
        );
    }
  }
}