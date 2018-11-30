import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallApiProvider } from '../../providers/connexion-api/connexion-api';
import { DetailsSaisonPage } from '../details-saison/details-saison';

/**
 * Generated class for the DetailsSeriePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details-serie',
  templateUrl: 'details-serie.html',
})
export class DetailsSeriePage {

  selectedItem: any;
  public data: any;
  detailData: any;
  saisons: Array<Number> = [];
  indexSaison: any;
  idSerie: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public callApiProvider: CallApiProvider) {

    this.selectedItem = navParams.get('item');
    // this.detailData = callApiProvider.getDetailSaison(this.idSerie, this.indexSaison).subscribe(data => {
    //   console.log(this.saisons);
    // });

    this.callApiProvider.searchItemById(this.navParams.get('item').imdbID).subscribe((movie) => {
      this.selectedItem = movie;
      this.saisons = Array(parseInt(movie['totalSeasons']));
    })
  }

  saisonTapped(idSerie, IndexSaison) {
    this.indexSaison = IndexSaison + 1;

    this.callApiProvider.getDetailSaison(idSerie, this.indexSaison).subscribe(data => {
      this.navCtrl.push(DetailsSaisonPage, {
        detailSaison: data,
        indexSaison: this.indexSaison,
      });
    });
  }

}
