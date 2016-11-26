import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { StatsPage } from '../stats/stats';

import { MovesService } from '../services/MovesService';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [MovesService]
})

export class HomePage {

  moves: Array<any>;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, private movesService: MovesService) {

  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'User was added successfully',
      duration: 3000
    });
    toast.present();
  }

  refreshMoves(refresher) {
        setTimeout(() => {
      console.log('Async operation has ended');
        this.listMoves();
        refresher.complete();
    }, 1000);

  }

  listMoves() {
    this.movesService.getMoves().subscribe(
      data => {
        this.moves = data;
        console.log(this.moves);
      },
      err => {
        console.log(err);
      },
      () => console.log('Got Moves')
    );
  }

  checkStats(move) {
    this.navCtrl.push(StatsPage, { 
      firstPassed: move}
      );
  }
  

}