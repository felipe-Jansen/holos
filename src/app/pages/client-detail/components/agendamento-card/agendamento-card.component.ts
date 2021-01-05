import { ClientService } from "src/app/providers/client.service";
import { Component, Input, OnInit } from "@angular/core";
import { agendaInterface } from "src/app/interfaces/agendaInterface";

@Component({
  selector: "app-agendamento-card",
  templateUrl: "./agendamento-card.component.html",
  styleUrls: ["./agendamento-card.component.scss"],
})
export class AgendamentoCardComponent implements OnInit {
  @Input() agendamento: agendaInterface;
  fotoProfissional: string;
  constructor(private clientService: ClientService) {}

  ngOnInit() {
    if (this.agendamento.profissionalId) {
      this.clientService
        .findById(this.agendamento.profissionalId)
        .subscribe(async (data) => {
          console.log(data);
          if (data[0].foto) this.fotoProfissional = data[0].foto;
        });
    }
  }
}
