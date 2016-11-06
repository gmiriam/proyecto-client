import { RouterModule, Routes } from '@angular/router';
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

export const appRoutes: Routes = [
  { path: '', redirectTo: 'home' },
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'tasks', component: Tasks },
  { path: 'courses', component: Courses },
  { path: 'admins', component: Admins },
  { path: 'teachers', component: Teachers },
  { path: 'students', component: Students },
  { path: 'subjects', component: Subjects },
  { path: 'deliveries', component: Deliveries },
  { path: 'scores', component: Scores }

 // { path: 'signup', component: Signup }
];

export const APP_ROUTER_PROVIDER = RouterModule.forRoot(appRoutes);
