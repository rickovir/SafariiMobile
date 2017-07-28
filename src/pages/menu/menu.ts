import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PerjalananPage } from '../perjalanan/perjalanan';
import { DoaPage } from '../doa/doa';
import { PanduanPage } from '../panduan/panduan';
import { FiqhPage } from '../fiqh/fiqh';

/**
 * Generated class for the MenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }
  openPerjalanan()
  {
  	this.navCtrl.push(PerjalananPage);
  }

  openDoa()
  {
  	this.navCtrl.push(DoaPage);
  }

  openPanduan()
  {
  	this.navCtrl.push(PanduanPage);
  }
  openFiqh()
  {
  	this.navCtrl.push(FiqhPage);
  }
}
