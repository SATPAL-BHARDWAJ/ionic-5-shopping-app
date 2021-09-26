import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
 
  isLoading: boolean = false;
  currencySym: string = "₹";

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { }

  async presentLoading(content) {
    this.isLoading = true;

    return await  this.loadingCtrl.create({
       //cssClass: 'my-custom-class',
       message: content,
       spinner: "circles",
       //duration: 2000
      }).then(loader => {
        loader.present().then(resp => {
          console.log('loading present :>> ');
          if (!this.isLoading) {
            loader.dismiss().then(() => console.log('abort loading'));
          }
        });
      })
 
   }
 
   async dismissLoading() {
      this.isLoading = false;
      
      if (this.loadingCtrl) {
        return await this.loadingCtrl.dismiss().then(resp => {
          console.log(' :>> Loading dismiss');
        });
      }
      
   }

   /* Show Toast*/  
  async showToast(msg: string, position, type = "success") {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,   
      position: position,
      cssClass: 'toast-' + type
    });
    toast.present();
  }

  async confirm(config: any) {
    const alert = await this.alertCtrl.create({
      mode: "ios",
      cssClass: 'my-custom-class',
      header: config.header ?? 'Confirm!',
      message: config.message ?? 'Are you sure?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: config.cancelHandler
        },
        {
          text: 'Yes',
          cssClass: 'primary',
          handler: config.okayHandler,
        }
      ]
    });

    alert.present();
  }
   
  getFormatDate(date: string) {
    return moment(date).format('DD MMM, YYYY');
  }

  getFormatTime(date: string) {
    return moment(date).format('LT');
  }

  randomStr(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

}
