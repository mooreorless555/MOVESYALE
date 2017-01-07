import { Component, ViewChild, NgZone } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { MovesService } from '../services/MovesService';
import { System } from '../functions/functions';

declare var ProgressBar: any;

@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
  providers: [MovesService, System]
})



export class StatsPage {
	@ViewChild('containerbig') container;
  @ViewChild('funbar') funbar;
  @ViewChild('mehbar') mehbar;
  @ViewChild('deadbar') deadbar;
	move:any;
  progbar:any;
  funstatbar:any;
  mehstatbar:any;
  deadstatbar:any;
  percentage:any;
	alcStatus = "No.";
  numppl = 0;

	ngAfterViewInit() {
		this.createProgBar(this.container, this.move);
    this.createStatsBar();
    setTimeout(() => {
      this.updateStatsBars();
    }, 2000);
	}

  constructor(public navCtrl: NavController, public params: NavParams, public system: System, public zone: NgZone) {
 		this.move = params.get("firstPassed");
     console.log('Passed in', this.move);

    /* Perform statistical analysis. */
 		if (this.move.info.hasAlcohol) {
 			this.alcStatus = "Yes.";
 		}

    // this.runUpdateStatsBars();   

  }

  runUpdateStatsBars() {
      this.system.stat_updates = setInterval(() => {
        this.updateStatsBars();       
    }, 2000);    
  }

incStat(move, stat) {
  this.system.showNotification('Increasing...', 1000);
  switch(stat) {
    case 'fun':
      move.stats.fun++;
      break;
    case 'meh':
      move.stats.meh++;
      break;
    case 'dead':
      move.stats.dead++;
      break;
    default:
      console.log('Mistake.');
 }
  this.system.saveMove(move);
  this.updateStatsBars();
}

  updateStatsBars() {
    console.log("updating");
    let value = this.move.stats.people/this.move.info.capacity;
    let capacity = this.move.info.capacity;
    var funbarperc;
    var mehbarperc;
    var deadbarperc;
    funbarperc = this.move.stats.fun/capacity;
    mehbarperc = this.move.stats.meh/capacity;
    deadbarperc = this.move.stats.dead/capacity;

    this.progbar.animate(value);
    if (funbarperc > 0) {
      this.funstatbar.animate(funbarperc);
    } else {
      this.funstatbar.animate(0.003);
    }
    if (mehbarperc > 0) {
      this.mehstatbar.animate(mehbarperc);
    } else {
      this.mehstatbar.animate(0.003);
    }
    if (deadbarperc > 0) {
      this.deadstatbar.animate(deadbarperc);
    } else {
      this.deadstatbar.animate(0.003);
    }     

  }

  createProgBar(moves_container, move) {
        console.log("Executing createProgbar...");
        var progbar = new ProgressBar.SemiCircle(moves_container.nativeElement, {
          strokeWidth: 18,
          easing: 'easeInOut',
          duration: 2300,
          color: '#9932CC',
          svgStyle: null,

          text: {
            value: '',
           	className: 'progressbar__label',
          },

          from: {color: '#9932CC'},
          to: {color: '#FFFFFF'},

          step: (state, bar) => {
            bar.path.setAttribute('stroke', state.color);
      			this.numppl = Math.round(bar.value() * move.info.capacity);
			      bar.setText(this.numppl + '/' + move.info.capacity);
            bar.text.style.color = state.color;
          }

        });

		progbar.text.style.fontFamily = 'AppFont';
		progbar.text.style.fontSize = '2rem';	

    var perc = move.stats.people/move.info.capacity;

    if (perc > 1) {
      progbar.animate(1);
    } else if (perc >= 0) {
      progbar.animate(perc);     
    } else {
      progbar.animate(0);
    }
    this.progbar = progbar;

  }

  createStatsBar() {
  var funbar = new ProgressBar.Line(this.funbar.nativeElement, {
        strokeWidth: 6,
        easing: 'easeInOut',
        duration: 1400,
        color: '#27e833',
        svgStyle: {width: '100%', height: '100%'}
  });
  funbar.animate(1);
  this.funstatbar = funbar;

  var mehbar = new ProgressBar.Line(this.mehbar.nativeElement, {
        strokeWidth: 6,
        easing: 'easeInOut',
        duration: 1600,
        color: '#FBD200',
        svgStyle: {width: '100%', height: '100%'}
  });
  mehbar.animate(1);
  this.mehstatbar = mehbar;

  var deadbar = new ProgressBar.Line(this.deadbar.nativeElement, {
        strokeWidth: 6,
        easing: 'easeInOut',
        duration: 1800,
        color: '#f9152f',
        svgStyle: {width: '100%', height: '100%'}
  });
  deadbar.animate(1);
  this.deadstatbar = deadbar;
  }
}
