import { Component } from '@angular/core';
import { Film } from '../home/home';
import { Serie } from '../serie/serie';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = Film;
  tab2Root = Serie;

  constructor() {

  }
}
