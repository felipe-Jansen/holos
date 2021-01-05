import { AgendamentoCardComponent } from "./../agendamento-card/agendamento-card.component";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ModalController, PopoverController } from "@ionic/angular";
import { ClientService } from "src/app/providers/client.service";
import { agendaInterface } from '../../../../interfaces/agendaInterface'

@Component({
  selector: "app-agendamento",
  templateUrl: "./agendamento.component.html",
  styleUrls: ["./agendamento.component.scss"],
})
export class AgendamentoComponent implements OnInit {
  @Input() idPatient: number;
  @Input() agendamentos: Array<agendaInterface>;
  @Output() agendamentosEmit = new EventEmitter();
  constructor(
    private clientService: ClientService,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {
    if (!this.agendamentos) {
      this.clientService.getAgenda(this.idPatient).subscribe((data) => {
        console.log(data);
        this.agendamentosEmit.emit(data);
      });
    }
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
