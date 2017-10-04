import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ReportProvider} from '../../providers/report/report';
import {  FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the MyreportsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-myreports',
  templateUrl: 'myreports.html',
})
export class MyreportsPage {
items: FirebaseListObservable<any> = null;
id:any;
  constructor(public navCtrl: NavController, public afAuth:AngularFireAuth,public navParams: NavParams,public api:ReportProvider) {
 
this. afAuth.authState.subscribe((user) => {
    this.id = user.uid;
   this.items =  this.api.getmyreports(user.uid);
    })
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyreportsPage');
  }

  openChat(data){
    this.navCtrl.push("ChatPage", {data:data})
  }

}
