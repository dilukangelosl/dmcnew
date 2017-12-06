import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ReportProvider} from '../../providers/report/report';
import {  FirebaseListObservable } from 'angularfire2/database';
import * as moment from 'moment';
/**
 * Generated class for the ChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  Id:any ;
  chats:any= [];
  message:any ;
  constructor(public navCtrl: NavController, public navParams: NavParams, public service:ReportProvider) {
    let data = this.navParams.get("data");
    this.Id =data.$key;
    this.chats = this.service.getChats(this.Id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }


  formattime(time){
    console.log(time);
    console.log(moment.utc(time).format('h:mm:ss a'))
return moment.utc(time).format('h:mm:ss a')
  }
  sendMessage(){
   if(this.message != null){
     this.chats.push({message:this.message,sender:1,time:Date.now()}).then(res => {
       this.message = null;
     } )
   }
  }
}
