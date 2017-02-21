import { Component } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import {GlobalsService} from './globals.service';

@Component({
	selector: 'app',
	template: `
		<navbar></navbar>
		<div class="main-container">
			<landing *ngIf="!isLogged"></landing>
			<appLogged *ngIf="isLogged"></appLogged>
		</div>
	`,
	providers: [GlobalsService]
})

export class AppComponent {

	isLogged: Boolean;

	constructor(private localStorageService: LocalStorageService) {

		this.isLogged = !!this.localStorageService.get("userToken");
	}
}
