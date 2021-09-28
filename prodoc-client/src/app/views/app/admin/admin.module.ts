import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { ClientRegistrationComponent } from './client-registration/client-registration.component';
import { ApplicationPanelComponent } from './application-panel/application-panel.component';
import {AdminRoutingModule} from './admin.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardsContainersModule } from 'src/app/containers/dashboards/dashboards.containers.module';
import { ComponentsCardsModule } from 'src/app/components/cards/components.cards.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { FormValidationsContainersModule } from 'src/app/containers/form-validations/form.validations.containers.module';
import { FormsModule as FormsModuleAngular, ReactiveFormsModule } from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [AdminComponent, ClientRegistrationComponent, ApplicationPanelComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgSelectModule,
    SharedModule,
    LayoutContainersModule,
    DashboardsContainersModule,
    ComponentsCardsModule,
    FormValidationsContainersModule,
    FormsModuleAngular, 
    ReactiveFormsModule,
    SimpleNotificationsModule.forRoot()
  ],
  exports:[
    SharedModule,
    FormsModuleAngular,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
