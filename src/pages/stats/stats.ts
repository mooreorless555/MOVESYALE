import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html'
})
export class StatsPage {
	public move:any;
	public alcStatus = "No.";

  constructor(public navCtrl: NavController, public params: NavParams) {
 		this.move = params.get("firstPassed");
 		if (this.move.info.hasAlcohol) {
 			this.alcStatus = "Yes.";
 		}
  }

}
