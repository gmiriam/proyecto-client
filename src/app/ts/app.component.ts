import { RouteConfig, RouterLink, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { Component }       from '@angular/core';
import { HeroService }     from './hero.service';
import { HeroesComponent } from './heroes.component';
import {LoggedInRouterOutlet} from './LoggedInOutlet';
import {Home} from './home';
import {Login} from './login';
import {Tasks} from './tasks';
import {Courses} from './courses';
import {Admins} from './admins';
import {Teachers} from './teachers';
import {Students} from './students';
import {Subjects} from './subjects';
import {Deliveries} from './deliveries';
import {Scores} from './scores';

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
  { path: '/tasks', component: Tasks, as: 'Tasks' },
  { path: '/courses', component: Courses, as: 'Courses'},
  { path: '/admins', component: Admins, as: 'Admins'},
  { path: '/teachers', component: Teachers, as: 'Teachers'},
  { path: '/students', component: Students, as: 'Students'},
  { path: '/subjects', component: Subjects, as: 'Subjects'},
  { path: '/deliveries', component: Deliveries, as: 'Deliveries'},
  { path: '/scores', component: Scores, as: 'Scores'},

 // { path: '/signup', component: Signup, as: 'Signup' }
])

export class AppComponent {
  constructor() {}
}