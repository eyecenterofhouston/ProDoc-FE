import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardsComponent } from './dashboards.component';
import { DefaultComponent } from './default/default.component';
import { ContentComponent } from './content/content.component';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { QRScanner } from './qr-scanner/qr-scanner.component';
import { UserRole } from 'src/app/shared/auth.roles';

const routes: Routes = [
  {
    path: '',
    component: DashboardsComponent,
    children: [
      { path: '', redirectTo: 'default', pathMatch: 'full' },
      {
        path: 'default',
        component: DefaultComponent,
        // data: { roles: [UserRole.Admin] },
      },
      {
        path: 'content',
        component: ContentComponent,
        // data: { roles: [UserRole.Admin] },
      },
      {
        path: 'patient-reg',
        component: PatientRegistrationComponent,
        // data: { roles: [UserRole.Admin, UserRole.Editor] },
      },
      {
        path: 'qrscanner',
        component: QRScanner,
        // data: { roles: [UserRole.Editor] },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardsRoutingModule {}
