import { Injectable } from "@angular/core";
import { ClientItemModel } from "../pages/client-page/client.item.model";
import { Observable } from "rxjs";

import * as dayjs from "dayjs";

import { HttpClient } from "@angular/common/http";

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

  findByParam(nameParam: string, valueParam: number | string) {
    return this.http.get<ClientItemModel>(`api/pessoas?${nameParam}.equals=${valueParam}`);
  }

  findByName(name: string): any {
    return this.http.get<any>(`api/pessoas?nome.contains=${name}`);
  }

  updateUser(fields: any): Observable<any> {
    // Tem que fazer isso se não dá erro de conversão
    if (fields.dataDeNascimento)
      fields.dataDeNascimento = new Date(fields.dataDeNascimento)
    return this.http.put<any>(`api/pessoas`, fields)
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

  createUser(pessoa: any): any {
    return this.http.post('api/pessoas', pessoa)
  }

  private calcUserAge(dateOfBirth: number): number {
    return dayjs(Date.now()).diff(dayjs.unix(dateOfBirth), "year");
  }
}
