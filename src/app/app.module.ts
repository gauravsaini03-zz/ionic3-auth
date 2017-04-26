import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { IonicAuth } from './app.component';

import { DataService } from '../providers/data-service';
import { HttpClient } from '../providers/http-client';

@NgModule({
  declarations: [
    IonicAuth
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(IonicAuth, {
      preloadModules: true
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    IonicAuth
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler}, 
    DataService, 
    HttpClient,
    SplashScreen
  ]
})
export class AppModule {}
