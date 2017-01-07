import { Component, ViewChildren } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NativeStorage } from 'ionic-native';

import { StatsPage } from '../stats/stats';
import { ProfilePage } from '../profile/profile';

import { MovesService } from '../services/MovesService';
import { System } from '../functions/functions';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [MovesService, System]
})

export class HomePage {


 /* Gathers all references to elements labeled 
 'container' for the progress bars (people counters) */
 @ViewChildren('container') container: any;
  moves: Array<any>;

  /* Lists all the moves after the page has fully loaded. 
  This is to allow @ViewChildren to work properly. */
  ngAfterViewInit() {
    //this.system.listMoves();

    this.listMoves();

  }

  /* Upon any change, will update the progress bars. */
  ngAfterViewChecked() {
    if (this.container.toArray().length > 0) {
      if (this.system.checked == 0) {
        setTimeout(() => {
          this.system.createProgBars(this.container.toArray(), this.system.moves);
        }, 700);
        this.system.checked = 1;
      }
    }
    }

  constructor(public navCtrl: NavController, public system: System, public movesService:MovesService) {

  }

  goToProfile() {
    this.navCtrl.push(ProfilePage);
  }


  listMoves() {
    var me = this;

    NativeStorage.getItem('user')
          .then(function(user) {
            //alert("Got token: " + user.token);
            return Promise.all([user, me.movesService.getMoves(user.token)]);
          })
          .then(function(results) {
            //alert(results[1]);
            me.moves = results[1];
            //alert("Got moves: " + me.moves);
          })
          .catch(function(err) {
            alert("Couldn't get tokens " + err);
          });
  }


  /* Refresh list of moves event. */
  refreshMoves(refresher) {
        this.system.showNotification('Updating list, standby...', 1000);
        setTimeout(() => {
          this.system.checked = 0;  
          this.listMoves();  
          this.system.showNotification('Done!', 1000);
          refresher.complete();
    }, 1000);
  }

  /* Go to the Stats page */
  checkStats(move) {
    this.navCtrl.push(StatsPage, { 
      firstPassed: move}
      );
  } 
}
