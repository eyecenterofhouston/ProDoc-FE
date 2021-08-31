import { Component, ViewChild ,OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { environment } from 'src/environments/environment';
import { User } from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{
  @ViewChild('loginForm') loginForm: NgForm;
  emailModel = '';
  passwordModel = '';
  user:User;
  buttonDisabled = false;
  buttonState = '';

  constructor(private authService: AuthService, private notifications: NotificationsService, private router: Router) { }

  ngOnInit(){
   var user=  JSON.stringify(localStorage.getItem("user"));
   if(user!="null"){
    this.router.navigate([environment.adminRoot]);
   }
  
  }
  onSubmit(): void {
    if (this.loginForm.valid) {    
      if (!this.buttonDisabled) {
        this.buttonDisabled = true;
        this.buttonState = 'show-spinner';
        this.authService.signIn(this.loginForm.value).subscribe(
          (data:any)=>{
             localStorage.setItem("token",data.token);
             delete data.token;
             this.user=data;
             localStorage.setItem("user",JSON.stringify(this.user));
             console.log(this.user);
             this.router.navigate([environment.adminRoot]);
          },(error) => {
            this.buttonDisabled = false;
            this.buttonState = '';
            this.notifications.create('Error', error.message, NotificationType.Bare, {
              theClass: 'outline primary',
              timeOut: 6000,
              showProgressBar: false
            });
          });
      }
    }
  }
}
