import { Component,OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormControl, NgForm,Validators } from '@angular/forms';
import {ShareForCareService} from '../../../../services/share-for-care.service'
import { NotificationsService, NotificationType } from 'angular2-notifications';
import {Patient} from '../../../../models/patient'
@Component({
  selector: 'app-patientReg',
  templateUrl: './patient-registration.component.html'
})
export class PatientRegistrationComponent implements OnInit{
  public myAngularxQrCode: string = null;
  basicForm: FormGroup;
  patient:Patient=null;
  @ViewChild('form') form: NgForm;

  constructor(private shareForCareService : ShareForCareService,private notifications:NotificationsService) {
    this.myAngularxQrCode = 'Your QR code data string';
   }

   ngOnInit(): void {
    this.basicForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      phone: new FormControl(null, [Validators.required]),
      address: new FormControl(null)
    });
  }

  onSubmit(): void {
    console.log(this.basicForm);
    if(this.basicForm.get("name").value!=null&&this.basicForm.get("phone").value!=null){
      this.shareForCareService.patientRegistration(this.basicForm).subscribe((data:any)=>{
          if(data.status=="error"){
            this.patient=data.data;
            this.notifications.create('',data.message, NotificationType.Bare, {
              theClass: 'outline primary',
              timeOut: 6000,
              showProgressBar: false
            });
          }else{
          this.patient=data;
          this.notifications.create('Success', "Registerd succesfully", NotificationType.Bare, {
            theClass: 'outline primary',
            timeOut: 6000,
            showProgressBar: false
          });
        }
      })
    }
   
  }



}
