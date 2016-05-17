import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { Component }       from '@angular/core';
import { HeroService }     from './hero.service';
import { HeroesComponent } from './heroes.component';
@Component({
  selector: 'my-app',
  template: `
	<h1>{{title}}</h1>
	<my-heroes></my-heroes>
  `,
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    HeroService
  ]
})
export class AppComponent {
  title = 'Tour of Heroes';
}
