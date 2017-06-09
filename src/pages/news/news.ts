import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NewsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  data:any = [

    {
      date:"12-07-2017",
      title:"Sri Lanka: Floods and Landslides Situation Report ",
      image:"http://img.static.reliefweb.int/sites/reliefweb.int/files/styles/attachment-small/public/resources-pdf-previews/787534-Sri%2BLanka%2BFloods%2B-%2BIOM%2BSituation%2BReport%2B2%2B%25285%2BJune%2B2017%2529.png?itok=6XB5x7wj",
      des:"The southwestern monsoons in Sri Lanka have resulted in severe flooding and landslides throughout the country. The previousdrought has accelerated the effects of flooding — causing flash floods and small landslides. Over half a million people have been affected with over 200 deaths."

    },

    {
      date:"12-07-2017",
      title:"Bangladesh donates US$500000 for Sri Lanka flood victim",
      image:"http://images.indianexpress.com/2016/05/sri-lanka1.jpg",
      des:"The government of Bangladesh has decided to provide a cash assistance of US $ 500, 000 to support the victims of recent flood and landslides in Sri Lanka which killed more than 100 people and caused severe damage to livelihood and properties of thousand others. Prime Minister Sheikh Hasina declared this cash donation today in Dhaka. Earlier, she wrote to Sri Lankan President Maithripala Sirisena condoling the deaths of Sri Lankan people and offered sympathy to the people who suffered from this devastating natural calamity that hit the country on 25th May."
    },

     {
       date:"12-07-2017",
      title:"SL floods seen in before-and-after NASA animated image",
      image:"https://s.w-x.co/webp.net-gifmaker.gif",
      des:"efore and after images captured from space show the severity of flooding that plagued Sri Lanka in late May after rains that triggered hundreds of mudslides and killed more than 200 people. The MultiSpectral Instrument (MSI) on the European Space Agency’s Sentinel-2 satellite captured a false-color image of the flood on May 28, according to NASA. An earlier image taken on Jan. 29 by the Operational Land Imager (OLI) on Landsat 8 shows the same area before the waters rose. The false-color photos combine infrared and visible imagery to enhance the shading, where greens and blues are sharpened to highlight the flood's widespread impact. - See more at: http://www.dailymirror.lk/article/SL-floods-seen-in-before-and-after-NASA-animated-image-130417.html#sthash.VSiOU8vZ.dpuf"
    },

     {
       date:"12-07-2017",
      title:"Team of experts from Japan arrive to investigate recent natural disaster",
      image:"http://newsfirst.lk/english/wp-content/uploads/2015/01/japanese-flag-415x260.jpg",
      des:"A team of Japanese disaster management experts have arrived in the country to investigate the recent flood and landslides. This follows a request made by the government of Sri Lanka. The team have..."
    }

  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }

}
