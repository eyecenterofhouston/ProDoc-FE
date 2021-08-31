import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../views/error/error.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { UnauthorizedComponent } from '../views/unauthorized/unauthorized.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { SimpleNotificationsModule } from 'angular2-notifications';
 
@NgModule({
  declarations: [ErrorComponent, UnauthorizedComponent],
  imports: [
    RouterModule,
    CommonModule,
    TranslateModule,
    PerfectScrollbarModule,
    QRCodeModule,
    ZXingScannerModule,
    SimpleNotificationsModule.forRoot()
  ],
  exports: [
    PerfectScrollbarModule,
    RouterModule,
    ErrorComponent,
    UnauthorizedComponent,
    TranslateModule,
    CommonModule,
    QRCodeModule,
    ZXingScannerModule,
  ],
})
export class SharedModule {}
