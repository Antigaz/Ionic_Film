import { Component } from '@angular/core';
import { Film } from '../home/home';
import { Serie } from '../serie/serie';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = Film;
  tab2Root = Serie;
  alreadyPassed: Boolean = false;

  constructor(private storage: Storage, public alertCtrl: AlertController) {

  }
  
  // ionViewDidLoad() {
  //   console.log("1" + this.alreadyPassed);
  //   if (this.alreadyPassed == false) {
  //     this.showTuto();
  //     console.log("passer");
  //     this.alreadyPassed = true;
  //     console.log("2" + this.alreadyPassed);
  //   }
  // }

  ionViewWillEnter() {
    this.storage.get('alreadyPassed').then((alreadyPassed) => {
       if(!alreadyPassed) {
         this.storage.set('alreadyPassed', true);
         this.showTuto();
       }
    });
  }

  showTuto() {
    const alert = this.alertCtrl.create({
      title: 'Tutoriel',
      cssClass: 'tuto',
      message: '<img src="assets/imgs/tuto.png" alt="">',
      buttons: ['Compris']
    });
    alert.present();
  }

}
