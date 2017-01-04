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
	move:any;
  progbar:any;
  percentage:any;
	alcStatus = "No.";
  numppl = 0;

	ngAfterViewInit() {
		this.createProgBar(this.container, this.move);
	}

  ngOnChanges() {
    this.percentage = (100*(this.move.stats.people/this.move.info.capacity)).toFixed(2); 
  }

  constructor(public navCtrl: NavController, public params: NavParams, public system: System, public zone: NgZone) {
 		this.move = params.get("firstPassed");
 		if (this.move.info.hasAlcohol) {
 			this.alcStatus = "Yes.";
 		}
        this.percentage = (100*(this.move.stats.people/this.move.info.capacity)).toFixed(2);      


     this.runUpdateProgBar();
  }

  runUpdateProgBar() {
      setInterval(() => {
        this.updateProgBar();       
    }, 2000);    
  }
  updateProgBar() {
    var index = 0;
    console.log('Index is',0);
    var value = this.move.stats.people/this.move.info.capacity;
    this.progbar.animate(value);
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
			    // if (value === 0) {
			    //   bar.setText('');
			    // } else {
			      bar.setText(this.numppl + '/' + move.info.capacity);
			    // }

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

}
