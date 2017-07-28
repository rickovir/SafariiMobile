import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Platform,AlertController, LoadingController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

/**
 * Generated class for the PerjalananPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var google;

@Component({
  selector: 'page-perjalanan',
  templateUrl: 'perjalanan.html',
})
export class PerjalananPage {
// maps attribute
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start = 'Jakarta';
  end = 'Jakarta';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers : true});
  // distanceMatrix = new google.maps.DistanceMatrixService;

  lat = 0;
  long=0;
  icons:any;
  gmarkers = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private geo:Geolocation, 
    private platform:Platform, 
    public alertCtrl: AlertController, 
    public storage: Storage,
    public http:Http, 
    public loadingCtrl:LoadingController){

    this.platform.ready().then(() => {

      var option = {
        timeout : 5000
      };

      this.geo.getCurrentPosition(option).then(resp => {
        this.lat = resp.coords.latitude;
        this.long = resp.coords.longitude;
        console.log(this.lat);
        console.log(this.long);
        this.initMap(this.lat,this.long);
      }).catch(()=> {
        console.log("Error to get location");
      });

       this.icons = {
        start: new google.maps.MarkerImage(

        'http://maps.google.com/mapfiles/ms/micons/green.png',
        // (width,height)
        new google.maps.Size(44, 32),
        // The origin point (x,y)
        new google.maps.Point(0, 0),
        // The anchor point (x,y)
        new google.maps.Point(22, 32)),
        end: new google.maps.MarkerImage(
        // URL
        'http://maps.google.com/mapfiles/ms/micons/red.png',
        // (width,height)
        new google.maps.Size(44, 32),
        // The origin point (x,y)
        new google.maps.Point(0, 0),
        // The anchor point (x,y)
        new google.maps.Point(22, 32))
      };

    });
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerjalananPage');
  }

 //  ngAfterViewInit() {
  //     var input = document.getElementsByClassName('textSearch');
  //     var options = {componentRestrictions: {country: 'id'}};
  //     new google.maps.places.Autocomplete(input, options);
  // }

  initMap(geoLat:Number, geoLong:Number) {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 9,
      center: {lat: geoLat, lng: geoLong},
      mapTypeControl: false,
      scaleControl: false,
      scrollwheel: false,
      navigationControl: false,
      streetViewControl: false
    });

    this.directionsDisplay.setMap(this.map);

    /*google.maps.event.addListener(this.map, 'dragend', function() 
    {
        //geocodePosition(marker.getPosition());
        console.log('do vesdsfsdf');
        this.computeTotalDistance(this.directionsDisplay.getDirections());
    });*/
  }

  calculateAndDisplayRoute() {
    this.clearOverlays();

    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
        var leg = response.routes[0].legs[0];
        this.makeMarker(leg.start_location,this.icons.start, "Start");
        this.makeMarker(leg.end_location, this.icons.end, "End");

        this.computeTotalDistance(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  clearOverlays() {
    for (var i = 0; i < this.gmarkers.length; i++ ) {
      this.gmarkers[i].setMap(null);
    }
    this.gmarkers.length = 0;
  }

  makeMarker( position, icon, title) {
   let marker = new google.maps.Marker({
    position: position,
    map: this.map,
    icon: icon,
    title : title
   });
   this.gmarkers.push(marker);
  }

  computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    this.generateDirection(myroute, total);
  }

  generateDirection(route, distance)
  {

    let loader = this.loadingCtrl.create({
        content: "Logging in..."
    });
    loader.present();

    let startLat  = route.legs[0].start_location.lat();
    let startLng  = route.legs[0].start_location.lng();
    let EndLat  = route.legs[0].end_location.lat();
    let EndLng  = route.legs[0].end_location.lng();
    let date = new Date();
    let nowTime = date.getHours.toString() + ':' + date.getMinutes.toString();
    let nowDate = date.getFullYear.toString() + '/' + date.getMonth.toString() + '/' + date.getDate.toString();


    let postParams = {
      direction : btoa(distance.toString()),
      startLat : btoa(startLat),
      startLng : btoa(startLng),
      endLat   : btoa(EndLat),
      endLng   : btoa(EndLng),
      nowDate  : btoa(nowDate),
      nowTime  : btoa(nowTime)
    };

    //this.showAlert('total : '+total+ ' km');
    
    this.http.post("http://localhost/safarii/index.php/perjalanan/generatedirection/", JSON.stringify(postParams)).map(res => res.json()).subscribe(data => {
      console.log(data);
      loader.dismissAll();
      if(data.status == 0)
        this.showAlert('gagal');
      else
        this.showAlert('berhasil');
    });


  }

  showAlert(msgAlert:string) {
    let alert = this.alertCtrl.create({
      title: 'Direction',
      subTitle: msgAlert,
      buttons: ['OK']
    });
    alert.present();
  }


}
