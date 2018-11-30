import { Component } from '@angular/core';
import { CallApiProvider } from '../../providers/connexion-api/connexion-api';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-detail-film',
  templateUrl: 'details-film.html'
})
export class ItemDetailsPage {
  
  selectedItem: any;
  public data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public callApiProvider: CallApiProvider) {
    // If we navigated to this page, we will have an item available as a nav param

    console.log(this.navParams.get('item').imdbID);
    this.callApiProvider.searchItemById(this.navParams.get('item').imdbID).subscribe((movie) => {
      console.log(movie);
      this.selectedItem = movie;
    })
  }

}
