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
  actualPage: number = 0;
  itemsPerPage: number = 15;

  constructor(public clientService: ClientService) {}

  ngOnDestroy(): void {}

  ngOnInit() {
    this.searchQuery = "";

    this.clientService.getAllClients().subscribe((data) => {
      console.log(data);
      this.totalUsers = data;
      this.clientService.setClients(data);
      // primeira pagina da paginacao
      this.users = this.getPaginatedUsers(this.actualPage);
    });
  }

  // atualiza a pagina atual e chama paginacao
  nextPage(event: any): void {
    this.actualPage = this.actualPage + 1;
    let paginatedUsers = this.getPaginatedUsers(this.actualPage);
    console.log(paginatedUsers);
    if (paginatedUsers.length > 0) {
      event.target.complete();
      this.users = [...this.users, ...this.getPaginatedUsers(this.actualPage)];
    } else event.target.disabled = true;
  }

  getPaginatedUsers(page: number): Array<ClientItemModel> {
    let remaining = 0;
    let initialIndex = page * this.itemsPerPage;
    // ou seja , nao tem items suficiente para preencher uma página toda
    if (initialIndex + this.itemsPerPage > this.totalUsers.length) {
      // resto dos itens
      remaining = this.totalUsers.length - initialIndex;
      // se acontecer isso é por que nao temos nenhum item pra ser mostrado mais
      if (remaining <= 0) {
        return [];
      }
      // pegando o resto dos items
      return this.totalUsers.slice(initialIndex, initialIndex + remaining);
    }
    return this.totalUsers.slice(
      initialIndex,
      initialIndex + this.itemsPerPage
    );
  }

  searchClient(): void {
    if (this.interval !== 0) clearTimeout(this.interval);
    if (this.searchQuery !== "") {
      this.interval = setTimeout(() => {
        this.users = this.totalUsers.filter((user) => {
          // aplico UpperCase por que o includes é case-sensitive
          return user.nome
            .toUpperCase()
            .includes(this.searchQuery.trim().toUpperCase());
        });
      }, 1500);
    } else {
      this.users = this.totalUsers;
    }
  }
}
