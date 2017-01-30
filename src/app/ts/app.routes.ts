import {Home} from './home';
import {navbarComponent} from './navbar.component'
//import {Login} from './login';
//import {Signup} from './signup';

import {TaskList} from './task/taskList.component';
import {TaskEdition} from './task/taskEdition.component';
import {Admins} from './admins';
import {Teachers} from './teachers';
import {Students} from './students';
import {Subjects} from './subjects';
import {Deliveries} from './deliveries';
import {Scores} from './scores';

export const routes = [{
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
},{
  path: 'home',
  component: Home
}, {
  path: 'navbar.component',
  component: navbarComponent
}
//{ path: 'login', component: Login },
//{ path: 'signup', component: Signup },
{
  path: 'tasks',
  component: TaskList
},{
  path: 'task/:id',
  component: TaskEdition
},{
  path: 'admins',
  component: Admins
},{
  path: 'teachers',
  component: Teachers
},{
  path: 'students',
  component: Students
},{
  path: 'subjects',
  component: Subjects
},{
  path: 'deliveries',
  component: Deliveries
},{
  path: 'scores',
  component: Scores
}];
