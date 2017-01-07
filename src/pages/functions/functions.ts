
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { MovesService } from '../services/MovesService';

declare var ProgressBar: any;

@Injectable()
export class System {

	public checked = 0;
	public moves: any;

	constructor(public toastCtrl: ToastController, public alertCtrl: AlertController, public loadingCtrl: LoadingController, private movesService: MovesService) {

  }

  showNotification(msg, duration) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: duration
    });
    toast.present();
  }  	

  startLoading(msg, duration) {
	 let loader = this.loadingCtrl.create({
	   content: msg,
	   duration: duration
	 });
	 loader.present();
  }

  moveOptionsScreen(move) {
    let confirm = this.alertCtrl.create({
      message: 'Are you sure want to delete "' + move.info.name + '"?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: data => {
            this.deleteMove(move);
          }
        }
      ]
    });
    
    confirm.present();
  }

  /*
  listMoves() {
    this.movesService.getMoves().then((data) => {

      this.moves = data;

    }, (err) => {

      console.log(err);

    });
  }
  */

deleteMove(move) {
    this.movesService.deleteMove(move).then((result) => {

      console.log("Deleted")

    }, (err) => {

      console.log(err);

    });


    this.startLoading('Deleting move, standby...', 1000);
    setTimeout(() => {
        this.checked = 0;   
        this.showNotification('Move has been deleted.', 1000);
    }, 1000);    
  }

createProgBars(moves_containers, moves) {
    for (var i = 0; i < moves_containers.length; i++) {
        console.log("Executing createProgbars...");
        var progbar = new ProgressBar.SemiCircle(moves_containers[i].nativeElement, {
          strokeWidth: 18,
          easing: 'easeInOut',
          duration: 1400,
          color: '#9932CC',
          svgStyle: null,

          text: {
            value: '',
            alignToBottom: false
          },

          from: {color: '#9932CC'},
          to: {color: '#FFFFFF'},

          step: (state, bar) => {
            bar.path.setAttribute('stroke', state.color);
          }
          });
          if (moves.length) {
             var value = moves[i].stats.people/moves[i].info.capacity;
             if (value > 1) value = 1;
             progbar.animate(moves[i].stats.people/moves[i].info.capacity);
          }
        }
  }

  sortDescending(data_A, data_B) {
    return ((data_B.stats.people/data_B.info.capacity) - (data_A.stats.people/data_A.info.capacity));
  }

  }


  @Injectable()
  export class Globals {

	  public config = {
	    min: 30,
	    max: 10000,
	    displayMsg: false
	  };
  }