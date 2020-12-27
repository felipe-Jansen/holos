import { Component, EventEmitter, OnInit, Output } from "@angular/core";

const MES = [
  "JANEIRO",
  "FEVEREIRO",
  "MARÇO",
  "ABRIL",
  "MAIO",
  "JUNHO",
  "JULHO",
  "AGOSTO",
  "SETEMBRO",
  "OUTUBRO",
  "NOVEMBRO",
  "DEZEMBRO",
];

const DIAS = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

@Component({
  selector: "app-day",
  templateUrl: "./day.component.html",
  styleUrls: ["./day.component.scss"],
})
export class DayComponent implements OnInit {
  mes: number;
  dias = [];
  diasMostrados = 5;

  @Output() choosedDayEmitter = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {
    let dataAtual = new Date();
    let diaNumero = dataAtual.getDate();
    this.mes = dataAtual.getMonth();
    for (let i = 0; i < this.diasMostrados; i++) {
      this.dias.push({
        diaSemana: this.numberToDay(
          new Date(2020, this.mes, diaNumero).getDay()
        ),
        diaMes: diaNumero,
      });
      diaNumero++;
    }
  }

  chooseDay(event: any) {
    let dayValue = Number(event.detail.value)
    this.choosedDayEmitter.emit(dayValue)
  }

  numberToDay(dayNumber: number): string {
    return DIAS[dayNumber];
  }

  numberToMonth(monthNumber: number): string {
    return MES[monthNumber];
  }
}
