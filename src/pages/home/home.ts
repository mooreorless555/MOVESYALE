import { Component, ViewChildren } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { StatsPage } from '../stats/stats';

import { MovesService } from '../services/MovesService';

declare var ProgressBar: any;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [MovesService]
})

export class HomePage {

  public allmoves;
  public created = 0;
  public checked = 0;
  public progbars = [];

 /* Gathers all references to elements labeled 
 'container' for the progress bars (people counters) */
 @ViewChildren('container') container: any;
  moves: Array<any>;

  /* Lists all the moves after the page has fully loaded. 
  This is to allow @ViewChildren to work properly. */
  ngAfterViewInit() {
    this.listMoves();
  }

  /* Upon any change, will update the progress bars. */
  ngAfterViewChecked() {
    if (this.container.toArray().length > 0) {
      if (this.checked == 0) {
        setTimeout(() => {
          console.log("Your lovely container is...:");
          console.log(this.container.toArray());   
          console.log(this.container.toArray().length);
          console.log(this.moves.length);    
          this.createProgBars(this.container.toArray(), this.moves);
        }, 1000);
        this.checked = 1;
      }
    }
    }

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, private movesService: MovesService) {

  }

  presentToast(msg, duration) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: duration
    });
    toast.present();
  }

  refreshMoves(refresher) {
        this.presentToast('Updating list, standby...', 1000);
        setTimeout(() => {
        this.checked = 0;
        console.log('Checked: ' + this.checked);
        console.log('Async operation has ended'); 
        console.log(this.container.toArray());    
        this.listMoves();  
        this.presentToast('Done!', 1000);
        refresher.complete();
    }, 1000);

  }

  listMoves() {
    this.movesService.getMoves().subscribe(
      data => {
        this.moves = data;
        console.log(this.moves);
        this.moves.sort(this.sortDescending);
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
    setTimeout(() => {
        this.checked = 0;   
        this.listMoves();  
        this.presentToast('Move has been deleted.', 1000);
    }, 1000);    
  }

  checkStats(move) {
    this.navCtrl.push(StatsPage, { 
      firstPassed: move}
      );
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
             progbar.animate(moves[i].stats.people/moves[i].info.capacity); 
          } else {
            progbar.animate(moves.stats.people/moves.info.capacity);
          }
        }
      this.created = 1;
  }

sortDescending(data_A, data_B) {
  return ((data_B.stats.people/data_B.info.capacity) - (data_A.stats.people/data_A.info.capacity));
}
}
