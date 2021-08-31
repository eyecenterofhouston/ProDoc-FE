import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ApplicationPanelComponent } from './application-panel/application-panel.component';
import { ClientRegistrationComponent } from './client-registration/client-registration.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'default', pathMatch: 'full' },
      {
        path: 'default',
        component: ApplicationPanelComponent,
        // data: { roles: [UserRole.Admin] },
      },
      {
        path: 'client-reg',
        component: ClientRegistrationComponent,
        // data: { roles: [UserRole.Admin] },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
