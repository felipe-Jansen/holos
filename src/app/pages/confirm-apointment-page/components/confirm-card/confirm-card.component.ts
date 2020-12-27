import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-confirm-card",
  templateUrl: "./confirm-card.component.html",
  styleUrls: ["./confirm-card.component.scss"],
})
export class ConfirmCardComponent implements OnInit {
  @Input() type: string;
  @Input() selectedType: string;
  @Output() choosedType = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  chooseType() {
    this.choosedType.emit(this.type);
  }
}
