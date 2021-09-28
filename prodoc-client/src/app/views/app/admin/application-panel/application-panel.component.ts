import { Component, OnInit } from '@angular/core';
import {AdminPanelService} from '../../../../services/admin-panel.service'
import { NotificationsService, NotificationType } from 'angular2-notifications';

@Component({
  selector: 'app-application-panel',
  templateUrl: './application-panel.component.html',
  styleUrls: ['./application-panel.component.scss']
})
export class ApplicationPanelComponent implements OnInit {

  constructor(public adminPanelService:AdminPanelService,public notifications:NotificationsService) { }

  ngOnInit(): void {

    if(this.adminPanelService.recentRegClients==undefined){
      this.adminPanelService.recentReg().subscribe((data)=>{
        this.adminPanelService.recentRegClients=data;
      })
  }
  }

}
