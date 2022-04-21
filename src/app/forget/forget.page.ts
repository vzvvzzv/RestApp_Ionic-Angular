import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.page.html',
  styleUrls: ['./forget.page.scss'],
})
export class ForgetPage implements OnInit {
forgetpass;
  constructor(private auth: AngularFireAuth,
    private toast: ToastController) { }

  ngOnInit() {
  }
  reset(){
    if(this.forgetpass){
      this.auth.sendPasswordResetEmail(this.forgetpass).then((e)=>{
      this.showToast('Password reset request sent. Please check your email\'s inbox/spam folder(s).');
      }).catch(e=> this.showToast('Account with this email could not be found.'));
    }
    else{
      this.showToast('Please enter your email first...');
    }
  }
  showToast(mess){
    this.toast.create({
  message: mess,
  duration: 2000
    }).then(res=> res.present());
  }
}
