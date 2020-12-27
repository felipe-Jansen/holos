import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { ClientItemModel } from "./client.item.model";
import {
  Observable,
  of,
  forkJoin,
  throwError,
  combineLatest,
  Subscription,
} from "rxjs";
import { map, concatMap, first, filter } from "rxjs/operators";
import * as dayjs from "dayjs";

import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ClientService {
  clients: Array<ClientItemModel>;
  constructor(private http: HttpClient) {}
  private jwtToken =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYxMTQxNzE4NH0.iWu1IdxM2MYJySyTC0iUgH1a9WhM55DzlhsN035zobh2YE0616cB4FRKTc9Q_74DGP0v322_3rwXPyPi2EkCAA";

  private httpHeader = new HttpHeaders({
    "Content-type": "application/json",
    Authorization: `Bearer ${this.jwtToken}`,
  });

  setClients(clients: Array<ClientItemModel>): void {
    this.clients = clients;
  }

  getAllClients(): Observable<Array<ClientItemModel>> {
    return this.http.get<Array<ClientItemModel>>(
      "https://my.api.mockaroo.com/pessoa.json?key=3dc56030"
    );
  }

  getOneClient(id: number): ClientItemModel {
    return this.clients.find((client) => client.id === id);
  }

  updateUser(client: ClientItemModel): void {
    const index = this.clients.findIndex((clientT) => clientT.id === client.id);
    if (index !== -1) {
      this.clients[index] = client;
    }
  }

  deleteUser(id: number): void {
    const index = this.clients.findIndex((clientT) => clientT.id === id);
    if (index !== -1) {
      this.clients.splice(index);
    }
  }

  private calcUserAge(dateOfBirth: number): number {
    return dayjs(Date.now()).diff(dayjs.unix(dateOfBirth), "year");
  }
}
