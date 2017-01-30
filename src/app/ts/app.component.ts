import { Component }       from '@angular/core';

@Component({
	selector: 'app',
	template: `
		<div class="container body-container">
			<navbar></navbar>
			<router-outlet></router-outlet>
		</div>
	`
})

export class AppComponent {}
