import { Subscription } from "rxjs";
import { ClientService } from "src/app/pages/client-page/client.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  AlertController,
  LoadingController,
  ModalController,
  Platform,
} from "@ionic/angular";
import { DetailModalComponent } from "./components/detail-modal/detail-modal.component";
import { Camera, CameraOptions } from "@ionic-native/Camera/ngx";
import { FileEntry } from "@ionic-native/file/ngx";

declare var window: any;
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
    public modalController: ModalController,
    private clientService: ClientService,
    private platform: Platform,
    private camera: Camera,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}
  client: any;
  anexosCache: any;
  descricaoAnexoAtual: string;
  agendaCache: any;
  section: string = "info";

  ngOnInit() {
    this.route.data.subscribe((data) => {
      console.log(data);
      this.client = data.data[0];
    });
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

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: "loading",
      message: "Enviando anexo...",
    });
    await loading.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: "Dê um nome para seu anexo:",
      inputs: [
        {
          name: "descricaoanexo",
          type: "text",
        },
      ],
      buttons: [
        {
          text: "Ok",
          role: "confirm",
          handler: (alertData) => {
            console.log(alertData.descricaoanexo);
            this.descricaoAnexoAtual = alertData.descricaoanexo;
          },
        },
      ],
    });
    await alert.present();
    return alert;
  }

  async setAnexo() {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.ALLMEDIA,
    };
    this.camera.getPicture(options).then(
      async (imageData) => {
        let tipoArquivo = "";
        if (imageData.startsWith("content://")) {
          window.resolveLocalFileSystemURL(
            imageData,
            async (entry: FileEntry) => {
              entry.file((file) => {
                let reader = new FileReader();
                reader.onloadend = async (e) => {
                  let result = e.target.result;
                  imageData = String(result).split(",")[1];
                  tipoArquivo = String(result).split(";")[0].split(":")[1];
                  this.mandaAnexo(tipoArquivo, imageData);
                };

                // The most important point, use the readAsDatURL Method from the file plugin
                reader.readAsDataURL(file);
              });
            },
            (e) => {
              console.log("ERRO LENDO O ARQUIVO", e);
            }
          );

          // imageData is either a base64 encoded string or a file URI
        } else {
          tipoArquivo = "application/jpeg";
          this.mandaAnexo(tipoArquivo, imageData);
        }
      },
      (err) => {
        // Handle error
        console.log(err);
      }
    );
  }

  async mandaAnexo(tipoArquivo: string, imageData: string): Promise<void> {
    await (await this.presentAlert()).onDidDismiss().then(() => {
      this.presentLoading();
      const params = {
        anexoContentType: tipoArquivo,
        anexo: imageData,
        pacienteId: this.client.id,
        pacienteNome: this.client.nome,
        data: new Date(),
        descricao: this.descricaoAnexoAtual,
      };
      console.log(params);
      this.clientService.postAnexo(params).subscribe(
        (data) => {
          this.anexosCache = [...this.anexosCache, data];
          this.loadingController.dismiss();
          this.descricaoAnexoAtual = "";
        },
        (err) => {
          console.log("Erro ao mandar anexo:", err);
          this.loadingController.dismiss();
        }
      );
    });
  }

  getAnexosCache(anexos: any) {
    this.anexosCache = anexos;
  }

  getAgendaCache(agendamentos: any) {
    this.agendaCache = agendamentos;
  }

  changeInfoTab(event: any) {
    this.section = event.detail.value;
  }
}
