import { Routes } from '@angular/router';
import { ProfessorListComponent } from './components/professor-list/professor-list.component';
import { ProfessorFormComponent } from './components/professor-form/professor-form.component';

export const routes: Routes = [
    { path: '', redirectTo: '/professores', pathMatch: 'full' },
    { path: 'professores', component: ProfessorListComponent },
    { path: 'professores/novo', component: ProfessorFormComponent },
    { path: 'professores/editar/:id', component: ProfessorFormComponent },
];
