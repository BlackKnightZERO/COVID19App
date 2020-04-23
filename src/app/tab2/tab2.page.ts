import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  countries:any;
  data: any;

  constructor(
    public appService: AppService, 
    public loadingController:LoadingController,
  ){}

  ionViewDidEnter(){
    this.getData();
  }

   search() {
    const searchbar = document.querySelector('ion-searchbar');
    const items = Array.from(document.querySelector('ion-list').children);

    searchbar.addEventListener('ionInput', handleInput);

    function handleInput(event) {
      const query = event.target.value.toLowerCase();
      requestAnimationFrame(() => {
        items.forEach((item) => {
          const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
          shouldShow ? item.removeAttribute('hidden') : item.setAttribute('hidden', 'hidden');
        });
      });
    }
  }

  async getData(){
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 20000
    });
    await loading.present();

    // const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed!');

      this.appService.getData().subscribe((res)=> {
      this.data = res;
      this.countries = this.data['Countries'];
      this.countries.sort((x,y)=>( x.TotalConfirmed < y.TotalConfirmed ) ? 1:-1);
      //console.log(this.countries);
      //this.search();
      setTimeout(() => {
        this.search();
      }, 220);
    }, (error) => {
      loading.dismiss();
    });
  }

  

}
