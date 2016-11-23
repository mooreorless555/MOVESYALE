import { Component } from '@angular/core';

import { HomePage } from '../home/home';
// import { AboutPage } from '../about/about';
import { MakePage } from '../make/make';
// import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  // tab1Root: any = AboutPage;
  tab1Root: any = HomePage;
  tab2Root: any = MakePage;
  // tab4Root: any = LoginPage;

  constructor() {

  }
}
