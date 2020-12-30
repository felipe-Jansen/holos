import { File } from "@ionic-native/file/ngx";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from "@angular/core";
import { ClientService } from "src/app/pages/client-page/client.service";
import { PhotoViewer } from "@ionic-native/photo-viewer/ngx";

@Component({
  selector: "app-anexos",
  templateUrl: "./anexos.component.html",
  styleUrls: ["./anexos.component.scss"],
})
export class AnexosComponent implements OnInit, OnChanges {
  @Input() idPatient: any;
  @Input() anexosCache: any;
  @Output() anexosEmit: EventEmitter<any> = new EventEmitter();
  anexos: any = "";

  constructor(
    private clientService: ClientService,
    private photoViewer: PhotoViewer,
    private ft: FileTransfer,
    private file: File,
    private fileOpener: FileOpener
  ) {}

  ngOnInit() {
    console.log("entrei onInit");
    if (!this.anexosCache) {
      this.clientService.getAnexos(this.idPatient).subscribe((data) => {
        this.anexos = data;
        this.anexosEmit.emit(this.anexos);
      });
    }
  }

  ngOnChanges() {
    console.log("entrei onChange");
    this.anexos = this.anexosCache;
  }

  show(anexoAtual: any) {
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

  downloadAndOpenPDF(anexoURL: string, anexoDescricao: string) {
    let path = this.file.dataDirectory;
    const transfer = this.ft.create();

    transfer
      .download(anexoURL, `${path}${anexoDescricao}.pdf`)
      .then((entry) => {
        let url = entry.toURL();
        this.fileOpener
          .open(url, "application/pdf")
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      });
  }
}
