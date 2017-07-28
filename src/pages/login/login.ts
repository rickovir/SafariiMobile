import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { MenuPage } from '../menu/menu';
import { RegisterPage } from '../register/register';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username ='';
  password ='';
  posts :any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public http: Http, public loadingCtrl:LoadingController, public storage:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  showAlertLoginFailed() {
    let alert = this.alertCtrl.create({
      title: 'Gagal',
      subTitle: 'Login gagal.. silahkan ulangi',
      buttons: ['OK']
    });
    alert.present();
  }

  doRegister()
  {
    this.navCtrl.setRoot(RegisterPage);
  }

  doLogin() {
	
    let loader = this.loadingCtrl.create({
        content: "Logging in..."
      });
      loader.present();

    let postParams = {
      username: btoa(this.username),
      password: btoa(this.password)
    }
    
    this.http.post("http://safarii.ldkikmi.org/index.php/users/loginAuth", JSON.stringify(postParams)).map(res => res.json()).subscribe(data => {
      // this.posts = data.data.children;
    // console.log("username :"+data.username); //fetch json
    // console.log("password :"+ data.password);

      if(data.status == 0)
      {
        //loader.dismissAll();
        this.showAlertLoginFailed();
      
        console.log('gagal');
        loader.dismissAll();
      }
      else
      {
       loader.dismissAll();

        console.log('berhasil');
        this.storage.set('id_users', data.id_users);
        this.storage.set('username', data.username);
        this.storage.set('password', data.password);
        this.storage.set('nama_users', data.nama_users);
        this.storage.set('email_users', data.email_users);

        console.log("username :"+data.username); //fetch json
        console.log("password :"+ data.password);
        console.log("id_users :"+ data.id_users);


        this.navCtrl.setRoot(MenuPage);
      }
    }, error => {
        console.log(error);// Error getting the data
      });
    // this.http.get("https://maps.googleapis.com/maps/api/js?key=AIzaSyDnj5UUBEeT0u7DHXRWSL4Br44QvFqJoOg").map(res => res.json()).subscribe(data => {
    //   // Read the result field from the JSON response.
    //   console.log(data);
    // });
  }
}
