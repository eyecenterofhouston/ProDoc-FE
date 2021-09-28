import { Component,OnInit,ChangeDetectorRef,ViewChild} from '@angular/core';
import { OperationResponse } from '../../../../models/operationResponse';
import { Appointment } from '../../../../models/appointment';
import {ShareForCareService} from '../../../../services/share-for-care.service'
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Patient } from 'src/app/models/patient';
import { FormGroup, FormControl, Validators ,NgForm} from '@angular/forms';

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qr-scanner.component.html'
})
export class QRScanner implements OnInit  {
  patientReferalForm: FormGroup;
  scannerEnabled: boolean = false;
  transports: Transport[] = [];
  information: string = "Okay itis.";
  patient:Patient=null;
  currentQr=null;
  @ViewChild('form') form: NgForm;
  constructor(private cd: ChangeDetectorRef,private share4Care:ShareForCareService,private notifications:NotificationsService) {
  }

  ngOnInit() {
    this.initiateForm();
  }

  initiateForm(){
    this.patientReferalForm = new FormGroup({
      patientName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern('^[A-Za-z]+$')]),
      patientPhone: new FormControl(null, [Validators.required, Validators.pattern('^(?:1[01][0-9]|120|1[7-9]|[2-9][0-9])$')]),
      firstName:new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern('^[A-Za-z]+$')]),
      lastName:new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern('^[A-Za-z]+$')]),
      phone:new FormControl(null, [Validators.required, Validators.pattern('^(?:1[01][0-9]|120|1[7-9]|[2-9][0-9])$')]),
      qrCodeClaimed:new FormControl(null,[])
    });
  }

  public scanSuccessHandler($event: any) {
    this.scannerEnabled = false;
    this.information = "PRODOC";
    const appointment = new Appointment($event);
    this.currentQr=appointment.identifier;
    this.notifications.create('Success', "Scanned succesfully", NotificationType.Bare, {
      theClass: 'outline primary',
      timeOut: 6000,
      showProgressBar: false
    });
    this.share4Care.verifyQRCode(appointment.identifier).subscribe((data:any)=>{
      this.patient=data;
      this.patientReferalForm.setValue({
        patientName:this.patient.firstName +" "+this.patient.lastName,
        patientPhone:this.patient.phone,
        firstName:[],
        lastName:[],
        phone:[],
        qrCodeClaimed:[],
      })
    })
  }

  onSubmit(): void{
    if(this.patientReferalForm.get("referredFirstName")!=null && this.patientReferalForm.get("referredPhone")!=null)
      this.patientReferalForm.patchValue({
        qrCodeClaimed: this.currentQr
      });
    this.patientReferalForm.controls.qrCodeClaimed.setValue(this.currentQr);
       this.share4Care.patientReferral(this.patientReferalForm.value).subscribe((data=>{
        var dataPulled:any= data;
        this.notifications.create(dataPulled.status,dataPulled.message , NotificationType.Bare, {
          theClass: 'outline primary',
          timeOut: 6000,
          showProgressBar: false
      });
    }))
  }
   
  public enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
    //this.information = "No se ha detectado información de ningún código. Acerque un código QR para escanear.";
  }

}

interface Transport {
  plates: string;
  slot: Slot;
}

interface Slot {
  name: string;
  description: string;
}
