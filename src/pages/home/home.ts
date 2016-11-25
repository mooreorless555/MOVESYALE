import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { MovesService } from '../services/MovesService';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [MovesService]
})

export class HomePage {

  moves: Array<any>;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, private movesService: MovesService) {
    this.listMoves();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'User was added successfully',
      duration: 3000
    });
    toast.present();
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

  deleteMove(move) {
    this.movesService.deleteMove(move).subscribe(
      err => {
        console.log(err);
      }
    )
    this.listMoves();
  }
  

}
