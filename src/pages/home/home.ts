import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,AlertController } from 'ionic-angular';
import {ReportProvider} from '../../providers/report/report';
import { BackgroundGeolocation, BackgroundGeolocationConfig } from '@ionic-native/background-geolocation';
import { AngularFireDatabase, FirebaseListObservable ,FirebaseObjectObservable} from 'angularfire2/database';
/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
item: FirebaseObjectObservable<any>;
  constructor(public navCtrl: NavController,public db:AngularFireDatabase,public modalCtrl: ModalController, public navParams: NavParams,private alertCtrl: AlertController, public api:ReportProvider,private backgroundGeolocation: BackgroundGeolocation) {
      console.log("Checking sos status");
       this.api.getsosstatus().then(res=>{

         console.log(res);
       }).catch(er=>{
         console.log(er);
       })

     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

startbackgroundgps(){
  const config: BackgroundGeolocationConfig = {
            desiredAccuracy: 10,
            stationaryRadius: 20,
            distanceFilter: 30,
            debug: true, //  enable this hear sounds for background-geolocation life-cycle.
            stopOnTerminate: false, // enable this to clear background location settings when the app terminates
    };

    this.backgroundGeolocation.configure(config)
  .subscribe((location) => {

    console.log(location);


      this.api.addsoslocation(location);
    // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
    // and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
    // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
    this.backgroundGeolocation.finish(); // FOR IOS ONLY

  });

  // start recording location
this.backgroundGeolocation.start();
}


stopbackground(){
// If you wish to turn OFF background-tracking, call the #stop method.
this.backgroundGeolocation.stop();
this.api.offsos();

}


  report(){

let profileModal = this.modalCtrl.create("ReportPage", { userId: 8675309 });
   profileModal.present();
    
  }

  help(){
    this.navCtrl.push("HelpcatPage");
  }

  sos(){
       let alert = this.alertCtrl.create({
    title: 'Brief Situation',
    inputs: [
      {
        name: 'Situation',
        placeholder: 'Situation'
      },
     
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'SOS!!',
        handler: data => {
          this.api.addsos(data.Situation);
          this.startbackgroundgps();

        }
      }
    ]
  });
  alert.present();
  }

  

  news(){
    this.navCtrl.push("NewsPage");
  }

}
