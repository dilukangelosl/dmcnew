import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController ,AlertController, LoadingController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {ReportProvider} from '../../providers/report/report';
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the ReportPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {
disastertype:any = null;
brief:any = null;
contact:any = null;
city:any = null;
latlng:any = {
  lat:0,
   lng:0
};

locationmessage:any = "Gathering your location...";

  constructor(public navCtrl: NavController, private camera: Camera, public navParams: NavParams, public viewCtrl: ViewController,public api:ReportProvider,private alertCtrl: AlertController,private geolocation: Geolocation,public loadingCtrl: LoadingController) {
    
    this.geolocation.getCurrentPosition().then((resp) => {
 // resp.coords.latitude
 // resp.coords.longitude

 this.latlng = {
   lat:resp.coords.latitude,
   lng:resp.coords.longitude
 }
 this.locationmessage = "Your Location has been Located";
}).catch((error) => {
  console.log('Error getting location', error);
  this.latlng = {
   lat:0,
   lng:0
 }
  this.locationmessage = "Cannot Get your GPS Coordinates, Please provide your city";
});

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

refresh(){
  this.locationmessage = "Gathering your location...";
     this.geolocation.getCurrentPosition({timeout:5000}).then((resp) => {
 // resp.coords.latitude
 // resp.coords.longitude

 this.latlng = {
   lat:resp.coords.latitude,
   lng:resp.coords.longitude
 }
 this.locationmessage = "Your Location has been Located";
}).catch((error) => {
  console.log('Error getting location', error);
  this.latlng = {
   lat:0,
   lng:0
 }
  this.locationmessage = "Cannot Get your GPS Coordinates, Please provide your city";
});
}
 


  takesnap() {
    const options: CameraOptions = {
  quality: 100,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE,
  targetWidth: 500,
      targetHeight: 500
}

this.camera.getPicture(options).then((imageData) => {
 // imageData is either a base64 encoded string or a file URI
 // If it's base64:


 let base64Image = 'data:image/jpeg;base64,' + imageData;

  let loading = this.loadingCtrl.create({
      content: 'Reporting your Issue to DMC'
    });

    loading.present();

 this.api
 .uploadImage(base64Image).then((res)=>{
   
    var image = res.downloadURL;
    if(this.disastertype == null || this.disastertype == ""){
      this.disastertype = "other";
    }
    if(this.contact == null || this.contact == ""){
      this.contact = "Not specified";
    }

    if(this.city == null || this.city == ""){
      this.city = "Not specified";
    }

    

    this.api.reportdisaster(this.disastertype,this.contact,this.city,this.latlng,image);
    loading.dismiss();
 let alert = this.alertCtrl.create({
        title: 'Reporting Success',
        subTitle: "DMC Team will Contact you Immedietly",
        buttons: ['Dismiss']
      });
      alert.present();
      this.viewCtrl.dismiss();


 }).catch((err) =>{
   loading.dismiss();
   console.log(err);

   let alert = this.alertCtrl.create({
        title: 'Reporting Failed',
        subTitle: "Error Connecting To Server, Please check your connection",
        buttons: ['Dismiss']
      });
      alert.present();
 })
}, (err) => {
 // Handle error
 
});
  }

}
