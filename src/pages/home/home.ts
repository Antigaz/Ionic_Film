import { Component } from '@angular/core';
import { CallApiProvider } from '../../providers/connexion-api/connexion-api';
import { NavController } from 'ionic-angular';
import { ItemDetailsPage } from '../details-film/details-film';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CallApiProvider]
})

export class Film {

  public data: any;
  public position: any;
  searchTerm : any="";
  toggled: boolean;
  private Film;
  private FilmPage = this.FilmPage;
  private Favoris;
  noResult = true;

  constructor(public navCtrl: NavController, public callApiProvider: CallApiProvider, public alertCtrl: AlertController){
    this.toggled = false;
    this.Film = Film;
    this.Favoris = this.Favoris;
  }

  openPage(p) {
    this.navCtrl.push(p);
  }

  toggleSearch() {
    this.toggled = this.toggled ? false : true;
  }

  itemTapped(event, item){
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }

  initializeItems() {
    this.callApiProvider.load(this.searchTerm).subscribe(result => {
      
      if (!result || result['Response'] === 'False') {
        this.noResult = false;
      }
      else {
        this.noResult = true;
      }
      this.data = result;
    })
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.data = this.data.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  
}
