import { Component, ViewChild } from '@angular/core';

import { Nav, Platform, MenuController, Events } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

import { DataService } from '../providers/data-service';
import { HttpClient } from '../providers/http-client';

@Component({
  templateUrl: 'app.template.html'
})
export class IonicAuth {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'HomePage';

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
    public storage: Storage, 
    public data: DataService,
    public menu: MenuController,
    public events: Events,
    public http: HttpClient,
    public splashScreen: SplashScreen
  ) {
  
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage' },
      { title: 'Articles', component: 'ArticlesPage' }
    ];

    this.listenToLoginEvents();

    // decide which menu items should be hidden 
    // by current login status stored in indexedDB
    this.data.isAuthorised().then((status) => {
      this.enableMenu(status === true);
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.splashScreen.hide();
    });
  }

  login() {
    this.nav.push('LoginPage');
  }

  logout() {
    this.events.publish('user:logout');
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // Make sure to catch the error here else 
    // you will get error 
    this.nav.setRoot(page.component).catch(()=>{
      console.log("Page didnt load")
    })
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', (result) => {
      this.enableMenu(true);
      this.storage.set('user', result);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
      this.storage.remove('user');
      this.nav.setRoot('HomePage').catch(()=>{
        console.log("Page didnt load")
      })
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }
}
