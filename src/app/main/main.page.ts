import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
list=[];
searchitem: any;
item;
alldata;
userid;
getfrom;
namecheck;
emailid;
public idlo;
loader;

  constructor(
    private firestore: AngularFirestore,
    private service: ServiceService,
    private router: Router,
    private auth: AngularFireAuth,
    private storage: Storage,
    private load: LoadingController,
    private toast: ToastController,
  ) { }

ionViewWillEnter(){
 this.storage.create();
 this.storage.get('emailid').then(res=>{
this.idlo=res;
this.loaddata(this.idlo);
 });
}

  ngOnInit() {
  }
loaddata(id){
  this.getresturant(id);
}
async getresturant(collection){
  const loadeer=  this.load.create({
    message:'Loading data...'
  });
  try {
    (await loadeer).present();
      this.firestore.collection(collection)
   .snapshotChanges()
   .subscribe(data=>{
     if(data.length===0){
       this.showToast('No data found. Add something!');
       this.alldata=[];

     }
     else{
       this.alldata=data.map(e=> ({
         id:e.payload.doc.id,
         data: e.payload.doc.data()
         }));

         this.userid=this.alldata[0].id;
    }
   });
   (await loadeer).dismiss();
   } catch (error) {
 this.showToast('Not found');
   }
}
showToast(mess){
  this.toast.create({
    message: mess,
   duration: 3000,
   position: 'middle',

  }).then(res => res.present());

}
gotosignout(){
  this.storage.remove('uid');
  this.storage.remove('emailid');
  this.auth.signOut();
  this.router.navigate(['/home']);
  }
  gotodetail(){
    this.router.navigate(['/groupdetail']);
   }
   gotoadd(){
    this.router.navigate(['/addresturant']);
  }
  gotoresdetail(){
    this.router.navigate(['/resturantdetail']);
   }
}
