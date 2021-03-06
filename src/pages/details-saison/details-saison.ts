import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallApiProvider } from '../../providers/connexion-api/connexion-api';
import { DetailsEpisodePage } from '../details-episode/details-episode';

/**
 * Generated class for the DetailsSaisonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details-saison',
  templateUrl: 'details-saison.html',
})
export class DetailsSaisonPage {
  
  selectedItem;
  detailSaison;
  indexSaison;
  detailData;
  episodes: Array<Number> = [];
  idSerie: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public callApiProvider: CallApiProvider) {

    // this.selectedItem = navParams.get('item');
    this.idSerie = navParams.get('id');
    this.indexSaison = navParams.get('indexSaison');
    // this.detailSaison = this.detailSaison.Episodes;

    callApiProvider.getDetailSaison(this.idSerie, this.indexSaison).subscribe(data => {
      this.episodes = data['Episodes'];
    });
  }
  
  episodeTapped(idEpisode,indexEpisode){
    this.callApiProvider.getDetailEpisode(idEpisode).subscribe(data => {
      this.navCtrl.push(DetailsEpisodePage, {
        detailEpisode : data,
        indexEpisode : indexEpisode,
      });
    });
  }

}