import {Home} from './home';

import {TaskList} from './task/list.component';
import {TaskEdition} from './task/edition.component';
import {StudentList} from './student/list.component';
import {StudentEdition} from './student/edition.component';
import {Admins} from './admins';
import {Teachers} from './teachers';
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
},
//{ path: 'login', component: Login },
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
	component: StudentList
},{
	path: 'student/:id',
	component: StudentEdition
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
