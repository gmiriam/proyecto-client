import { Component }       from '@angular/core';

@Component({
	selector: 'app',
	template: `
		<div class="container body-container">
			<navbar></navbar>
			<div style="position:absolute; top: 51px; left: 201px;">
				<router-outlet></router-outlet>
			</div>
		</div>
	`
})

export class AppComponent {}
