import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { Storage } from '@ionic/storage';
import { SplashPage } from '../pages/splash/splash';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage:Storage, modalCtrl: ModalController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // modal splash
      let splash = modalCtrl.create(SplashPage);
            splash.present();

      this.storage.get('id_users').then((val)=>{
        if(val == null)
          this.rootPage = LoginPage;
        else
          this.rootPage = MenuPage;
      });
      statusBar.styleDefault();
      // splashScreen.hide(); removed
    });
  }
}

// android map api : AIzaSyApHmrUyrqIsGmyJuRFaVR8dZXcH4LzM0k
// js map api : AIzaSyDnj5UUBEeT0u7DHXRWSL4Br44QvFqJoOg