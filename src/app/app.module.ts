import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ReportProvider } from '../providers/report/report';
import { GoogleplacesProvider } from '../providers/googleplaces/googleplaces';
import { BackgroundGeolocation, BackgroundGeolocationConfig } from '@ionic-native/background-geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
export const firebaseConfig = {
  apiKey: "AIzaSyCc4h9Ovb4aCbUpyNcBNEUUUHtqciNLneI",
  authDomain: "disastermanagement-ee84a.firebaseapp.com",
  databaseURL: "https://disastermanagement-ee84a.firebaseio.com",
  projectId: "disastermanagement-ee84a",
  storageBucket: "disastermanagement-ee84a.appspot.com",
  messagingSenderId: "895647762366"
}



@NgModule({
  declarations: [
    MyApp


  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),

    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp


  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    ReportProvider,
    Geolocation,
    LaunchNavigator,
    BackgroundGeolocation,
    GoogleplacesProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ReportProvider,
    GoogleplacesProvider
  ]
})
export class AppModule { }
