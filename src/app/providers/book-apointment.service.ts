import { Injectable } from "@angular/core";

const MES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"
]

@Injectable({
  providedIn: "root",
})
export class BookApointmentService {
  nameClient: string;
  phoneClient: string;
  hour: string;
  day: number;
  month: number;
  year: number;
  appointmentType: string;

  constructor() { }

  setClient(dataClient: any): void {
    console.log(dataClient);
    const { name, phone, hour, day, month, year } = dataClient;
    console.log(month, year)
    this.nameClient = name;
    this.phoneClient = phone;
    this.hour = hour;
    this.day = day;
    this.month = month
    this.year = year
  }

  getClient(): any {
    return {
      name: this.nameClient,
      phone: this.phoneClient,
      day: this.day,
      hour: this.hour,
      month: this.month,
      year: this.year
    };
  }

  setAppointmentType(type: string): void {
    this.appointmentType = type;
  }

  sendMessageWhatsapp(): void {
    console.log(
      this.appointmentType,
      this.day,
      this.hour,
      this.phoneClient,
      this.nameClient
    );
    let message = `Oi, eu sou o ${this.nameClient} e gostaria de marcar uma consulta às ${this.hour} do
    dia ${String(this.day)}, mês ${MES[this.month]} de ${String(this.year)}. O tipo da consulta é ${this.appointmentType}, e está aqui meu contato: ${this.phoneClient}`;

    message = encodeURIComponent(message);

    window.open(`https://wa.me/5587988650406?text=${message}`);
  }
}
