
import { ClientService } from "../../providers/client.service";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  AlertController,
  LoadingController,
  ModalController,
} from "@ionic/angular";
import { DetailModalComponent } from "./components/detail-modal/detail-modal.component";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { FileEntry } from "@ionic-native/file/ngx";
import { agendaInterface } from '../../interfaces/agendaInterface'
import { anexoInterface } from '../../interfaces/anexoInterface'
import { Principal } from "src/app/providers/auth/principal.service";

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
    private camera: Camera,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private ref: ChangeDetectorRef,
    private principalService: Principal
  ) { }
  client: any;
  anexosCache: Array<anexoInterface>;
  descricaoAnexoAtual: string;
  agendaCache: Array<agendaInterface>;
  isPatient: boolean = false;

  section: string = "info";

  ngOnInit() {
    this.route.data.subscribe((data) => {
      console.log(data);
      this.client = data.data[0];
      this.principalService.identity()
        .then(data => {
          if (data.createdBy !== 'system') {
            this.isPatient = true
          }
        })
    });
  }

  async presentUpdateModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: DetailModalComponent,
      componentProps: {
        user: this.client,
        isPatient: this.isPatient
      },
      swipeToClose: true,
    });
    await modal.present();
    // Quando o modal termina sua função, ele manda o paciente atualizado para que a view
    // desse componente seja atualizada tbm
    modal.onDidDismiss()
      .then(data => {
        console.log(data)
        this.client = data['data']
      })
  }



  async presentLoading(): Promise<void> {
    const loading = await this.loadingController.create({
      cssClass: "loading",
      message: "Enviando anexo...",
    });
    await loading.present();
  }

  async presentAlert(): Promise<HTMLIonAlertElement> {
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

  async setAnexo(): Promise<void> {
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
      this.clientService.postAnexo(params).subscribe(
        (data: anexoInterface) => {
          console.log(data)
          this.anexosCache = [...this.anexosCache, data]
          this.ref.detectChanges()
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

  setAnexosCache(anexos: any): void {
    this.anexosCache = [...anexos];
  }

  setAgendaCache(agendamentos: any): void {
    this.agendaCache = [...agendamentos];
  }

  changeInfoTab(event: any): void {
    this.section = event.detail.value;
  }
}
