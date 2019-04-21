import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { OnboardingformComponent } from './onboardingform/onboardingform.component';
import { StudentlistComponent } from './studentlist/studentlist.component';

const appRoutes: Routes = [
    { path: '', component: StudentlistComponent, canActivate: [AuthGuard], pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'student-onboard/:id', component: OnboardingformComponent },
    { path: 'student-list', component: StudentlistComponent },
    { path: 'student-list/:id', component: StudentlistComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);