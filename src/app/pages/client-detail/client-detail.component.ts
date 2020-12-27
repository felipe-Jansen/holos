import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { DetailModalComponent } from "./components/detail-modal/detail-modal.component";

@Component({
  selector: "app-client-detail",
  templateUrl: "./client-detail.component.html",
  styleUrls: [
    "./styles/client-detail.component.scss",
    "./styles/client-detail-shell.scss",
  ],
})
export class ClientDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public modalController: ModalController
  ) {}
  client: any;
  section: string = 'info';

  ngOnInit() {
    console.log(this.route.snapshot.data);
    this.client = this.route.snapshot.data["data"];
  }

  async presentUpdateModal() {
    const modal = await this.modalController.create({
      component: DetailModalComponent,
      componentProps: {
        user: this.client,
      },
      swipeToClose: true,
    });
    await modal.present();
  }

  changeInfoTab(event: any){
    this.section = event.detail.value;
  }
}
