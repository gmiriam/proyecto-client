import { Component } from '@angular/core';
//import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http, Headers } from '@angular/http';


@Component({
  selector: 'login',
  //directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES ],
  templateUrl: 'src/app/html/login.html',
  //  styleUrls: ['./login.css']
})
export class Login {
  constructor(public http: Http) {}

  login(event, username, password) {
    event.preventDefault();
    let grant_type = password;
    let body = JSON.parse(JSON.stringify({ grant_type, username, password }));
    let bodyEncoded = Object.keys(body).map(function(k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(body[k])
    }).join('&');
    let headers = new Headers();
    headers.append('Authorization', 'Basic YXBwbGljYXRpb246c2VjcmV0');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post('http://localhost:3010/oauth/token', bodyEncoded, { headers: headers })
      .subscribe(
        response => {
          localStorage.setItem('accessToken', response.json().access_token);
          this.router.navigate(['../home']);
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

  signup(event) {
    event.preventDefault();
    this.router.navigate(['../signup']);
  }
}