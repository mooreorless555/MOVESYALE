import { Component, ViewChildren, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';

import { StatsPage } from '../stats/stats';
import { LocationTracker } from '../../providers/location-tracker';

import { MovesService } from '../services/MovesService';
import { System } from '../functions/functions';

declare var ProgressBar: any;

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
    this.system.listMoves();
  }


  room:any;
  interval:any;

  /* Upon any change, will update the progress bars. */
  ngAfterViewChecked() {
    if (this.container.toArray().length > 0) {
      if (this.system.checked == 0) {
        setTimeout(() => {
          console.log("Hello.");
          if (!this.system.progbars[0]) this.system.createProgBars(this.container.toArray(), this.system.moves);
          this.system.updateProgbars();
        }, 700);
        this.system.checked = 1;
      }
    }
    }

  constructor(public navCtrl: NavController, public system: System, public locationTracker: LocationTracker, public zone: NgZone) {
    // clearInterval(this.system.stat_updates);
  }

  showRating(move, rating) {
    let max = Math.max(move.stats.fun, move.stats.meh, move.stats.dead);
    if (max == 0) return false;

    if (rating == 'fun') {
      if (move.stats.fun == max) {
        return true;
      }
    } else if (rating == 'meh') {
      if (move.stats.meh == max) {
        return true;
      }
    } else if (rating == 'dead') {
      if (move.stats.dead == max) {
        return true;
      }
    }

      return false;
  }

  /* Temporary: update progress bars to simulate real-time changes */
  changeMoveValue() {
    if (this.interval) {
      this.interval = undefined;
    }
    console.log("Updating people amounts...");
      this.interval = setInterval(() => {
        for (var i = 0; i < this.system.moves.length; i++) {
          this.system.moves[i].stats.people = Math.floor(Math.random() * (this.system.moves[i].info.capacity));
          console.log("Updating people values for move " + i);
        }
      setTimeout(() => {
        this.system.updateProgbars();
      }, 1000);        
    }, 4000);
  }

  /* GPS Tracking */
  start() {
      this.system.showNotification("Tracking started.", 1000);
      this.locationTracker.startTracking();
  }

  stop() {
      this.system.showNotification("Tracking stopped.", 1000);
      this.locationTracker.stopTracking();
  }
  /*              */

  /* Refresh list of moves event. */
  refreshMoves(refresher) {
        this.system.showNotification('Updating list, standby...', 1000);
        this.system.progbars = [];
        setTimeout(() => {
          this.system.checked = 0;  
          this.system.listMoves();
          this.system.currentdate = this.system.showDate();
          this.system.currentday = this.system.showDay();  
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
