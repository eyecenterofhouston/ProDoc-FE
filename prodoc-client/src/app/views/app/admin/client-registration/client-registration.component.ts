import { Component,OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormControl, NgForm,Validators } from '@angular/forms';
import {AdminPanelService} from '../../../../services/admin-panel.service'
import { NotificationsService, NotificationType } from 'angular2-notifications';

@Component({
  selector: 'app-client-registration',
  templateUrl: './client-registration.component.html',
  styleUrls: ['./client-registration.component.scss']
})
export class ClientRegistrationComponent implements OnInit {

  basicForm: FormGroup;
  constructor(public adminPanelService:AdminPanelService,public notifications:NotificationsService) { }

  ngOnInit(): void {
    if(this.adminPanelService.recentRegClients==undefined){
        this.getRecentClients();
    }
    this.basicForm = new FormGroup({
      clinicName: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      clinicPhone: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      clinicAddress: new FormControl(null, [Validators.required]),
      clinicEmail:new FormControl(null, [Validators.required, Validators.email]),
      microApps:new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      phone: new FormControl(null, [Validators.required]),
      address: new FormControl(null),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  onSubmit(): void {
    if(this.basicForm.get("firstName").value!=null&&this.basicForm.get("phone").value!=null){
      this.adminPanelService.clientRegistration(this.basicForm.value).subscribe((data:any)=>{
          if(data.status=="error"){
            this.notifications.create('',data.message, NotificationType.Bare, {
              theClass: 'outline primary',
              timeOut: 6000,
              showProgressBar: false
            });
          }else{
            this.getRecentClients();
          this.notifications.create('Success', "Registerd succesfully", NotificationType.Bare, {
            theClass: 'outline primary',
            timeOut: 6000,
            showProgressBar: false
          });
        }
      })
    }
  }

  getRecentClients(){
    this.adminPanelService.recentReg().subscribe((data)=>{
      this.adminPanelService.recentRegClients=data;
    })
  }

}
