import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../models/product';
import { PaymentPage } from '../payment/payment';
import { ProductService } from '../../services/product.service';
import { MenuPage } from '../menu/menu';

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  public product: Product = new Product();
  public productService: ProductService;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.product = this.navParams.get("productParameter"); //new Product()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
    this.initMap();
  }
  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });

    this.directionsDisplay.setMap(this.map);
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }


  navigateToMenu() {
    console.log("Navigating to MenuPage...");
    this.navCtrl.push(MenuPage, { productParameter: this.product });
  }

}