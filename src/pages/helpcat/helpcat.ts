import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HelpcatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-helpcat',
  templateUrl: 'helpcat.html',
})
export class HelpcatPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpcatPage');
  }

  help(cat:any,title:any){
    this.navCtrl.push("HelpitemPage",{cat:cat,title:title});
  }

}
