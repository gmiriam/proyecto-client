import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {Home} from './home.component';

import {TaskList} from './task/list.component';
import {TaskView} from './task/view.component';
import {TaskEdition} from './task/edition.component';
import {AssignTask} from './task/assignTask.component';

import {StudentList} from './student/list.component';
import {StudentView} from './student/view.component';
import {StudentEdition} from './student/edition.component';

import {TeacherList} from './teacher/list.component';
import {TeacherView} from './teacher/view.component';
import {TeacherEdition} from './teacher/edition.component';

import {AdminList} from './admin/list.component';
import {AdminView} from './admin/view.component';
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
	path: 'teacher',
	component: TeacherList
},{
	path: 'teacher/:userid',
	component: TeacherView
},{
	path: 'teacher/:userid/edit',
	component: TeacherEdition
},{
	path: 'admin',
	component: AdminList
},{
	path: 'admin/:userid',
	component: AdminView
},{
	path: 'admin/:userid/edit',
	component: AdminEdition
},{
	path: 'student',
	component: StudentList
},{
	path: 'student/:userid',
	component: StudentView
},{
	path: 'student/:userid/edit',
	component: StudentEdition
},{
	path: 'subject',
	component: SubjectList
},{
	path: 'subject/:subjectid',
	component: SubjectView
},{
	path: 'subject/:subjectid/edit',
	component: SubjectEdition
},{
	path: 'subject/:subjectid/enroll',
	component: EnrollStudents
},{
	path: 'subject/:subjectid/task',
	component: TaskList
},{
	path: 'subject/:subjectid/task/:taskid',
	component: TaskView
},{
	path: 'subject/:subjectid/task/:taskid/edit',
	component: TaskEdition
},{
	path: 'subject/:subjectid/task/:taskid/assign',
	component: AssignTask
},{
	path: 'subject/:subjectid/task/:taskid/delivery',
	component: DeliveryList
},{
	path: 'subject/:subjectid/task/:taskid/delivery/:deliveryid',
	component: DeliveryView
},{
	path: 'subject/:subjectid/task/:taskid/delivery/:deliveryid/edit',
	component: DeliveryEdition
},{
	path: 'subject/:subjectid/score',
	component: ScoreList
},{
	path: 'subject/:subjectid/score/:scoreid',
	component: ScoreView
},{
	path: 'subject/:subjectid/score/:scoreid/edit',
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
