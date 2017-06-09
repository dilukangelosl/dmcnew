import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class GoogleplacesProvider {

lat:any="";
lng:any="";
url:any = "";
type:any="";
key:any="AIzaSyC5BMEogC8FUOtmlXWHaLFeXq0ZYs4MFhQ";
radius:any="";
  constructor(public http: Http) {
    console.log('Hello GoogleplacesProvider Provider');
  }


  search(type:any, location:any){
             
    this.url="https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+location.lat+","+location.lng+"&rankby=distance&type="+type+"&key="+this.key;
   console.log("getting " + type + " on " + location.lat);
    console.log(this.url);
    return new Promise(resolve => {
 
            this.http.get(this.url).map(res => res.json()).subscribe(data => {
 
                var datal = data.results;
                resolve(datal);
 
            });
 
        });
  }

  

}
