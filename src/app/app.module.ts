import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Film } from '../pages/home/home';
import { ItemDetailsPage } from '../pages/details-film/details-film';
import { Serie } from '../pages/serie/serie';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CallApiProvider } from '../providers/connexion-api/connexion-api';
import { HttpClientModule } from '@angular/common/http';
import { TabsPage } from '../pages/tabs/tabs';
import { FavoritePage } from '../pages/favorite/favorite';
import { DetailsSeriePage } from '../pages/details-serie/details-serie';
import { DetailsEpisodePage } from '../pages/details-episode/details-episode';
import { DetailsSaisonPage } from '../pages/details-saison/details-saison';

@NgModule({
  declarations: [
    MyApp,
    Film,
    ItemDetailsPage,
    Serie, 
    TabsPage,
    FavoritePage,
    DetailsSeriePage,
    DetailsEpisodePage,
    DetailsSaisonPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Film,
    ItemDetailsPage,
    Serie,
    TabsPage,
    FavoritePage,
    DetailsSeriePage,
    DetailsEpisodePage,
    DetailsSaisonPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CallApiProvider
  ]
})
export class AppModule {}
