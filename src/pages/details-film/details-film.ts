import { Component } from '@angular/core';
import { CallApiProvider } from '../../providers/connexion-api/connexion-api';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-detail-film',
  templateUrl: 'details-film.html'
})
export class ItemDetailsPage {
  
  selectedItem: any;
  public data: any;
  detailData: any;
  listeFavoris = [];
  isFavorite = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public callApiProvider: CallApiProvider, private storage: Storage) {
    // If we navigated to this page, we will have an item available as a nav param
    
    this.IsFavorite(this.navParams.get('item').imdbID);
    this.callApiProvider.searchItemById(this.navParams.get('item').imdbID).subscribe((movie) => {
      this.selectedItem = movie;
    })
  }

  IsFavorite(imdbID) {
    this.storage.get('Favorite').then((state) => {
      if (state !== null) {
        if (state.indexOf(imdbID) === -1){
          this.isFavorite = false;
        }
        else {
          this.isFavorite = true;
        }

      }
      else {
        this.isFavorite = false;
      }
    });
  }

  favorite(idFilm) {
    if (this.isFavorite === false) {
      this.isFavorite = true;
      this.addToFavorite(idFilm);
    }
    else {
      this.isFavorite = false;
      this.deleteFavorite(idFilm);
    }
  }

  addToFavorite(idFilm) {
    this.storage.get('Favorite').then((state) => {
      if (state !== null) {
        this.listeFavoris = state;
      }
      else {
        this.listeFavoris = [];
      }
      
      if (this.listeFavoris.indexOf(idFilm) === -1) {
        this.listeFavoris.push(idFilm);
      }
      this.storage.set('Favorite', this.listeFavoris);
    });

  }

  deleteFavorite(idFilm) {

    this.storage.get('Favorite').then((state) => {
      if (state !== null) {
        this.listeFavoris = state;
      }
      else {
        this.listeFavoris = [];
      }

      this.listeFavoris.splice( this.listeFavoris.indexOf(idFilm), 1 );
      this.storage.set('Favorite', this.listeFavoris);
    });
  }


}
