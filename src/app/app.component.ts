import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, Geofence } from 'ionic-native';

// import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = LoginPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // StatusBar.styleDefault();
      StatusBar.backgroundColorByHexString("#9932CC");
      Splashscreen.show();
      setTimeout(function() {
          Splashscreen.hide();
      }, 2000);
    });
 Geofence.initialize().then(
        // resolved promise does not return a value
        () => console.log('Geofence Plugin Ready'),
        (err) => console.log(err)
      )

  this.addGeofence();
    // ScreenOrientation.lockOrientation('portrait');
  }


private addGeofence() {
  //options describing geofence
  let fence = {
    id: "69ca1b88-6fbe-4e80-a4d4-ff4d3748acdb", //any unique ID
    latitude:       40.9407244999, //center of geofence radius
    longitude:      -73.73012159999,
    radius:         100, //radius to edge of geofence
    transitionType: 3, //see 'Transition Types' below
    notification: { //notification settings
        id:             1, //any unique ID
        title:          "You crossed a fence", //notification title
        text:           "You just arrived to Gliwice city center.", //notification body
        openAppOnClick: true //open app when notification is tapped
    }
  }

  Geofence.addOrUpdate(fence).then(
     () => console.log('Geofence added'),
     (err) => console.log('Geofence failed to add')
   );
}

}
