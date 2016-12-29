import { Component, ViewChild } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

declare var ProgressBar: any;

@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html'
})



export class StatsPage {
	@ViewChild('containerbig') container;
	public move:any;
	public alcStatus = "No.";

	ngAfterViewInit() {
		this.createProgBar(this.container, this.move);
	}

  constructor(public navCtrl: NavController, public params: NavParams) {
 		this.move = params.get("firstPassed");
 		if (this.move.info.hasAlcohol) {
 			this.alcStatus = "Yes.";
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
			var value = Math.round(bar.value() * move.info.capacity);
			    if (value === 0) {
			      bar.setText('');
			    } else {
			      bar.setText('');
			    }

          }
          });

		progbar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
		progbar.text.style.fontSize = '2rem';	
	    progbar.animate(move.stats.people/move.info.capacity);
  }

}
