import { RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { Component }       from '@angular/core';
import { HeroService }     from './hero.service';
import { HeroesComponent } from './heroes.component';
import {LoggedInRouterOutlet} from './LoggedInOutlet';
import {Home} from './home';
import {Login} from './login';
//import {Signup} from './signup';
@Component({
  selector: 'my-app',
  template: `
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  directives: [LoggedInRouterOutlet],
})

@RouteConfig([
  { path: '/', redirectTo: ['/Home'] },
  { path: '/home', component: Home, as: 'Home' },
  { path: '/login', component: Login, as: 'Login' },
 // { path: '/signup', component: Signup, as: 'Signup' }
])

export class AppComponent {
  constructor() {}
}