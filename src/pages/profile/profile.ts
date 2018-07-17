import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HistoryPage } from '../history/history';
import { Http } from '@angular/http';
import { MyexperiencesPage } from '../myexperiences/myexperiences';
 


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http
  ) {

    if (localStorage.getItem("TOKEN")) {

      this.http.get("https://localhost-ix-fs-2-2018.herokuapp.com/verify?jwt=" + localStorage.getItem("TOKEN"))
        .subscribe(
          result => {
            console.log(result.json());
          },
          err => {
            console.log(err); // "Invalid log in"
          }
        );
    }

  }
  
  navigateToHome() {
    console.log("Navigating to HomePage...");

    localStorage.removeItem("TOKEN");
    this.navCtrl.setRoot(HomePage);
  }

  navigateToHistory() {
    console.log("Navigating to HistoryPage...");

    this.navCtrl.push(HistoryPage);

  }
  navigateToExperiences() {
    console.log("Navigating to ExperiencesPage...");

    this.navCtrl.push(MyexperiencesPage);

}
}