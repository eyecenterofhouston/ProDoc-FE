import { Component,OnInit } from '@angular/core';
import {ShareForCareService} from '../../../../services/share-for-care.service'
import {Patient} from '../../../../models/patient'
import { List } from '@zxing/library/esm/customTypings';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html'
})
export class DefaultComponent implements OnInit{

  patientList:List<Patient> = null;
  constructor(private share4Care:ShareForCareService) { 

  }

  ngOnInit(){
      this.share4Care.recentReg().subscribe((data:any)=>{
       this.patientList = data;
    });
  }


}
