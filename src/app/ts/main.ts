import {bootstrap}    from '@angular/platform-browser-dynamic';
import { provide } from '@angular/core';
import { FORM_PROVIDERS } from '@angular/common';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { Http, HTTP_PROVIDERS } from '@angular/http';
//import { AuthConfig, AuthHttp, AUTH_PROVIDERS } from 'angular2-jwt';
import {AppComponent} from './app.component';
import {navbarComponent} from './navbar.component';


bootstrap(AppComponent,
	[
		FORM_PROVIDERS,
		ROUTER_PROVIDERS,
		HTTP_PROVIDERS
	]
);

bootstrap(navbarComponent);
