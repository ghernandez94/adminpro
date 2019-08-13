import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';

const pagesRoutes: Routes = [{
    path: '',
    component: PagesComponent,
    canActivate: [ LoginGuard ],
    children: [
        { path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard'} },
        { path: 'progress', component: ProgressComponent, data: {title: 'Progress'} },
        { path: 'graficas1', component: Graficas1Component, data: {title: 'Gráficas'} },
        { path: 'account-settings', component: AccountSettingsComponent, data: {title: 'Temas'} },
        { path: 'profile', component: ProfileComponent, data: {title: 'Perfil de usuario'} },
        { path: 'promesas', component: PromesasComponent, data: {title: 'Promesas'} },
        { path: 'rxjs', component: RxjsComponent, data: {title: 'Observables'} },

        // Mantenimiento
        { path: 'usuarios', component: UsuariosComponent, data: {title: 'Mantenimiento de usuarios'} },
        { path: 'hospitales', component: HospitalesComponent, data: {title: 'Mantenimiento de hospitales'} },
        { path: 'medicos', component: MedicosComponent, data: {title: 'Mantenimiento de médicos'} },
        { path: 'medico/:id', component: MedicoComponent, data: {title: 'Mantenedor de médicos'} },
        { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
}];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
