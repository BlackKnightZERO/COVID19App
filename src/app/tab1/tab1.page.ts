import { Component } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  global:any;
  constructor(public appService: AppService) {}
  
  ionViewDidEnter(){
    this.getData();
  }
  
  getData(){
    this.appService.getData().subscribe((res)=> {
      this.global = res['Global']
      //console.log(this.global);
    },
    (error) => {

    });
  }
}
