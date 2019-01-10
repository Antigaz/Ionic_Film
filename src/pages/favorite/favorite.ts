import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CallApiProvider } from '../../providers/connexion-api/connexion-api';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { ExportProvider } from '../../providers/export/export';
import { Storage } from '@ionic/storage';
import { ItemDetailsPage } from '../details-film/details-film';

@IonicPage()
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class FavoritePage {

  favoriteId = [];
  favoriteMovies = [];
  private msg: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public CallApiProvider: CallApiProvider,
    public favoriteProvider: FavoriteProvider,
    private file: ExportProvider,
    public ExportProvider: ExportProvider,
    public alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    this.setFavorites();
  }

  ionViewDidEnter() {
    this.storage.get('Favorite').then((state) => {
      console.log("state", state);
      if (state) {
        this.favoriteId = state;
        this.favoriteMovies = [];
        console.log(this.favoriteId);
        this.favoriteId.forEach((element) => {
          console.log(element);
          this.CallApiProvider.searchMovies(element).subscribe(data => {
            console.log(this.favoriteMovies);
            this.favoriteMovies.push(data);
          });
        });
      }
    });
  }

  deleteFavorite(idFilm) {
    this.favoriteProvider.deleteFavorite(idFilm);
    this.favoriteMovies.splice(this.favoriteMovies.indexOf(idFilm), 1);
  }

  itemTapped(favorite) {
    this.navCtrl.push(ItemDetailsPage, {
      item: favorite,
      detail: favorite,
    });

    // }else if(favorite.Type === 'series'){
    //   this.navCtrl.push(SerieDetailPage, {
    //     item:  favorite,
    //     detail : favorite,
    //   });
    // }
  }

  exportFavorites(ext) {
    try {
      this.file.getPermissionAndWrite(ext, this.favoriteMovies);
      this.ExportProvider.showAlertJsonCreated(ext);
    } catch (e) {
      this.msg = e.toString();
    }

  }

  importFavorites() {
    let alert = this.alertCtrl.create({
      title: 'Confirmation d\'import',
      message: 'Voulez vous vraiment importer ce fichier ? ' +
        'Tous vos favoris actuel vont être remis à zéro.',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Importer',
          handler: () => {
            this.file.getFileAndImport();
          }
        }
      ]
    });
    alert.present().then(() => this.setFavorites()).catch();
  }

  setFavorites() {
    this.favoriteMovies = [];
    this.storage.get('Favorite')
      .then(state => {
        for (let key of state) {
          this.favoriteMovies.push(key);
        }
      }).catch(err => {
        console.log(err);
      })
  }

}
