import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CallApiProvider } from '../../providers/connexion-api/connexion-api';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

@Injectable()
export class FavoriteProvider {

  selectedItem: any;
  public data: any;
  detailData: any;
  listeFavoris = [];

  constructor(public http: HttpClient,  public callApiProvider: CallApiProvider, private storage: Storage, public alertCtrl: AlertController) {
    
  }

  isFavorite(imdbID) {
    return this.storage.get('Favorite').then((state) => {
      if (state !== null) {
        if (state.indexOf(imdbID) === -1){
          return false;
        }
        else {
          return true;
        }
      }
      else {
        return false;
      }
    });
  }

  favorite(idFilm) {
    this.isFavorite(idFilm).then( result => {
      if (!result) {
        this.addToFavorite(idFilm);
      }
      else {
        this.deleteFavorite(idFilm);
      }
    })
  }

  addToFavorite(idFilm) {
    this.storage.get('Favorite').then((state) => {
      if (state) {
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
    this.showAlertAdd();
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
      this.showAlertDel();
    });
  }

  showAlertAdd() {
    const alert = this.alertCtrl.create({
      title: 'Ajouté au Favoris!',
      subTitle: 'Consulté vos Favoris dans le menu !',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertDel() {
    const alert = this.alertCtrl.create({
      title: 'Supprimé des Favoris!',
      subTitle: '',
      buttons: ['OK']
    });
    alert.present();
  }

}
