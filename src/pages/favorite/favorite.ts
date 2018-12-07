import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallApiProvider } from '../../providers/connexion-api/connexion-api';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class FavoritePage {

  favoriteId = [];
  favoriteMovies = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public CallApiProvider : CallApiProvider) {
  }

  ionViewDidEnter() {
    this.storage.get('Favorite').then((state) => {
        this.favoriteId = state;
        this.favoriteMovies = [];
        this.favoriteId.forEach(element => {
          this.CallApiProvider.searchMovies(element).subscribe(data => {
            this.favoriteMovies.push(data);
          })
        });
    });
  }
}
