import { File } from "@ionic-native/file/ngx";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { ClientService } from "src/app/providers/client.service";
import { PhotoViewer } from "@ionic-native/photo-viewer/ngx";
import { LoadingController, ToastController } from "@ionic/angular";
import { anexoInterface } from "src/app/interfaces/anexoInterface";

@Component({
  selector: "app-anexos",
  templateUrl: "./anexos.component.html",
  styleUrls: ["./anexos.component.scss"],
})
export class AnexosComponent implements OnInit {
  @Input() idPatient: number;
  @Input() anexos: Array<anexoInterface>;
  @Output() anexosEmit: EventEmitter<any> = new EventEmitter();

  loading: boolean = true;
  noResults: boolean = false;

  constructor(
    private clientService: ClientService,
    private photoViewer: PhotoViewer,
    private ft: FileTransfer,
    private file: File,
    private fileOpener: FileOpener,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    console.log("entrei onInit");
    if (!this.anexos) {
      this.loading = true
      this.clientService.getAnexos(this.idPatient).subscribe((data: any) => {
        console.log(data)
        this.loading = false
        this.anexosEmit.emit(data);
        if (data.length === 0) {
          this.noResults = true
        }
      },
        err => {
          console.log(err)
          this.loading = false
        });
    } else {
      this.loading = false;
      if (this.anexos.length === 0) {
        this.noResults = true
      }
    }
  }


  async presentLoading(): Promise<void> {
    const loading = await this.loadingController.create({
      cssClass: "loading",
      message: "Abrindo pdf...",
    });
    await loading.present();
  }

  async presentToast(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'Erro abrindo o PDF! Tente novamente.',
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });
    toast.present();
  }

  show(anexoAtual: any): void {
    const { anexoContentType, url, descricao } = anexoAtual;
    if (anexoContentType === "application/pdf") {

      this.downloadAndOpenPDF(url, descricao);
    } else {
      const options = {
        share: true,
      };
      this.photoViewer.show(url, "", options);
    }
  }

  downloadAndOpenPDF(anexoURL: string, anexoDescricao: string): void {
    this.presentLoading()
    let path = this.file.dataDirectory;
    const transfer = this.ft.create();

    transfer
      .download(anexoURL, `${path}${anexoDescricao}.pdf`)
      .then((entry) => {
        let url = entry.toURL();
        this.loadingController.dismiss()
        this.fileOpener
          .open(url, "application/pdf")
          .then((res) => console.log(res))
          .catch((err) => {
            this.presentToast()
            console.log(err)
          });
      });
  }
}
