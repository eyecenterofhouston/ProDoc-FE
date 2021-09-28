import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {

  constructor( private http: HttpClient) { }

  CLIENT_SIGNUP:string=environment.apiUrl + 'client/signup ';
  RECENT_REG:string=environment.apiUrl+'client/recentReg'
  recentRegClients:any;
  clientRegistration(data:any) {
    return this.http.post(this.CLIENT_SIGNUP, data);
  }

  recentReg() {
    return this.http.get(this.RECENT_REG);
  }
}
