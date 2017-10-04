import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import{GoogleplacesProvider} from '../../providers/googleplaces/googleplaces';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
/**
 * Generated class for the HelpitemPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-helpitem',
  templateUrl: 'helpitem.html',
})
export class HelpitemPage {


title:any;
catid:any;
data:any =[];
showsearch:any = false;;
latlng:any;
  locationmessage:any;
   

  constructor(public navCtrl: NavController, private launchNavigator: LaunchNavigator,public navParams: NavParams, public api:GoogleplacesProvider,private geolocation: Geolocation, public loadingCtrl:LoadingController) {
    this.title = navParams.get("title");
    this.catid= navParams.get("cat");
    this.locationmessage = "Trying to Access GPS......";
    let loading = this.loadingCtrl.create({
      content: 'Getting Nearby Locations..'
    });

    loading.present();
    this.geolocation.getCurrentPosition({timeout:15000,enableHighAccuracy:true}).then((resp) => {
      this.showsearch = false;
 var lat =  resp.coords.latitude;
 var lng = resp.coords.longitude;
this.locationmessage = "Your Location has been updated";
 this.latlng = {
   lat:lat,
   lng:lng
 }
this.locationmessage = "Searching Nearby " + this.title ;



 this.api.search(this.catid,{lat:lat,lng:lng}).then((res)=>{
   this.data = res;
   console.log(this.data);
   loading.dismiss();
   this.locationmessage = "Results Updated";

 }).catch((err)=>{
   loading.dismiss();
   console.log("error");
 })

}).catch((error) => {
  loading.dismiss();
  console.log('Error getting location', error);
  this.showsearch = true;
  this.locationmessage = "Cannot Access your GPS, Please Try Switcing it on or Use the Search";
});

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpitemPage');
  }



navigate(location:any){
  let options: LaunchNavigatorOptions = {
  start: 'My Location'
  
};

this.launchNavigator.navigate([location.lat,location.lng], options)
  .then(
    success => console.log('Launched navigator'),
    error => console.log('Error launching navigator', error)
  );
}

  getDistanceBetweenPoints( end){
 
        var start= this.latlng;
        var units ="km"
        let earthRadius = {
            miles: 3958.8,
            km: 6371
        };
 
        let R = earthRadius[units || 'miles'];
        let lat1 = start.lat;
        let lon1 = start.lng;
        let lat2 = end.lat;
        let lon2 = end.lng;
 
        let dLat = this.toRad((lat2 - lat1));
        let dLon = this.toRad((lon2 - lon1));
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;
 
        return d.toFixed(2);
 
    }
 
    toRad(x){
        return x * Math.PI / 180;
    }

}
