import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {Home} from './home.component';

import {TaskList} from './task/list.component';
import {TaskView} from './task/view.component';
import {TaskEdition} from './task/edition.component';
import {AssignTask} from './task/assignTask.component';

import {StudentList} from './student/list.component';
import {StudentEdition} from './student/edition.component';

import {TeacherList} from './teacher/list.component';
import {TeacherEdition} from './teacher/edition.component';

import {AdminList} from './admin/list.component';
import {AdminEdition} from './admin/edition.component';

import {SubjectList} from './subject/list.component';
import {SubjectView} from './subject/view.component';
import {SubjectEdition} from './subject/edition.component';
import {EnrollStudents} from './subject/enrollStudents.component';

import {DeliveryList} from './delivery/list.component';
import {DeliveryView} from './delivery/view.component';
import {DeliveryEdition} from './delivery/edition.component';

import {ScoreList} from './score/list.component';
import {ScoreView} from './score/view.component';
import {ScoreEdition} from './score/edition.component';

const routes: Routes = [{
	path: '',
	redirectTo: 'home',
	pathMatch: 'full'
},{
	path: 'home',
	component: Home
},{
	path: 'tasks',
	component: TaskList
},{
	path: 'task/:id',
	component: TaskView
},{
	path: 'task/:id/edit',
	component: TaskEdition
},{
	path: 'task/:id/deliveries',
	component: DeliveryList
},{
	path: 'task/:id/assign',
	component: AssignTask
},{
	path: 'teachers',
	component: TeacherList
},{
	path: 'teacher/:id',
	component: TeacherEdition
},{
	path: 'admins',
	component: AdminList
},{
	path: 'admin/:id',
	component: AdminEdition
},{
	path: 'students',
	component: StudentList
},{
	path: 'student/:id',
	component: StudentEdition
},{
	path: 'subjects',
	component: SubjectList
},{
	path: 'subject/:id',
	component: SubjectView
},{
	path: 'subject/:id/edit',
	component: SubjectEdition
},{
	path: 'subject/:id/tasks',
	component: TaskList
},{
	path: 'subject/:id/enroll',
	component: EnrollStudents
},{
	path: 'deliveries',
	component: DeliveryList
},{
	path: 'delivery/:id',
	component: DeliveryView
},{
	path: 'delivery/:id/edit',
	component: DeliveryEdition
},{
	path: 'scores',
	component: ScoreList
},{
	path: 'score/:id',
	component: ScoreView
},{
	path: 'score/:id/edit',
	component: ScoreEdition
}];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [
		RouterModule
	]
})

export class AppLoggedRoutingModule { }
