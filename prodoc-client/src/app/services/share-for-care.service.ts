import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShareForCareService {

  constructor( private http: HttpClient) { }

  PATIENT_REFFERAL:string=environment.apiUrl + 's4c/patientReferral ';
  PATIENT_REGISTRATION:string=environment.apiUrl + 's4c/registerPatient ';

   patientRegistration(data:any) {
      return this.http.post(this.PATIENT_REGISTRATION, data);
  }

   patientReferral(data:any) {
      return this.http.post(this.PATIENT_REFFERAL, data);
  }

   verifyQRCode( qrCode:string) {
    return this.http.get(environment.apiUrl  + 's4c/qrcode/'+qrCode);
  }

  recentReg() {
    return this.http.get(environment.apiUrl  + 's4c/recentReg');
  }
}
