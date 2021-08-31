import { NgModule } from '@angular/core';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { ContentComponent } from './content/content.component';
import { DefaultComponent } from './default/default.component';
import { QRScanner } from './qr-scanner/qr-scanner.component';
import { DashboardsComponent } from './dashboards.component';
import { DashboardsRoutingModule } from './dashboards.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardsContainersModule } from 'src/app/containers/dashboards/dashboards.containers.module';
import { ComponentsCardsModule } from 'src/app/components/cards/components.cards.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { FormValidationsContainersModule } from 'src/app/containers/form-validations/form.validations.containers.module';
import { FormsModule as FormsModuleAngular, ReactiveFormsModule } from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
  declarations: [PatientRegistrationComponent, ContentComponent, DefaultComponent, QRScanner, DashboardsComponent],
  imports: [
    SharedModule,
    LayoutContainersModule,
    DashboardsContainersModule,
    DashboardsRoutingModule,
    ComponentsCardsModule,
    FormValidationsContainersModule,
    FormsModuleAngular, 
    ReactiveFormsModule,
    SimpleNotificationsModule.forRoot()
  ],
  exports: [
    SharedModule,
    FormsModuleAngular,
    ReactiveFormsModule
  ]
})
export class DashboardsModule { }
