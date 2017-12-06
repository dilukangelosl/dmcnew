import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase ,FirebaseObjectObservable} from 'angularfire2/database';
@Injectable()
export class ReportProvider {
user: FirebaseObjectObservable<any>;
firebasea:any;
storage = firebase.storage();
  constructor(public http: Http,public afAuth:AngularFireAuth,public db:AngularFireDatabase) {
    console.log('Hello ReportProvider Provider');
  
  }

  


login(email:any,password:any){
return this.afAuth.auth.signInWithEmailAndPassword(email,password); 
}

signup(email:any,password:any){

  return this.afAuth.auth.createUserWithEmailAndPassword(email,password);

}

registerProfile(authid,fullname,phone,nic,city){


 this.user = this.db.object('/users/'+authid);
return this.user.set({
fullname:fullname,
phone:phone,
nic:nic,
city:city
})
}

logout(){
   return this.afAuth.auth.signOut();
}



 reportdisaster(type:any,contact:any,city:any,latlng:any,photo:any){

    this. afAuth.authState.subscribe((user) => {
          var d = new Date().toISOString();
         
          console.log(d)
   return this.db.list('/disaster').push({
     userid:user.uid,
     type:type,
     contact:contact,
     city:city,
     latlng:latlng,
     photo:photo,
     reportdate:d,
     status:"Pending",
     approved:false,
     agent:null,
     responseMessage:null

   });
    })

      
   
      
  }


addsos(detail:any){
  this. afAuth.authState.subscribe((user) => {

   return this.db.object('/sos/'+user.uid).set({
     details:detail,
     status:true,
     date:new Date()
   });
    })
}

offsos(){
  this. afAuth.authState.subscribe((user) => {

   return this.db.object('/sos/'+user.uid).update({
     status:false,
     date:new Date()
   });
    })
}


getsosstatus(){
  console.log("running api")
return new Promise((resolve,reject)=>{

 this. afAuth.authState.subscribe((user) => {
    this.db.object('/sos/'+user.uid ,{ preserveSnapshot: true }).subscribe(r =>{
      console.log(r);
      resolve(r.status);
    },err=>{
      reject(err);
    })
  
    })

   
})

  
}

//get my reports
getmyreports(userid:any){
 

   return this.db.list('/disaster', {
  query: {
    orderByChild: 'userid',
    equalTo: userid
  }
});
   

}


getChats(id){
  return this.db.list('/disaster/'+id+"/chat");


}

addsoslocation(location:any){
  this. afAuth.authState.subscribe((user) => {

   return this.db.list('/tracking/'+user.uid).push({
     location:location,
     date:new Date()
   });
    })
}

   uploadImage(imageString) : Promise<any>
   {
      let image       : string  = 'disaster-' + new Date().getTime() + '.jpg',
          storageRef  : any,
          parseUpload : any;

      return new Promise((resolve, reject) =>
      {
         storageRef       = this.storage.ref('disasterimages/' + image);
         parseUpload      = storageRef.putString(imageString, 'data_url');

         parseUpload.on('state_changed', (_snapshot) =>
         {
            // We could log the progress here IF necessary
             console.log('snapshot progess ' + _snapshot);
         },
         (_err) =>
         {
            reject(_err);
         },
         (success) =>
         {
            resolve(parseUpload.snapshot);
         });
      });
   }

}
