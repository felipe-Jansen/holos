import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { ClientItemModel } from "../pages/client-page/client.item.model";
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
  constructor(private http: HttpClient) { }

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

  updateUser(client: any): void {
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

  getAnexos(id: number): any {
    return this.http.get(`api/anexo-do-pacientes?pacienteId.equals=${id}`);
  }

  getAgenda(id: number): any {
    return this.http.get(`api/agenda?pacienteId.equals=${id}`);
  }

  postAnexo(params: any) {
    return this.http.post("api/anexo-do-pacientes", params)
  }

  deleteUser(id: number): void {
    this.http.delete<any>(`api/pessoas?id.equals=${id}`);
  }

  private calcUserAge(dateOfBirth: number): number {
    return dayjs(Date.now()).diff(dayjs.unix(dateOfBirth), "year");
  }
}
