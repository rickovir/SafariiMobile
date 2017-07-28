import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';
import 'rxjs/add/operator/map';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  nama_users ='';
  email_users ='';
  username ='';
  password ='';
  posts :any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public http: Http, public loadingCtrl:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  showAlertRegisterFailed() {
    let alert = this.alertCtrl.create({
      title: 'Gagal',
      subTitle: 'Register gagal.. silahkan ulangi',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertRegisterSuccess() {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: 'Register berhasil.. silahkan login',
      buttons: ['OK']
    });
    alert.present();
  }

  doRegister() {
  
    let loader = this.loadingCtrl.create({
        content: "Processing..."
      });
      loader.present();

    let postParams = {
      nama_users : btoa(this.nama_users),
      email_users: btoa(this.email_users),
      username: btoa(this.username),
      password: btoa(this.password)
    }
    
    this.http.post("http://safarii.ldkikmi.org/index.php/users/prosesdaftar", JSON.stringify(postParams)).map(res => res.json()).subscribe(data => {
      // this.posts = data.data.children;
    // console.log("username :"+data.username); //fetch json
    // console.log("password :"+ data.password);

      if(data.status == 0)
      {
        //loader.dismissAll();
        this.showAlertRegisterFailed();
      
        console.log('gagal');
        loader.dismissAll();
      }
      else
      {
        loader.dismissAll();
        this.showAlertRegisterSuccess();
        this.navCtrl.setRoot(LoginPage);
      }
    }, error => {
        console.log(error);// Error getting the data
      });
    // this.http.get("https://maps.googleapis.com/maps/api/js?key=AIzaSyDnj5UUBEeT0u7DHXRWSL4Br44QvFqJoOg").map(res => res.json()).subscribe(data => {
    //   // Read the result field from the JSON response.
    //   console.log(data);
    // });
  }

  isComplete()
  {

  }

}
