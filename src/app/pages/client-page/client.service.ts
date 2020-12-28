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
  constructor(private http: HttpClient) {}
  private jwtToken =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTYxMTQxNzE4NH0.iWu1IdxM2MYJySyTC0iUgH1a9WhM55DzlhsN035zobh2YE0616cB4FRKTc9Q_74DGP0v322_3rwXPyPi2EkCAA";

  private httpHeader = new HttpHeaders({
    "Content-type": "application/json",
    Authorization: `Bearer ${this.jwtToken}`,
  });

  getAllClients(): Observable<Array<ClientItemModel>> {
    return this.http.get<Array<ClientItemModel>>("api/pessoas");
  }

  getPagedClients(page: number): Observable<Array<ClientItemModel>> {
    return this.http.get<Array<ClientItemModel>>(`api/pessoas?page=${page}`);
  }

  findById(id: number): Observable<ClientItemModel> {
    return this.http.get<ClientItemModel>(`api/pessoas?id.equals=${id}`);
  }

  findByName(name: string): any {
    return this.http.get<any>(`api/pessoas?nome.contains=${name}`);
  }

  updateUser(client: ClientItemModel): void {
    const { id } = client;
    console.log(id);
    this.http.put<any>(`api/pessoas?id.equals=${id}`, client).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteUser(id: number): void {
    this.http.delete<any>(`api/pessoas?id.equals=${id}`);
  }

  private calcUserAge(dateOfBirth: number): number {
    return dayjs(Date.now()).diff(dayjs.unix(dateOfBirth), "year");
  }
}
