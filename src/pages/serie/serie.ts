import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { CallApiProvider } from '../../providers/connexion-api/connexion-api';
import { ItemDetailsPage } from '../details-film/details-film';

/**
 * Generated class for the SeriePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-serie',
  templateUrl: 'serie.html',
})
export class Serie {

  public data: any;
  public position: any;
  searchTerm : any="";
  toggled: boolean;

  constructor(public navCtrl: NavController, public callApiProvider: CallApiProvider){
    this.toggled = false;
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
    this.callApiProvider.loadSerie(this.searchTerm).subscribe(result => {
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
