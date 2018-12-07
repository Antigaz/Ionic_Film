import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailsEpisodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details-episode',
  templateUrl: 'details-episode.html',
})
export class DetailsEpisodePage {

  detailEpisode : any;
  indexEpisode : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.detailEpisode = navParams.get('detailEpisode');
    this.indexEpisode= navParams.get('indexEpisode');
  }

}
