import { Component } from '@angular/core';

import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-make',
  templateUrl: 'make.html'
})

export class MakePage {
	public hello;
  public config = {
    min: 30,
    max: 300,
    displayMsg: false
  };

  // Move Object
  public move = {
    info: {
      name: "",
      capacity: 30,
      hasAlcohol: false,
      extraInfo: ""
    },
    
    location: {
      long: 0,
      lat: 0
    },

    stats: {
      people: 1
    }
  }

 // Form submission checking
 logForm() {
    if (this.move.info.name == "") {
      this.myWarning("You need to give your Move a name.", 3000);
    } else if (this.move.info.capacity < this.config.min) {
      this.myWarning("The minimum capacity is " + this.config.min + " people.", 3000);
      this.move.info.capacity = this.config.min;
    } else if (this.move.info.capacity > this.config.max) {
      this.myWarning("The maximum capacity is " + this.config.max + " people.", 3000);
      this.move.info.capacity = this.config.max;     
    } else {
      this.confirmMove();
      console.log("Move creation success. Sending out object data for database storage.");
      console.log(this.move);
    }
  }




  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController) {
  	let messages = [
    	"Please enter Move here.", 
    	"What's the move?", 
    	"This'll be fun.",
    	"What you got for us?"
    ];

  	this.hello = messages[Math.floor(Math.random() * messages.length)];

  }

    confirmMove() {
      let confirm = this.alertCtrl.create({
            message: '"' + this.move.info.name + '" will go live at your current location. Do you confirm this?',
    buttons: [
      {
        text: 'Wait, go back',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }},
        {
        text: 'GO LIVE!',
        handler: data => {
          this.myWarning("Your move is now on the map. Check it out!", 1000);
          console.log('Confirmed.');
        }}]
        });
          confirm.present();
        }

    alcWarning() {
     let warning = this.toastCtrl.create({
      message: "You agree that you must be of 21 years or older to drink alcohol in the state of Connecticut.",
      duration: 5000
    });

     this.config.displayMsg = !(this.config.displayMsg);
     if (this.config.displayMsg) {
       warning.present();
     }
   }



    myWarning(msg, sec) {
      let warn = this.toastCtrl.create({
        message: msg,
        duration: sec
      });
      warn.present();

    }

}
