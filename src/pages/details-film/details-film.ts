import { Component } from '@angular/core';
import { CallApiProvider } from '../../providers/connexion-api/connexion-api';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-detail-film',
  templateUrl: 'details-film.html'
})
export class ItemDetailsPage {
  
  selectedItem: any;
  public data: any;
  detailData: any;
  listeFavoris = [];
  isFavorite: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public callApiProvider: CallApiProvider, public favoriteProvider: FavoriteProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    
    this.favoriteProvider.isFavorite(this.navParams.get('item').imdbID).then( favoriteResult =>
      this.isFavorite = favoriteResult
      );
    this.callApiProvider.searchItemById(this.navParams.get('item').imdbID).subscribe((movie) => {
      this.selectedItem = movie;
    })
    
  }

  favorite(idFilm) {
    this.isFavorite = !this.isFavorite;
    this.favoriteProvider.favorite(idFilm);
  }

  downloadPoster(){
    this.callApiProvider.getAndWritePoster(this.navParams.get('item').imdbID);
    this.callApiProvider.showAlertDownload();
  }

}
