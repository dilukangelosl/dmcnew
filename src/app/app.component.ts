import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ListPage } from '../pages/list/list';
import { AngularFireAuth } from 'angularfire2/auth';
import { ReportProvider } from '../providers/report/report'
export const firebaseConfig = {
    apiKey: "AIzaSyCc4h9Ovb4aCbUpyNcBNEUUUHtqciNLneI",
    authDomain: "disastermanagement-ee84a.firebaseapp.com",
    databaseURL: "https://disastermanagement-ee84a.firebaseio.com",
    projectId: "disastermanagement-ee84a",
    storageBucket: "disastermanagement-ee84a.appspot.com",
    messagingSenderId: "895647762366"
  }




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any ;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,public afAuth: AngularFireAuth, public statusBar: StatusBar, public splashScreen: SplashScreen, public api:ReportProvider) {
    this.initializeApp();

    afAuth.authState.subscribe(user => {
      if (!user) {
              
        this.rootPage = "LoginhomePage";
      }
      else{
       
         this.rootPage = "HomePage";
      } 
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: "HomePage" },
      { title: 'About', component: ListPage },
      { title: 'Settings', component: ListPage },
      { title: 'Map', component: ListPage }
    ];

  }

  logout(){
    this.api.logout();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
     //  firebase.initializeApp(firebaseConfig);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
