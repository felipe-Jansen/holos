import { Component, OnInit, OnDestroy, HostBinding } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ModalController, IonRouterOutlet } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";

import { Observable, ReplaySubject, Subscription, merge } from "rxjs";
import { switchMap, map } from "rxjs/operators";

import { ClientService } from "./client.service";
import { ClientItemModel } from "./client.item.model";

@Component({
  selector: "app-client-page",
  templateUrl: "./client-page.component.html",
  styleUrls: ["./client-page.component.scss"],
})
export class ClientPageComponent implements OnInit {
  searchQuery: string;
  interval: any;
  users: Array<ClientItemModel>;
  totalUsers: Array<ClientItemModel>;
  actualPage: number = 1;

  constructor(public clientService: ClientService) {}

  ngOnDestroy(): void {}

  ngOnInit() {
    this.searchQuery = "";

    this.clientService.getPagedClients(this.actualPage).subscribe((data) => {
      console.log(data);
      // primeira pagina da paginacao
      this.users = data;
    });
  }

  // atualiza a pagina atual e chama paginacao
  nextPage(event: any): void {
    if (this.searchQuery === "") {
      this.actualPage = this.actualPage + 1;
      this.clientService.getPagedClients(this.actualPage).subscribe((data) => {
        if (data.length > 0) {
          event.target.complete();
          this.users = [...this.users, ...data];
        } else event.target.disabled = true;
      });
    }
  }

  searchClient(): void {
    if (this.interval !== 0) clearTimeout(this.interval);
    if (this.searchQuery !== "") {
      this.interval = setTimeout(() => {
        this.clientService.findByName(this.searchQuery).subscribe(
          (data: ClientItemModel[]) => {
            this.totalUsers = this.users;
            this.users = data;
          },
          (error: any) => {
            console.log(error);
          }
        );
      }, 1500);
    } else {
      this.users = this.totalUsers;
    }
  }
}
