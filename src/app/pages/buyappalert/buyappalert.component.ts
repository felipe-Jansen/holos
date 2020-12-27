import { Component, OnInit } from "@angular/core";
import { ModalController, LoadingController } from "@ionic/angular";
import {
  InAppBrowser,
  InAppBrowserOptions,
} from "@ionic-native/in-app-browser";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-buyappalert",
  templateUrl: "./buyappalert.component.html",
  styleUrls: ["./buyappalert.component.scss"],
})
export class BuyappalertComponent implements OnInit {
  loading: any;
  loadingShown: boolean;

  constructor(
    public modalCtrl: ModalController,
    public inAppBrowser: InAppBrowser,
    private http: HttpClient,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  onCodecanoyon() {
    const options: InAppBrowserOptions = {
      zoom: "no",
    };
    this.inAppBrowser.create("https://bit.ly/cc2_Dentist", "_system", options);
  }
  presentLoading(message: string) {
    this.loading = this.loadingCtrl.create({
      message,
    });
    this.loading.onDidDismiss(() => {});
    this.loading.present();
    this.loadingShown = true;
  }

  dismissLoading() {
    if (this.loadingShown) {
      this.loadingShown = false;
      this.loading.dismiss();
    }
  }
  onwhatsapp() {
    this.presentLoading("Opening WhatsApp...");
    this.http
      .get(
        "https://dashboard.vtlabs.dev/whatsapp.php?product_name=dentist&source=template"
      )
      .subscribe(
        (res: any) => {
          this.dismissLoading();
          return this.inAppBrowser.create(res["link"], "_system");
        },
        (err) => {
          console.log("Error rating:", JSON.stringify(err));
          this.dismissLoading();
        }
      );
  }
}
