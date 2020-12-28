import { Component, Input, OnInit } from "@angular/core";
import { ClientService } from "src/app/pages/client-page/client.service";

@Component({
  selector: "app-anexos",
  templateUrl: "./anexos.component.html",
  styleUrls: ["./anexos.component.scss"],
})
export class AnexosComponent implements OnInit {
  @Input() idPatient: any;
  anexos: any;
  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.clientService.getAnexos(this.idPatient).subscribe((data) => {
      console.log(data);
      this.anexos = data;
    });
  }

  showPDF(anexoURL: string) {
    window.location.href = anexoURL;
  }
}
