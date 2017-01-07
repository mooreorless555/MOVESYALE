import { Component } from '@angular/core';

import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public info = "By Yalies. For Yalies.";

  public firsttime = {
    email: "",
    confirmcode: ""
  };

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController) {

  }

presentWelcome() {
    let welcome = this.toastCtrl.create({
      message: "Hey Chris!",
      duration: 1000
    });
    welcome.present();
  }

presentPrompt() {
  let alert = this.alertCtrl.create({
    title: 'First Time',
    message: "Before we let you sign in, we just need to confirm that you have a yale.edu email. Type it in below and we'll send you a confirmation code.",
    inputs: [
      {
        name: 'email',
        placeholder: 'Yale Email',
        value: 'me@yale.edu'
      }
    ],
    buttons: [
      {
        text: 'Go Back',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Send Confirmation',
        handler: data => {
          this.firsttime.email = data.email;
          if (data.email.endsWith("")) { // Change this back to @yale.edu to filter out Yale emails.
            if (data.email == "@yale.edu") {
              this.presentError("This isn't an email.");
              return false;
            }
            else {
              this.presentConfirmCode();
            }
          } else {
            this.presentError("You didn't type in a valid Yale email.");
            return false;
          }
        }
      }
    ]
  });
  alert.present();
}

presentConfirmCode() {
  let alert = this.alertCtrl.create({
    title: 'Confirm',
    message: "Okay, we sent a confirmation code to " + this.firsttime.email + ". Type it in here and that's it!",
    inputs: [
      {
        name: 'code',
        placeholder: 'Confirmation Code'
      }
    ],
    buttons: [
      {
        text: 'Go Back',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Confirm',
        handler: data => {
          if (1) {
            this.presentWelcome();
            this.navCtrl.push(TabsPage);
          } else {
            return false;
          }
        }
      }
    ]
  });
alert.present();
}

presentError(msg) {
  let msgs = ['Oops', 'Try Again', 'Uh-oh'];
  let alert = this.alertCtrl.create({
    title: msgs[Math.floor(Math.random() * msgs.length)],
    message: msg,
    buttons: ['Go Back']
  });
alert.present();
}

}
