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

  loading: boolean = true;
  noResults: boolean = false;

  constructor(
    private clientService: ClientService,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    if (!this.agendamentos) {
      this.clientService.getAgenda(this.idPatient).subscribe((data) => {
        this.loading = false
        this.agendamentosEmit.emit(data);
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
      if (this.agendamentos.length === 0) {
        this.noResults = true
      }
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
