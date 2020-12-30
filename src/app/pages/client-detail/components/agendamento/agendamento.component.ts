import { AgendamentoCardComponent } from "./../agendamento-card/agendamento-card.component";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ModalController, PopoverController } from "@ionic/angular";
import { ClientService } from "src/app/pages/client-page/client.service";

@Component({
  selector: "app-agendamento",
  templateUrl: "./agendamento.component.html",
  styleUrls: ["./agendamento.component.scss"],
})
export class AgendamentoComponent implements OnInit {
  @Input() idPatient: any;
  agendamentos: any = "";
  @Input() agendamentosCache: any;
  @Output() agendamentosEmit = new EventEmitter();
  constructor(
    private clientService: ClientService,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {
    if (!this.agendamentosCache) {
      this.clientService.getAgenda(this.idPatient).subscribe((data) => {
        console.log(data);
        this.agendamentosEmit.emit(data);
        this.agendamentos = data;
      });
    } else this.agendamentos = this.agendamentosCache;
  }

  async showAgendamento(id: number): Promise<void> {
    let agendamentoAtual = this.agendamentos.find((agenda) => agenda.id === id);
    const modal = await this.popoverController.create({
      component: AgendamentoCardComponent,
      componentProps: {
        agendamento: agendamentoAtual,
      },
      backdropDismiss: true,
    });
    await modal.present();
   
  }
}
