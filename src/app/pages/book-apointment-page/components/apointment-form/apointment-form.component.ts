import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-apointment-form",
  templateUrl: "./apointment-form.component.html",
  styleUrls: ["./apointment-form.component.scss"],
})
export class ApointmentFormComponent implements OnInit {
  name: string;
  phone: string;
  @Output() formEmitter = new EventEmitter<any>();

  constructor(private router: Router) {}

  ngOnInit() {}

  bookApointment() {
    this.formEmitter.emit({ name: this.name, phone: this.phone });
    this.router.navigate(["/confirmappointment"]);
  }
}
