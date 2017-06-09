import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ReportProvider } from '../../providers/report/report'

/**
 * Generated class for the LoginhomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-loginhome',
  templateUrl: 'loginhome.html',
})
export class LoginhomePage {

  //loginform
  loginusername: any;
  loginpassword: any;


  //registerform
  remail:any;
  rpassword:any;
  rfullname:any;
  rphone:any;
  rcity:any;
  rnic:any;

  page: any = "login";
  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public navParams: NavParams, public api: ReportProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginhomePage');
  }

  login() {

    let loading = this.loadingCtrl.create({
      content: 'Logging in..'
    });

    loading.present();
    this.api.login(this.loginusername, this.loginpassword).then((res) => {
      loading.dismiss();
      console.log(res)
    }).catch((err) => {
      var message =err.message;
      if (err["code"] == "auth/user-not-found") {
        message="Incorrect Username or Password"
      }
      loading.dismiss();
      console.log(err)



      let alert = this.alertCtrl.create({
        title: 'Login Failed',
        subTitle: message,
        buttons: ['Dismiss']
      });
      alert.present();
    })

  }


  signup(){

    let loading = this.loadingCtrl.create({
      content: 'Registering User'
    });

    loading.present();

    this.api.signup(this.remail,this.rpassword).then((res)=>{
      
      let userid=res.uid;

      this.api.registerProfile(userid,this.rfullname,this.rphone,this.rnic,this.rcity).then((res)=>{
      loading.dismiss();
      let alert = this.alertCtrl.create({
        title: 'DMC Mobile Services',
        subTitle: "Welcome "+this.rfullname,
        buttons: ['Dismiss']
      });
      alert.present();
      })



    }).catch(err=>{
      console.log(err);
      loading.dismiss();

      let alert = this.alertCtrl.create({
        title: 'Login Failed',
        subTitle: err.message,
        buttons: ['Dismiss']
      });
      alert.present();
    })


  }



}
