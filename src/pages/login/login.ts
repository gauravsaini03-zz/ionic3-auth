import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController, LoadingController, ToastController, Events } from 'ionic-angular';
import { DataService } from '../../providers/data-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: {username?: string, password?: string} = {};

  submitted = false;

  constructor(public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public data: DataService,
    public toastCtrl: ToastController,
    public events: Events) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      // start Loader
      let loading = this.loadingCtrl.create({
        content: "Login wait...",
        duration: 20
      });
      loading.present();
      this.data.login(this.login).subscribe((result) => {
        this.events.publish('user:login', result);
        this.navCtrl.setRoot('HomePage');
        loading.dismiss();
        this.showToast(undefined);
      })
    }
  }

  showToast(response_message:any) {
    let toast = this.toastCtrl.create({
      message: (response_message ? response_message : "Log In Successfully"),
      duration: 1500
    });
    toast.present();
  }

  ionViewWillEnter() {
    //Check if already authenticated
    this.data.isAuthorised().then(res => {
      if(res) 
        this.navCtrl.setRoot('HomePage');
      else
        console.log("Please Login");
    })
  }

}
