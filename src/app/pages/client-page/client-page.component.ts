import { Component, OnInit, OnDestroy, HostBinding } from "@angular/core";
import { ClientService } from "../../providers/client.service";
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

  loading: boolean = true;
  noResults: boolean = false;

  constructor(public clientService: ClientService) {}

  ngOnDestroy(): void {
    console.log("lista cliente destruida")
  }

  ngOnInit() {
    this.searchQuery = "";

    this.clientService.getPagedClients(this.actualPage).subscribe((data) => {
      this.loading = false;
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
      this.loading = true;
      this.interval = setTimeout(() => {
        this.clientService.findByName(this.searchQuery).subscribe(
          (data: ClientItemModel[]) => {
            this.loading = false
            this.totalUsers = this.users;
            this.users = data;
          },
          (error: any) => {
            this.loading = false
            console.log(error);
          }
        );
      }, 1500);
    } else {
      this.users = this.totalUsers;
    }
  }
}
