import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatsPage } from '../pages/stats/stats';
import { MakePage } from '../pages/make/make';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile'

import { LocationTracker } from '../providers/location-tracker';

@NgModule({
  declarations: [
    MyApp,
    StatsPage,
    MakePage,
    HomePage,
    LoginPage,
    ProfilePage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StatsPage,
    MakePage,
    HomePage,
    LoginPage,
    ProfilePage,
    TabsPage
  ],
  providers: [LocationTracker]
})
export class AppModule {}
