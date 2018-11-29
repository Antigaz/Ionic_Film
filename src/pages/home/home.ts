import { Component } from '@angular/core';
import { CallApiProvider } from '../../providers/connexion-api/connexion-api';
import { NavController } from 'ionic-angular';
import { ItemDetailsPage } from '../details-film/details-film';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CallApiProvider]
})

export class HelloIonicPage {

  public data: any;
  public position: any;
  searchTerm : any="";

  constructor(public navCtrl: NavController, public callApiProvider: CallApiProvider){
    this.loadData();
  }

  loadData(){
    this.callApiProvider.load().subscribe(result => {
      console.log(result);
      this.data = result
    });
    
  }

  itemTapped(event, item){
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
  
}
