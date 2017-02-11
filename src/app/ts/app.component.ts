import { Component } from '@angular/core';

@Component({
	selector: 'app',
	template: `
		<navbar></navbar>
		<div class="main-container">
			<landing *ngIf="!isLogged"></landing>
			<appLogged *ngIf="isLogged"></appLogged>
		</div>
	`
})

export class AppComponent {

	isLogged = true;

	constructor() {

	}
}
