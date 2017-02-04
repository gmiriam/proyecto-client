import { Component } from '@angular/core';

@Component({
	selector: 'app',
	template: `
			<navbar></navbar>
			<div class="main-container">
				<ng-sidebar-container>
					<ng-sidebar [(opened)]="_opened">
						<ul>
							<li> <a routerLink="/teachers" routerLinkActive="active"> Ver Profesores </a></li>
							<li> <a routerLink="/students" routerLinkActive="active"> Ver Alumnos </a></li>
							<li> <a routerLink="/admins" routerLinkActive="active"> Ver Administradores </a></li>
						</ul>
					</ng-sidebar>
				</ng-sidebar-container>
				<div class="view-container">
					<router-outlet></router-outlet>
				</div>
			</div>
	`
})

export class AppComponent {
	private _opened: boolean = true;
}
