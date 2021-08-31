import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShareForCareService {

  constructor( private http: HttpClient) { }

   patientRegistration(data:any) {
    const body = {
      "name":data.get("name").value,
      "phone":data.get("phone").value,
      "address":data.get("address").value
      }
      const Url = environment.apiUrl + 's4c/registerPatient ';
      return this.http.post(Url, body);
  }

   patientReferral(data:any,qrCode:string) {
    const body = {
      "name":data.get("referredName").value,
      "phone":data.get("referredPhone").value,
      "qrCodeClaimed":qrCode
      }
      const Url = environment.apiUrl + 's4c/patientReferral ';
      return this.http.post(Url, body);
  }

   verifyQRCode( qrCode:string) {
    return this.http.get(environment.apiUrl  + 's4c/qrcode/'+qrCode);
  }

  recentReg() {
    return this.http.get(environment.apiUrl  + 's4c/recentReg');
  }
}
